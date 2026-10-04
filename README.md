# ArthoPilot (অর্থপাইলট)

Existing Next.js frontend plus a local FastAPI agent backend for Bangla
bookkeeping, fraud screening, document guidance and business insights.

## Architecture

```text
Existing Next.js UI (app/, components/, context/ in original locations)
                        |
                    lib/api.ts
                        |
                   FastAPI :8000
                        |
             Detect intent -> dispatch -> respond
                 /       |       |       \
             Hishab   Pahara   Niyom   Unnoti
                |                |        |
             SQLite       Local RAG    SQLite aggregates
                          + optional local Ollama
```

The orchestrator has explicit state and detection/execution nodes in a
LangGraph-style design. LangChain/LangGraph itself is not installed. Responses
include the selected agent, status, mode and execution trace.

| Agent | Behavior |
| --- | --- |
| Hishab | Bangla/English digits; one completed sale or expense per message; category/payment extraction; preview and persistence |
| Pahara | Text heuristics for credential requests, links, urgency, prizes and payments; Low/Medium/High with Bangla reasons |
| Niyom | Document chunks, local TF-IDF vectors, cosine search and source citations; extractive answers, optional local-model generation |
| Unnoti | Recorded sales, expenses, cash-flow difference and latest seven days versus previous seven days, using Asia/Dhaka dates |

Default `offline` mode needs no API key, model download or network call. It uses
rules and lexical retrieval, not a general-purpose language model.

## Files and installation boundaries

All new dependencies, caches and databases stay under `D:\arthopilot_gp`:

```text
app/, components/, context/       existing UI source, kept in place
lib/api.ts                       browser API client
frontend/node_modules/           existing Node dependencies relocated here
node_modules                     junction -> frontend/node_modules
frontend/run.ps1                 existing frontend runner
backend/.venv/                   isolated Python packages
backend/agents/                  four agents
backend/knowledge/               your UTF-8 .txt/.md documents
backend/data/arthopilot.sqlite3   transaction database
backend/data/vectors.sqlite3      retrieval index
backend/tmp/                     installation/test temporary files
backend/.cache/pip/               installation cache
backend/.env.example              configuration, no API keys
backend/tests/                    isolated backend tests
```

Pre-existing Python at `C:\Program Files\Python314\python.exe` is only used to
create/run the project virtual environment. No packages are installed into that
interpreter. Existing Node is at `D:\Tools\NodeJS`. No system runtime, global
package, database service or model is installed by this integration.

Node packages physically reside in `frontend/node_modules`. The root junction
preserves resolution for the existing root app. Keep it when using root npm
scripts. No npm dependency installation was needed. Do not move `app/` or create
a second frontend app.

## Setup and run (PowerShell)

```powershell
Set-Location D:\arthopilot_gp
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\backend\setup.ps1
```

Setup prints destinations before installing, uses only the project venv/cache/temp,
disables user pip configuration, requires a virtual environment and installs
binary wheels from `requirements.lock.txt`. Direct dependencies are listed in
`requirements.txt`. Verified Python version: 3.14.3. `ExecutionPolicy Bypass`
applies only to that child process; it does not change system policy.

Configuration is optional; defaults work locally. If not already customized:

```powershell
Copy-Item .\backend\.env.example .\backend\.env
Copy-Item .\.env.local.example .\.env.local
```

Start the backend in one terminal:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\backend\start.ps1
```

Start the existing frontend in another:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\frontend\run.ps1 dev
```

Open `http://localhost:3000`. API docs: `http://127.0.0.1:8000/docs`.
Health and startup index status: `/health`. The API binds to loopback. This local
single-business backend has no authentication or tenant isolation; add those
before exposing it publicly.

## Frontend connection

The frontend has been redesigned; see FRONTEND_DESIGN.md. Existing API contracts and backend code are preserved. Data/event handlers
are connected as follows:

- `lib/api.ts` reads `NEXT_PUBLIC_API_BASE_URL`, default `http://127.0.0.1:8000`.
- `AppContext` loads `/transactions` and saves through `/chat`. Dashboard numbers
  use saved records, not seeded demo entries. Empty databases show zero records.
  Network failures show an error toast and do not claim a successful save.
- Existing voice page/modal preview sample transcripts through `/chat` with
  `save:false`; confirmation saves. Stable request IDs prevent duplicate retries.
- Dashboard prompt buttons use `/chat` and `/insights` in their existing response
  panel. The microphone opens the existing bookkeeping modal.
- Fraud scenario selection uses `/fraud-check` and shows actual risk/reasons in
  the existing toast. The risk banner and explanations now reflect actual API results. Previous static score gauges and forensic annotations were replaced; those were
  prototype illustrations, not API risk estimates.

Browser microphone capture and audio playback are now available where supported; regional dialect preferences are not guaranteed recognition models. The previous flows were
simulations. Send arbitrary real text through `/docs`; no new chat screen or
speech service was added. Compound, credit, repayment, future and ambiguous
bookkeeping requests ask for clarification without saving. Some existing sample
prompts intentionally exercise those cases.

Agent animations, bank/gateway verification, wallet freezes, police reporting,
credit scores, loan calculations and Mitra workflows remain frontend demos.
No real messages, payments, reports or freezes are sent. Insight totals are
recorded cash flows, not audited net profit or forecasts. Reconciliation/credit
questions currently receive available aggregate summaries; bank statements and
receivables are not connected.

CORS allows `http://localhost:3000` and `http://127.0.0.1:3000`. Set exact additional
origins in `backend/.env` for other ports. `NEXT_PUBLIC_` configuration is embedded
at build time; rebuild after changing it. Static deployment requires a separately
running reachable HTTPS API; static hosting cannot execute this Python backend.

## API and demo usage

| Method | Endpoint | Behavior |
| --- | --- | --- |
| POST | `/chat` | Detect intent and run the selected agent |
| POST | `/fraud-check` | Pahara screening, no ledger write |
| GET | `/transactions?limit=100&offset=0` | Records, total and pagination; maximum page size 500 |
| GET | `/insights` | Weekly totals, trends and Bangla suggestions |
| GET | `/health` | Backend/provider/index status |

Example `/chat` request:

```json
{
  "message": "আজকে ৫০০ টাকার কাপড় বিক্রি করেছি",
  "save": true,
  "request_id": "my-unique-entry-0001"
}
```

`save` defaults to true and affects only Hishab. Use false to preview. Optional
`agent` can select `hishab`, `pahara`, `niyom` or `unnoti`. Use a fresh request ID
for each intentional entry; the same ID/text returns the existing transaction.
Different text with an existing ID returns 409. Without an ID every successful
save creates a new entry. Validation errors return 422. Ambiguous messages return
`needs_clarification` without saving.

The response includes a transaction containing these fields plus ID, method,
description and creation timestamp:

```json
{"type":"sale","amount":500,"category":"clothing"}
```

SQLite stores money as integer paisa. Hishab validates before writing and never
invents an amount. `নগদে` means cash; `Nagad` or `নগদ অ্যাপ` identifies the wallet.

Other `/chat` examples:

```json
{"message":"OTP দিন এখনই https://payment-check.xyz"}
{"message":"ট্রেড লাইসেন্সের নিয়ম কী?"}
{"message":"ব্যবসার লাভ কেমন?"}
```

`/fraud-check` accepts only `{"message":"..."}`. Low risk does not authenticate a
sender, inspect an SMS image or confirm a payment.

## Niyom knowledge and RAG

Add verified UTF-8 `.txt`/`.md` files beneath `backend/knowledge`, including title,
issuing authority, date and source URL. Restart the backend or run:

```powershell
.\backend\.venv\Scripts\python.exe -B -m backend.ingest
```

Overlapping 200-word chunks and normalized TF-IDF vectors are stored in local
SQLite. Cosine search retrieves up to three cited excerpts. Reindexing atomically
replaces stale/deleted documents. Files over 2 MB and unreadable UTF-8 documents
are skipped with warnings. README files are excluded. Convert PDF/Word/scans to
text first. `/health` shows the startup indexing report; ingest prints its own
fresh report.

No government rules or documents are bundled. Empty/unrelated retrieval returns
`no_sources`, without fabricating legal answers. Lexical retrieval needs shared
words; it is not multilingual semantic embedding search.

Optional generated answers: if a local Ollama server/model is already installed,
set `AI_PROVIDER=ollama` and `OLLAMA_MODEL=<your-installed-model>` in `backend/.env`.
Only loopback HTTP endpoints are accepted. The model receives retrieved evidence
and grounding instructions; review generated answers against citations. It is
not an authority on current law. Model failure falls back to source excerpts.
This project installs/downloads no Ollama software or models. Other agents keep
using their deterministic tools in either mode.

## Verification and requested test

```powershell
.\backend\.venv\Scripts\python.exe -B -m unittest discover -s backend/tests -v
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\frontend\run.ps1 typecheck
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\frontend\run.ps1 build
```

Tests use disposable databases/documents under `backend/tmp` and cover Bangla
parsing, persistence, exact money, concurrent idempotency, rejected entries,
routing, fraud, citations, model failure, weekly trends, CORS and validation.

With the backend running, execute the required input over HTTP:

```powershell
$env:PYTHONIOENCODING = 'utf-8'
.\backend\.venv\Scripts\python.exe -B -m backend.demo
```

Input: `আজকে ৫০০ টাকার বিক্রি হয়েছে`

Expected: `agent: "hishab"`, `type: "sale"`, `amount: 500`, `category: "general"`.
The sentence gives no product category. This saves one real 500-taka demo entry
in the local database; reruns do not duplicate it. Unit tests use isolated data.

The pre-existing frontend uses `output: 'export'`: builds create `out/`. Use the
dev script locally or serve `out/` statically. `next start` is incompatible with
that existing configuration.

References: [FastAPI CORS](https://fastapi.tiangolo.com/tutorial/cors/),
[FastAPI testing](https://fastapi.tiangolo.com/tutorial/testing/),
[Ollama API](https://github.com/ollama/ollama/blob/main/docs/api.md).
