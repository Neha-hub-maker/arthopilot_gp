from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from .agents import pahara, unnoti
from .config import Settings
from .database import Database, RequestConflict
from .orchestrator import Orchestrator
from .rag import KnowledgeIndex
from .schemas import AgentResponse, ChatRequest, MessageRequest


def create_app(settings: Settings | None = None):
    settings = settings or Settings()

    @asynccontextmanager
    async def lifespan(app):
        app.state.database = Database(settings.data_dir)
        app.state.index = KnowledgeIndex(settings.knowledge_dir, settings.data_dir)
        app.state.index_status = app.state.index.rebuild()
        app.state.orchestrator = Orchestrator(app.state.database, app.state.index, settings)
        yield

    app = FastAPI(title='ArthoPilot Agent Backend', version='1.0.0', lifespan=lifespan)
    app.add_middleware(CORSMiddleware, allow_origins=list(settings.cors_origins),
                       allow_credentials=False, allow_methods=['GET', 'POST'], allow_headers=['Content-Type'])

    @app.get('/health')
    def health():
        return {'status': 'ok', 'provider': settings.ai_provider, 'knowledge': app.state.index_status}

    @app.post('/chat', response_model=AgentResponse)
    def chat(request: ChatRequest):
        try:
            return app.state.orchestrator.invoke(request)
        except RequestConflict as exc:
            raise HTTPException(status_code=409, detail=str(exc)) from exc

    @app.post('/fraud-check', response_model=AgentResponse)
    def fraud_check(request: MessageRequest):
        return pahara.run(request.message)

    @app.get('/transactions')
    def transactions(limit: int = Query(100, ge=1, le=500), offset: int = Query(0, ge=0)):
        return app.state.database.list(limit, offset)

    @app.get('/insights', response_model=AgentResponse)
    def insights():
        return unnoti.run(app.state.database)

    return app


app = create_app()
