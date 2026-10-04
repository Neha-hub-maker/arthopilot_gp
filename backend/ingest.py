import json

from .config import Settings
from .rag import KnowledgeIndex

if __name__ == '__main__':
    settings = Settings()
    result = KnowledgeIndex(settings.knowledge_dir, settings.data_dir).rebuild()
    print(json.dumps(result, ensure_ascii=False, indent=2))
