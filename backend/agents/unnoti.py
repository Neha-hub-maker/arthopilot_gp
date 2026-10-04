from datetime import datetime, timedelta

from ..database import DHAKA
from ..schemas import AgentResponse


def run(database) -> AgentResponse:
    rows = database.daily_totals()
    today = datetime.now(DHAKA).date()
    start = today - timedelta(days=6)
    previous_start = start - timedelta(days=7)
    current = [r for r in rows if start.isoformat() <= r['day'] <= today.isoformat()]
    previous = [r for r in rows if previous_start.isoformat() <= r['day'] < start.isoformat()]
    sales = sum(r['sales'] for r in current)
    expenses = sum(r['expenses'] for r in current)
    prior_sales = sum(r['sales'] for r in previous)
    trend = round((sales - prior_sales) / prior_sales * 100, 2) if prior_sales else None
    suggestions = []
    if not current:
        suggestions.append('গত সাত দিনে কোনো হিসাব নেই। বিক্রি ও খরচ নিয়মিত লিখুন।')
    else:
        suggestions.append(f'গত সাত দিনে নথিভুক্ত বিক্রি {sales / 100:g} টাকা, খরচ {expenses / 100:g} টাকা; পার্থক্য {(sales - expenses) / 100:g} টাকা।')
        suggestions.append('খরচ বিক্রির চেয়ে বেশি। বড় খরচের রসিদ দেখে অপ্রয়োজনীয় খরচ কমান।' if expenses > sales else 'বিক্রি ও খরচ প্রতিদিন মিলিয়ে কিছু টাকা জরুরি প্রয়োজনের জন্য রাখুন।')
    suggestions.append(f'আগের সাত দিনের নথিভুক্ত বিক্রির তুলনায় পরিবর্তন {trend:g}%।' if trend is not None else 'আগের সাত দিনের বিক্রির ভিত্তি নেই, তাই বৃদ্ধির হার বলা যাচ্ছে না।')
    suggestions.append('এগুলো শুধু সংরক্ষিত হিসাবের ভিত্তিতে; পূর্ণ লাভ বা ভবিষ্যৎ আয়ের নিশ্চয়তা নয়।')
    return AgentResponse(agent='unnoti', intent='business_insights', message=' '.join(suggestions), insights={
        'period_start': start.isoformat(), 'period_end': today.isoformat(), 'timezone': 'Asia/Dhaka',
        'sales': sales / 100, 'expenses': expenses / 100, 'net_cash_flow': (sales - expenses) / 100,
        'previous_sales': prior_sales / 100, 'sales_change_percent': trend,
        'transaction_count': sum(r['count'] for r in current), 'suggestions': suggestions,
        'daily': [{'date': r['day'], 'sales': r['sales'] / 100, 'expenses': r['expenses'] / 100} for r in current],
    })
