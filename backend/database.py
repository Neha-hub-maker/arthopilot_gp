import hashlib
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timedelta, timezone
from pathlib import Path
from uuid import uuid4

from .schemas import ParsedTransaction, TransactionRecord

DHAKA = timezone(timedelta(hours=6))


class RequestConflict(ValueError):
    pass


class Database:
    def __init__(self, directory: Path):
        directory.mkdir(parents=True, exist_ok=True)
        self.path = directory / 'arthopilot.sqlite3'
        with self.connect() as con:
            con.execute('''CREATE TABLE IF NOT EXISTS transactions (
                id TEXT PRIMARY KEY, type TEXT NOT NULL CHECK(type IN ('sale','expense')),
                amount_paisa INTEGER NOT NULL CHECK(amount_paisa > 0), category TEXT NOT NULL,
                method TEXT NOT NULL, description TEXT NOT NULL, created_at TEXT NOT NULL,
                request_id TEXT UNIQUE, request_hash TEXT NOT NULL)''')
            con.execute('CREATE INDEX IF NOT EXISTS tx_created ON transactions(created_at)')

    @contextmanager
    def connect(self):
        con = sqlite3.connect(self.path, timeout=10)
        con.row_factory = sqlite3.Row
        try:
            with con:
                yield con
        finally:
            con.close()

    @staticmethod
    def record(row) -> TransactionRecord:
        return TransactionRecord(**{k: row[k] for k in ('id', 'type', 'category', 'method', 'description', 'created_at')}, amount=row['amount_paisa'] / 100)

    def save(self, parsed: ParsedTransaction, message: str, request_id: str | None):
        fingerprint = hashlib.sha256(message.encode('utf-8')).hexdigest()
        with self.connect() as con:
            # A write lock makes checking and inserting an idempotency key atomic.
            con.execute('BEGIN IMMEDIATE')
            if request_id:
                existing = con.execute('SELECT * FROM transactions WHERE request_id=?', (request_id,)).fetchone()
                if existing:
                    if existing['request_hash'] != fingerprint:
                        raise RequestConflict('request_id was already used for another message')
                    return self.record(existing)
            tx_id = str(uuid4())
            con.execute('INSERT INTO transactions VALUES (?,?,?,?,?,?,?,?,?)', (
                tx_id, parsed.type, int(parsed.amount * 100), parsed.category, parsed.method,
                message, datetime.now(DHAKA).isoformat(), request_id, fingerprint,
            ))
            return self.record(con.execute('SELECT * FROM transactions WHERE id=?', (tx_id,)).fetchone())

    def list(self, limit=100, offset=0):
        with self.connect() as con:
            rows = con.execute('SELECT * FROM transactions ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?', (limit, offset)).fetchall()
            total = con.execute('SELECT COUNT(*) FROM transactions').fetchone()[0]
        return {'transactions': [self.record(row) for row in rows], 'total': total, 'limit': limit, 'offset': offset}

    def daily_totals(self):
        with self.connect() as con:
            return [dict(row) for row in con.execute('''SELECT substr(created_at,1,10) AS day,
                SUM(CASE WHEN type='sale' THEN amount_paisa ELSE 0 END) AS sales,
                SUM(CASE WHEN type='expense' THEN amount_paisa ELSE 0 END) AS expenses,
                COUNT(*) AS count FROM transactions GROUP BY day ORDER BY day''')]
