from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator

AgentName = Literal['hishab', 'pahara', 'niyom', 'unnoti']


class MessageRequest(BaseModel):
    model_config = ConfigDict(extra='forbid')
    message: str = Field(min_length=1, max_length=8000)

    @field_validator('message')
    @classmethod
    def not_blank(cls, value: str) -> str:
        if not value.strip():
            raise ValueError('Message cannot be blank')
        return value.strip()


class ChatRequest(MessageRequest):
    agent: AgentName | None = None
    save: bool = True
    request_id: str | None = Field(default=None, min_length=8, max_length=100, pattern=r'^[a-zA-Z0-9_-]+$')


class ParsedTransaction(BaseModel):
    type: Literal['sale', 'expense']
    amount: Decimal = Field(gt=0, le=Decimal('1000000000'), max_digits=12, decimal_places=2)
    category: str
    method: Literal['Cash', 'bKash', 'Nagad', 'Bank'] = 'Cash'


class TransactionRecord(BaseModel):
    id: str
    type: Literal['sale', 'expense']
    amount: float
    category: str
    method: str
    description: str
    created_at: str


class Citation(BaseModel):
    source: str
    chunk: int
    score: float
    excerpt: str


class AgentResponse(BaseModel):
    agent: AgentName | None
    intent: str
    message: str
    status: Literal['ok', 'needs_clarification', 'no_sources'] = 'ok'
    mode: str = 'offline'
    transaction: TransactionRecord | None = None
    preview: dict | None = None
    risk_level: Literal['Low', 'Medium', 'High'] | None = None
    reasons: list[str] = Field(default_factory=list)
    citations: list[Citation] = Field(default_factory=list)
    insights: dict | None = None
    trace: list[str] = Field(default_factory=list)
