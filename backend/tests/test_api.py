import json
import tempfile
import unittest
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta
from pathlib import Path
from unittest.mock import patch

import httpx
from fastapi.testclient import TestClient

from backend.config import ROOT, Settings
from backend.database import DHAKA, Database
from backend.main import create_app


class BackendTests(unittest.TestCase):
    def setUp(self):
        (ROOT / 'tmp').mkdir(exist_ok=True)
        self.temp = tempfile.TemporaryDirectory(dir=ROOT / 'tmp')
        self.base = Path(self.temp.name)
        self.settings = Settings(data_dir=self.base / 'data', knowledge_dir=self.base / 'knowledge', ai_provider='offline')
        self.app = create_app(self.settings)
        self.client = TestClient(self.app)
        self.client.__enter__()

    def tearDown(self):
        self.client.__exit__(None, None, None)
        self.temp.cleanup()

    def chat(self, message, **extra):
        response = self.client.post('/chat', json={'message': message, **extra})
        self.assertEqual(response.status_code, 200, response.text)
        return response.json()

    def test_required_bangla_demo(self):
        result = self.chat('আজকে ৫০০ টাকার বিক্রি হয়েছে')
        self.assertEqual(result['agent'], 'hishab')
        self.assertEqual(result['transaction']['type'], 'sale')
        self.assertEqual(result['transaction']['amount'], 500)
        self.assertEqual(result['trace'], ['detect_intent', 'execute_hishab', 'respond'])

    def test_clothing_example(self):
        result = self.chat('আজকে ৫০০ টাকার কাপড় বিক্রি করেছি')
        self.assertEqual(result['transaction']['category'], 'clothing')

    def test_preview_does_not_save(self):
        result = self.chat('আজ ৫০০ টাকা বিক্রি করেছি', save=False)
        self.assertIsNone(result['transaction'])
        self.assertEqual(result['preview']['amount'], 500)
        self.assertEqual(self.client.get('/transactions').json()['total'], 0)

    def test_persistence_and_exact_money(self):
        self.chat('বিকাশে ১,২০০.৫০ টাকা খরচ করেছি')
        db = Database(self.settings.data_dir)
        tx = db.list()['transactions'][0]
        self.assertEqual(tx.amount, 1200.50)
        self.assertEqual(tx.type, 'expense')
        self.assertEqual(tx.method, 'bKash')
        with db.connect() as con:
            self.assertEqual(con.execute('SELECT amount_paisa FROM transactions').fetchone()[0], 120050)

    def test_retries_and_conflicts(self):
        result = self.chat('৫০০ টাকা বিক্রি করেছি', request_id='test-retry-0001')
        again = self.chat('৫০০ টাকা বিক্রি করেছি', request_id='test-retry-0001')
        self.assertEqual(result['transaction']['id'], again['transaction']['id'])
        response = self.client.post('/chat', json={'message': '৬০০ টাকা বিক্রি করেছি', 'request_id': 'test-retry-0001'})
        self.assertEqual(response.status_code, 409)
        self.assertEqual(self.client.get('/transactions').json()['total'], 1)

    def test_concurrent_duplicate_saves(self):
        def save(_):
            return self.chat('৫০০ টাকা বিক্রি করেছি', request_id='concurrent-0001')['transaction']['id']
        with ThreadPoolExecutor(max_workers=4) as pool:
            ids = list(pool.map(save, range(4)))
        self.assertEqual(len(set(ids)), 1)
        self.assertEqual(self.client.get('/transactions').json()['total'], 1)

    def test_ambiguous_and_unsafe_entries_do_not_save(self):
        messages = [
            'বিক্রি করেছি', 'আজ ৫০০ টাকা বিক্রি, খরচ ২০০ টাকা',
            'আজ -৫০০ টাকা বিক্রি করেছি', 'আজ ০ টাকা বিক্রি করেছি',
            'আজ ৫০০.১২৩ টাকা বিক্রি করেছি', 'আজ ৫০০ টাকা বিক্রি করিনি',
            'আগামীকাল ৫০০ টাকা বিক্রি করব', 'আজ ৫ হাজার টাকা বিক্রি করেছি',
            'আজ ৫০০ টাকা বাকি বিক্রি করেছি', 'আজ ২টি কাপড় ৫০০ টাকায় বিক্রি করেছি',
            'আজ ৫০০ টাকা বিক্রি হলে কী হবে?', 'আজ ১,২ টাকা বিক্রি করেছি',
        ]
        for message in messages:
            with self.subTest(message=message):
                result = self.chat(message, agent='hishab')
                self.assertEqual(result['status'], 'needs_clarification')
        self.assertEqual(self.client.get('/transactions').json()['total'], 0)

    def test_question_routes_to_insights_without_save(self):
        result = self.chat('আজ ৫০০ টাকা বিক্রি হলে লাভ কত?')
        self.assertEqual(result['agent'], 'unnoti')
        self.assertEqual(self.client.get('/transactions').json()['total'], 0)

    def test_unknown_does_not_guess(self):
        self.assertEqual(self.chat('হ্যালো')['status'], 'needs_clarification')

    def test_fraud_routing_has_priority_over_sales(self):
        result = self.chat('৫০০ টাকা বিক্রি হয়েছে SMS: OTP পাঠান এখনই')
        self.assertEqual(result['agent'], 'pahara')
        self.assertEqual(result['risk_level'], 'High')
        self.assertEqual(self.client.get('/transactions').json()['total'], 0)

    def test_fraud_levels_and_bangla_reasons(self):
        for text, level in [('OTP দিন এখনই', 'High'), ('টাকা পাঠান', 'Medium'), ('আজ দোকান খোলা', 'Low'), ('Never share your OTP', 'Low')]:
            with self.subTest(text=text):
                result = self.client.post('/fraud-check', json={'message': text}).json()
                self.assertEqual(result['risk_level'], level)
                self.assertTrue(any('\u0980' <= c <= '\u09ff' for c in result['message']))

    def test_validation(self):
        for body in ({'message': ''}, {'message': ' '}, {'message': 'x' * 8001}, {'message': 'hello', 'agent': 'bad'}, {'message': 'hello', 'extra': 1}):
            self.assertEqual(self.client.post('/chat', json=body).status_code, 422)
        for query in ('?limit=0', '?limit=501', '?offset=-1'):
            self.assertEqual(self.client.get('/transactions' + query).status_code, 422)

    def test_insight_totals_and_zero_baseline(self):
        self.chat('১০০০ টাকা বিক্রি করেছি')
        self.chat('৩০০ টাকা খরচ করেছি')
        result = self.client.get('/insights').json()['insights']
        self.assertEqual((result['sales'], result['expenses'], result['net_cash_flow']), (1000, 300, 700))
        self.assertIsNone(result['sales_change_percent'])
        self.assertEqual(result['transaction_count'], 2)

    def test_weekly_trend_and_old_data_exclusion(self):
        old = self.chat('৫০০ টাকা বিক্রি করেছি')['transaction']['id']
        earlier = (datetime.now(DHAKA) - timedelta(days=8)).isoformat()
        with self.app.state.database.connect() as con:
            con.execute('UPDATE transactions SET created_at=? WHERE id=?', (earlier, old))
        self.chat('১০০০ টাকা বিক্রি করেছি')
        result = self.client.get('/insights').json()['insights']
        self.assertEqual(result['sales'], 1000)
        self.assertEqual(result['previous_sales'], 500)
        self.assertEqual(result['sales_change_percent'], 100)

    def test_no_sources_no_fabricated_answer(self):
        result = self.chat('ট্রেড লাইসেন্সের নিয়ম কী?')
        self.assertEqual(result['agent'], 'niyom')
        self.assertEqual(result['status'], 'no_sources')
        self.assertEqual(result['citations'], [])

    def test_retrieval_citations_refresh_and_irrelevant_question(self):
        document = self.settings.knowledge_dir / 'training.txt'
        document.write_text('ব্যবসার হিসাব সংরক্ষণ: বিক্রি ও খরচের রসিদ আলাদা রাখুন। এটি পরীক্ষার শিক্ষা উপকরণ।', encoding='utf-8')
        self.app.state.index.rebuild()
        result = self.chat('রসিদ সংরক্ষণ', agent='niyom')
        self.assertEqual(result['mode'], 'extractive_rag')
        self.assertEqual(result['citations'][0]['source'], 'training.txt')
        self.assertIn('রসিদ', result['citations'][0]['excerpt'])
        self.assertEqual(self.chat('astronomy nebula', agent='niyom')['status'], 'no_sources')
        document.unlink()
        self.app.state.index.rebuild()
        self.assertEqual(self.chat('রসিদ সংরক্ষণ', agent='niyom')['status'], 'no_sources')

    def test_optional_model_failure_preserves_evidence(self):
        from backend.agents.niyom import run
        (self.settings.knowledge_dir / 'sample.txt').write_text('রসিদ সংরক্ষণ করুন।', encoding='utf-8')
        self.app.state.index.rebuild()
        settings = Settings(data_dir=self.settings.data_dir, knowledge_dir=self.settings.knowledge_dir, ai_provider='ollama', ollama_model='test')
        with patch('httpx.Client.post', side_effect=httpx.ConnectError('unavailable')):
            result = run('রসিদ', self.app.state.index, settings)
        self.assertEqual(result.mode, 'extractive_rag')
        self.assertEqual(len(result.citations), 1)

    def test_cors(self):
        headers = {'Origin': 'http://localhost:3000', 'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'content-type'}
        response = self.client.options('/chat', headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers['access-control-allow-origin'], headers['Origin'])
        headers['Origin'] = 'https://untrusted.example'
        self.assertEqual(self.client.options('/chat', headers=headers).status_code, 400)

    def test_storage_cannot_escape_backend(self):
        with self.assertRaises(ValueError):
            Settings(data_dir=ROOT.parent / 'outside')

    def test_pagination(self):
        self.chat('৫০০ টাকা বিক্রি করেছি')
        self.chat('৬০০ টাকা বিক্রি করেছি')
        result = self.client.get('/transactions?limit=1&offset=1').json()
        self.assertEqual(result['total'], 2)
        self.assertEqual(result['transactions'][0]['amount'], 500)


if __name__ == '__main__':
    unittest.main()
