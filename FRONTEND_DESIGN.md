# ArthoPilot frontend redesign

The existing Next.js app now has a separate marketing layout and product workspace.
No backend source, dependency or API contract was changed. No npm dependency was
added. Icons use the existing Lucide package; charts use SVG; motion uses CSS.

## Design system

- Primary navy `#07111F`; brand navy `#12355B`; AI teal `#00A6A6`;
  growth green `#38B000`; canvas `#F8FAFC`.
- Manrope headings and Inter body text. Fonts and their licenses are stored in
  `public/fonts`; `app/local-fonts.css` loads them without external requests.
- Shared components: workspace shell, headings, status labels, metrics, charts,
  insights, agent metadata and voice experience in `components/product`.
- Responsive sidebar, modal keyboard handling, visible focus indicators and
  reduced-motion styles. Original credit, Mitra and impact workflows remain
  accessible through the new workspace navigation.

## Pages

| Route | Experience |
| --- | --- |
| `/` | Product-led hero, animated transaction preview, four agents, Bangla conversation and entrepreneur story |
| `/dashboard` | Business overview, API-backed records, filters, wallet totals, insight prompts, mobile preview |
| `/voice` | Large microphone, editable Bangla transcript, processing steps, preview, confirmation, success and recent records |
| `/agents` | Interactive core/node visualization, agent selection, real API previews and three example workflows |
| `/fraud` | Actual risk level and Bangla reasons from Pahara, editable message, safe/suspicious examples, demo incident controls |
| `/insights` | Sales, expenses and net cash-flow charts; API explanation, expense categories, refresh and CSV export |
| `/profile`, `/mitra`, `/impact` | Existing interactive workflows within the new shared design system |

## Live and demo data

Dashboard and insights default to real API data. The explicit **Demo preview**
switch uses frontend-only sample data; append `?demo=1` for a demo-day walkthrough.
Sample values, growth figures and health score are labeled. Live mode does not
fabricate a health score, growth baseline or evening-sales pattern. The landing
product showcase is illustrative and never saves a record.

The API client remains `lib/api.ts`. Existing `/chat`, `/fraud-check`,
`/transactions` and `/insights` calls remain active. Agent previews use
`save:false`. Voice confirmation calls the existing context save method with a
stable request ID. Backend failure never produces a successful-save screen.

Browser speech recognition is an optional enhancement: support and Bangla voices
depend on the browser/device. A microphone gesture requests browser permission;
typed input and sample prompts always remain available. Regional dialect choice
is a preference; the browser is configured for `bn-BD`. Voice playback uses the
browser speech synthesizer. This does not add a speech service to the backend.

Fraud hold/report controls remain local demo state and explicitly say they do
not send a bank/police report. Niyom still needs knowledge documents; the UI
displays its actual no-sources answer when the library is empty.

## Run and verify

Use the existing commands in `README.md` to start FastAPI and the frontend.

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\frontend\run.ps1 dev
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\frontend\run.ps1 typecheck
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\frontend\run.ps1 build
```

`frontend/verify-ui.mjs` uses Node's native WebSocket with Chrome DevTools, so it
requires no browser-testing package. Start the existing Chrome in headless mode
with port 9222 and a user profile at `frontend/.cache/chrome`, then run:

```powershell
node .\frontend\verify-ui.mjs
```

Both servers must be running on ports 3000 and 8000. The save check uses the
existing required-demo idempotency key and exact message, avoiding a duplicate.
The check covers all nine routes at 1440 px and 390 px, all four API endpoints,
agent previews, voice saving, modal dismissal, filters and mobile navigation.
Results are written to `screenshots/ui-verification.json`.

Requested screenshots:

- `screenshots/01_landing.png`
- `screenshots/02_dashboard.png`
- `screenshots/03_voice_ai.png`
- `screenshots/04_agents.png`
- `screenshots/05_fraud.png`
- `screenshots/06_insights.png`

Additional screenshots include the full landing page, saved voice transaction,
and mobile views. The sample dashboard and insights screenshots explicitly show
demo mode. Backend source hashes are checked against the pre-redesign snapshot
in `screenshots/backend-before.json`.
