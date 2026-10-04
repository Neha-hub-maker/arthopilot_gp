"""Local sparse TF-IDF vectors, cosine retrieval, and source-preserving chunks.

No embedding download, external vector service, or model is required.
"""
import json
import math
import re
import sqlite3
import threading
import unicodedata
from collections import Counter
from contextlib import closing
from pathlib import Path

from .schemas import Citation

STOPWORDS = {'কি', 'কী', 'কিভাবে', 'কীভাবে', 'করতে', 'হবে', 'এবং', 'জন্য', 'আমার', 'আমি', 'করে', 'the', 'a', 'an', 'how', 'to', 'is', 'of', 'and', 'for', 'what'}


def tokens(text):
    text = unicodedata.normalize('NFC', text.lower())
    return [word for word in re.findall(r'[a-z0-9\u0980-\u09ff]+', text) if word not in STOPWORDS and len(word) > 1]


def vector(text, idf):
    counts = Counter(tokens(text))
    values = {word: (1 + math.log(count)) * idf[word] for word, count in counts.items() if word in idf}
    length = math.sqrt(sum(v * v for v in values.values()))
    return {word: value / length for word, value in values.items()} if length else {}


class KnowledgeIndex:
    def __init__(self, knowledge_dir: Path, data_dir: Path):
        self.knowledge_dir = knowledge_dir
        self.knowledge_dir.mkdir(parents=True, exist_ok=True)
        data_dir.mkdir(parents=True, exist_ok=True)
        self.path = data_dir / 'vectors.sqlite3'
        self.lock = threading.RLock()
        self.warnings = []

    def rebuild(self):
        chunks, warnings = [], []
        for path in sorted(self.knowledge_dir.rglob('*')):
            if path.suffix.lower() not in ('.md', '.txt') or path.name.lower() == 'readme.md':
                continue
            if not path.resolve().is_relative_to(self.knowledge_dir.resolve()) or not path.is_file():
                continue
            if path.stat().st_size > 2_000_000:
                warnings.append(f'{path.name}: exceeds 2 MB limit')
                continue
            try:
                text = path.read_text(encoding='utf-8-sig')
            except (UnicodeError, OSError):
                warnings.append(f'{path.name}: cannot read UTF-8 text')
                continue
            # Overlapping word chunks preserve Unicode text and source names.
            words = text.split()
            for index, start in enumerate(range(0, len(words), 150)):
                excerpt = ' '.join(words[start:start + 200])
                if excerpt:
                    chunks.append((path.relative_to(self.knowledge_dir).as_posix(), index + 1, excerpt))
        frequencies = Counter(word for _, _, text in chunks for word in set(tokens(text)))
        idf = {word: math.log((1 + len(chunks)) / (1 + count)) + 1 for word, count in frequencies.items()}
        with self.lock, closing(sqlite3.connect(self.path)) as con, con:
            con.execute('CREATE TABLE IF NOT EXISTS chunks(source TEXT, chunk INTEGER, text TEXT, vector TEXT)')
            con.execute('CREATE TABLE IF NOT EXISTS metadata(key TEXT PRIMARY KEY, value TEXT)')
            con.execute('DELETE FROM chunks')
            con.executemany('INSERT INTO chunks VALUES (?,?,?,?)', [(source, chunk, text, json.dumps(vector(text, idf))) for source, chunk, text in chunks])
            con.execute('INSERT OR REPLACE INTO metadata VALUES (?,?)', ('idf', json.dumps(idf)))
            self.warnings = warnings
        return {'chunks': len(chunks), 'documents': len({c[0] for c in chunks}), 'warnings': warnings}

    def search(self, question, limit=3):
        with self.lock, closing(sqlite3.connect(self.path)) as con:
            idf_row = con.execute("SELECT value FROM metadata WHERE key='idf'").fetchone()
            query = vector(question, json.loads(idf_row[0]) if idf_row else {})
            hits = []
            for source, chunk, text, encoded in con.execute('SELECT source, chunk, text, vector FROM chunks'):
                values = json.loads(encoded)
                score = sum(value * values.get(word, 0) for word, value in query.items())
                if score >= 0.12:
                    hits.append(Citation(source=source, chunk=chunk, excerpt=text, score=round(score, 4)))
        return sorted(hits, key=lambda hit: (-hit.score, hit.source, hit.chunk))[:limit]
