# ArthoPilot redesign screenshots

Captured from the running project in Chrome at 1440 × 1040. Mobile captures use
390 × 844. Dashboard and insights use the explicitly labeled demo preview;
voice and fraud are connected to the running local backend.

| Screen | Screenshot |
| --- | --- |
| Landing | [01_landing.png](01_landing.png) |
| Dashboard | [02_dashboard.png](02_dashboard.png) |
| Voice AI | [03_voice_ai.png](03_voice_ai.png) |
| Agent ecosystem | [04_agents.png](04_agents.png) |
| Fraud protection | [05_fraud.png](05_fraud.png) |
| Business insights | [06_insights.png](06_insights.png) |

Additional captures: `01_landing_full.png`, `07_voice_saved.png`, and
`mobile_*.png`. Other older numbered screenshots remain from the previous design.

Verification completed on October 4, 2026:

- All 9 routes loaded at desktop and mobile sizes without horizontal overflow.
- No browser runtime exceptions; all 101 observed API responses succeeded.
- Voice preview and save, all four agents, fraud examples, dashboard prompts,
  transaction filters, modal Escape handling, mobile navigation and reduced
  motion passed browser checks.
- TypeScript and the production build passed; 12 static pages generated.
- All 16 backend source file hashes match the snapshot taken before redesign.
- No new npm dependencies. Fonts and browser-test profile stay in the project.

See `ui-verification.json` for the captured browser report and
`../FRONTEND_DESIGN.md` for implementation and reproduction details.
