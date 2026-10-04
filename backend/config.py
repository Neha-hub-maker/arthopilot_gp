import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent
load_dotenv(ROOT / '.env')


@dataclass(frozen=True)
class Settings:
    data_dir: Path = ROOT / 'data'
    knowledge_dir: Path = ROOT / 'knowledge'
    cors_origins: tuple[str, ...] = tuple(
        s.strip() for s in os.getenv('CORS_ORIGINS', 'http://localhost:3000,http://127.0.0.1:3000').split(',') if s.strip()
    )
    ai_provider: str = os.getenv('AI_PROVIDER', 'offline')
    ollama_base_url: str = os.getenv('OLLAMA_BASE_URL', 'http://127.0.0.1:11434')
    ollama_model: str = os.getenv('OLLAMA_MODEL', '')
    ollama_timeout: float = float(os.getenv('OLLAMA_TIMEOUT_SECONDS', '30'))

    def __post_init__(self):
        for path in (self.data_dir, self.knowledge_dir):
            if not path.resolve().is_relative_to(ROOT.resolve()):
                raise ValueError('Storage must stay inside backend/')
        if self.ai_provider not in ('offline', 'ollama'):
            raise ValueError('AI_PROVIDER must be offline or ollama')
