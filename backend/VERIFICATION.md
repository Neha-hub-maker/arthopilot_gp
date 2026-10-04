# Integration verification — 2026-10-03 (Asia/Dhaka)

- Backend: 20 automated tests passed.
- TypeScript: `tsc --noEmit --incremental false` passed.
- Production build: all 11 static pages generated successfully.
- UI preservation: final return/markup blocks of the voice page, dashboard,
  fraud page and voice modal match the original Git version exactly. CSS,
  layout, navigation and assets were not edited. No visual browser comparison
  was performed.
- Live HTTP test: `POST http://127.0.0.1:8000/chat` with
  `আজকে ৫০০ টাকার বিক্রি হয়েছে` returned HTTP 200, `agent=hishab`,
  `type=sale`, `amount=500`, `category=general`, `status=ok`.
- The demo transaction was persisted; `/transactions` returned one record and
  `/insights` returned recorded sales of 500. Repeated demo runs use the same
  idempotency key.
- `/health` returned OK. Knowledge documents/chunks: zero, as expected before
  adding your documents. Retrieval tests used isolated sample files.
- Optional Ollama generation was not exercised against a real model. The
  model-unavailable fallback was tested.

Verified physical package destinations:

```text
D:\arthopilot_gp\backend\.venv\Lib\site-packages
D:\arthopilot_gp\frontend\node_modules
```

Python installation cache and temporary files were directed to `backend/.cache`
and `backend/tmp`. Existing Node packages were moved within the workspace, with
a root junction preserving frontend resolution. No npm packages, system runtimes
or models were installed. No files installed outside `D:\arthopilot_gp`.

Non-blocking output: the build could not download the existing Google Fonts
stylesheets and skipped font optimization. The backend test client emitted an
upstream Starlette warning about future HTTPX support. Tests/build still passed.
