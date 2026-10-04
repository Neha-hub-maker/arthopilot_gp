"""Small LangGraph-style state flow: detect -> dispatch -> respond.

Nodes communicate through explicit state; agents own their tools. No hosted
agent runtime or orchestration service is required.
"""
from dataclasses import dataclass, field

from .agents import hishab, niyom, pahara, unnoti
from .schemas import AgentResponse, ChatRequest


@dataclass
class AgentState:
    request: ChatRequest
    agent: str | None = None
    response: AgentResponse | None = None
    trace: list[str] = field(default_factory=list)


class Orchestrator:
    def __init__(self, database, index, settings):
        self.database, self.index, self.settings = database, index, settings

    def detect(self, state):
        text = hishab.normalize(state.request.message)
        has = lambda words: hishab.contains(text, words)
        if state.request.agent:
            state.agent = state.request.agent
        elif has(('sms', 'এসএমএস', 'মেসেজ', 'phishing', 'প্রতারণা', 'জালিয়াতি', 'জালিয়াতি', 'সন্দেহ', 'otp', 'ওটিপি', 'পিন', 'pin', 'password', 'লিংক', 'লিঙ্ক', 'http', 'টাকা পাঠান', 'send money', 'payment request')):
            state.agent = 'pahara'
        elif has(('নিয়ম', 'নিয়ম', 'লাইসেন্স', 'কর ', 'ভ্যাট', 'নিবন্ধন', 'সরকারি', 'guideline', 'compliance', 'license', 'tax', 'vat', 'sme', 'procedure')):
            state.agent = 'niyom'
        elif has(('লাভ', 'পরামর্শ', 'উন্নতি', 'প্রবণতা', 'কেমন', 'তুলনা', 'দেখাও', 'কত', 'মিলিয়ে', 'মিলিয়ে', 'অনুপাত', 'insight', 'trend', 'profit', 'summary')):
            state.agent = 'unnoti'
        elif has(hishab.SALE_WORDS + hishab.EXPENSE_WORDS):
            state.agent = 'hishab'
        state.trace.append('detect_intent')

    def execute(self, state):
        if state.agent == 'hishab':
            state.response = hishab.run(state.request, self.database)
        elif state.agent == 'pahara':
            state.response = pahara.run(state.request.message)
        elif state.agent == 'niyom':
            state.response = niyom.run(state.request.message, self.index, self.settings)
        elif state.agent == 'unnoti':
            state.response = unnoti.run(self.database)
        else:
            state.response = AgentResponse(agent=None, intent='unknown', status='needs_clarification',
                message='বিক্রি/খরচের হিসাব, সন্দেহজনক বার্তা, নিয়মসংক্রান্ত প্রশ্ন অথবা ব্যবসার পরামর্শ লিখুন।')
        state.trace.append('execute_' + (state.agent or 'clarification'))

    def invoke(self, request):
        state = AgentState(request)
        self.detect(state)
        self.execute(state)
        state.response.trace = state.trace + ['respond']
        return state.response
