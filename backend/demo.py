"""Run the requested example against the running API without duplicate retries."""
import json

import httpx

if __name__ == '__main__':
    with httpx.Client(base_url='http://127.0.0.1:8000', trust_env=False, timeout=15) as client:
        response = client.post('/chat', json={
            'message': 'আজকে ৫০০ টাকার বিক্রি হয়েছে',
            'request_id': 'arthopilot-required-demo-500',
        })
        response.raise_for_status()
        result = response.json()
        assert result['agent'] == 'hishab', result
        assert result['transaction']['amount'] == 500, result
        print(json.dumps(result, ensure_ascii=False, indent=2))
