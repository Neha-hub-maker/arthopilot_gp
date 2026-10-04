import re
import unicodedata
from decimal import Decimal

from pydantic import ValidationError

from ..schemas import AgentResponse, ChatRequest, ParsedTransaction

SALE_WORDS = ('বিক্রি', 'বিক্রয়', 'বিক্রয়', 'বেচেছি', 'sale', 'sold')
EXPENSE_WORDS = ('খরচ', 'কিনেছি', 'কিনলাম', 'ক্রয়', 'ক্রয়', 'ভাড়া', 'ভাড়া', 'বিল', 'expense', 'bought', 'paid')


def normalize(text):
    return unicodedata.normalize('NFC', text).translate(str.maketrans('০১২৩৪৫৬৭৮৯', '0123456789')).lower()


def contains(text, words):
    return any(normalize(word) in text for word in words)


def parse(message: str) -> ParsedTransaction:
    text = normalize(message)
    sales, expenses = contains(text, SALE_WORDS), contains(text, EXPENSE_WORDS)
    if sales == expenses:
        raise ValueError('একবারে একটি বিক্রি অথবা খরচের হিসাব লিখুন, যেমন: আজ ৫০০ টাকার কাপড় বিক্রি করেছি।')
    if re.search(r'হয়নি|হয়নি|করিনি|না\b|not\b|didn.t|করব|হবে|আগামী|বাকি|বকেয়া|বকেয়া|করলে|যদি', text):
        raise ValueError('সম্পন্ন নগদ বা ডিজিটাল বিক্রি/খরচ লিখুন। বাকি, ভবিষ্যৎ বা শর্তযুক্ত লেনদেন এখন সংরক্ষণ করা হয় না।')
    if '?' in text or contains(text, ('কত', 'কিভাবে', 'কীভাবে', 'কেমন', 'দেখাও')):
        raise ValueError('এটি প্রশ্ন মনে হচ্ছে। হিসাব সংরক্ষণ করতে সম্পন্ন লেনদেনের বিবরণ দিন।')
    amounts = re.findall(r'(?<![\d.])[-+]?\d[\d,]*(?:\.\d+)?', text)
    if len(amounts) != 1:
        raise ValueError('একটি স্পষ্ট টাকার পরিমাণ দিন; একাধিক অঙ্ক থাকলে প্রতিটি লেনদেন আলাদা করে লিখুন।')
    if re.search(r'\d\s*(হাজার|লাখ|কোটি|thousand|million|k\b)', text):
        raise ValueError('পুরো অঙ্কটি লিখুন, যেমন ৫০০০ টাকা।')
    raw = amounts[0]
    if ',' in raw and not (re.fullmatch(r'\d{1,3}(,\d{3})+(\.\d+)?', raw) or re.fullmatch(r'\d{1,2}(,\d{2})*,\d{3}(\.\d+)?', raw)):
        raise ValueError('টাকার অঙ্কের কমা ঠিক করে আবার লিখুন।')
    category = 'general'
    for label, words in (
        ('rent', ('ভাড়া', 'ভাড়া', 'rent')),
        ('utilities', ('বিদ্যুৎ', 'পানি', 'গ্যাস', 'বিল', 'electricity')),
        ('delivery', ('ডেলিভারি', 'delivery')),
        ('clothing', ('কাপড়', 'কাপড়', 'শাড়ি', 'শাড়ি', 'সুতা', 'clothing', 'shirt')),
        ('groceries', ('চাল', 'ডাল', 'তেল', 'rice', 'groceries')),
    ):
        if contains(text, words):
            category = label
            break
    method = 'bKash' if contains(text, ('বিকাশ', 'bkash')) else 'Nagad' if contains(text, ('নগদ অ্যাপ', 'নগদ ওয়ালেট', 'nagad')) else 'Bank' if contains(text, ('ব্যাংক', 'bank')) else 'Cash'
    try:
        return ParsedTransaction(type='sale' if sales else 'expense', amount=Decimal(raw.replace(',', '')), category=category, method=method)
    except ValidationError:
        raise ValueError('টাকার পরিমাণ শূন্যের বেশি, সর্বোচ্চ ১০০ কোটি এবং সর্বোচ্চ দুই দশমিক ঘর হতে হবে।') from None


def run(request: ChatRequest, database) -> AgentResponse:
    try:
        parsed = parse(request.message)
    except ValueError as exc:
        return AgentResponse(agent='hishab', intent='bookkeeping', status='needs_clarification', message=str(exc))
    preview = {**parsed.model_dump(mode='json'), 'amount': float(parsed.amount)}
    transaction = database.save(parsed, request.message, request.request_id) if request.save else None
    return AgentResponse(agent='hishab', intent='bookkeeping', transaction=transaction, preview=preview,
                         message=f'{parsed.amount} টাকার হিসাব ' + ('সংরক্ষণ করা হয়েছে।' if request.save else 'প্রস্তুত। নিশ্চিত করলে সংরক্ষণ হবে।'))
