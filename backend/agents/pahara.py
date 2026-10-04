import re

from ..schemas import AgentResponse
from .hishab import contains, normalize


def run(message: str) -> AgentResponse:
    text = normalize(message)
    reasons = []
    score = 0
    credentials = bool(re.search(r'\b(otp|pin|password)\b', text)) or contains(text, ('ওটিপি', 'পিন', 'পাসওয়ার্ড', 'পাসওয়ার্ড'))
    request = contains(text, ('দিন', 'দাও', 'পাঠান', 'শেয়ার', 'শেয়ার', 'বলুন', 'send', 'share', 'enter', 'verify', 'দিতে', 'click', 'ক্লিক'))
    protective = contains(text, ('শেয়ার করবেন না', 'শেয়ার করবেন না', 'কাউকে দেবেন না', 'never share', 'do not share'))
    link = bool(re.search(r'https?://|www\.|\b[a-z0-9-]+\.(?:com|net|org|xyz|top|click|info|co|bd)\b', text))
    if credentials and request and not protective:
        score += 4
        reasons.append('গোপন পিন, ওটিপি বা পাসওয়ার্ড চাওয়া হয়েছে।')
    if link:
        score += 2
        reasons.append('লিংক বা ওয়েব ঠিকানা রয়েছে; বার্তার লিংক থেকে অ্যাকাউন্টে প্রবেশ না করে পরিচিত অ্যাপ খুলুন।')
    if contains(text, ('জরুরি', 'এখনই', 'বন্ধ হয়ে', 'বন্ধ হবে', 'ব্লক', 'urgent', 'suspend', 'blocked')):
        score += 1
        reasons.append('দ্রুত সিদ্ধান্ত নেওয়ার চাপ বা অ্যাকাউন্ট বন্ধের ভয় দেখানো হয়েছে।')
    if contains(text, ('পুরস্কার', 'লটারি', 'জিতেছেন', 'অগ্রিম', 'আগে টাকা', 'ফি পাঠান', 'prize', 'lottery', 'advance fee')):
        score += 3
        reasons.append('পুরস্কার বা অগ্রিম টাকা চাওয়ার মতো ঝুঁকির লক্ষণ রয়েছে।')
    if contains(text, ('send money', 'টাকা পাঠান', 'টাকা ফেরত', 'payment request')):
        score += 2
        reasons.append('টাকা পাঠানোর অনুরোধ রয়েছে; আলাদা পরিচিত মাধ্যমে প্রাপকের পরিচয় যাচাই করুন।')
    if not reasons:
        reasons.append('লেখায় পরিচিত ঝুঁকির লক্ষণ পাওয়া যায়নি; এতে প্রেরক বা পেমেন্টের সত্যতা নিশ্চিত হয় না।')
    level = 'High' if score >= 4 else 'Medium' if score >= 2 else 'Low'
    return AgentResponse(agent='pahara', intent='fraud_check', risk_level=level, reasons=reasons,
                         message=' '.join(reasons), mode='heuristic')
