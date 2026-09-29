# ArthoPilot (অর্থপাইলট) — AI Financial Autopilot for Bangladesh CMSMEs

> **Winner-Caliber FinTech MVP Prototype for Bangladesh CMSMEs & Rural Merchants**
> Rebuilt with 100% pixel-accurate fidelity from Google Stitch designs into a fully interactive Next.js + TypeScript + Tailwind CSS application.

---

## 🌟 Overview

**ArthoPilot** is an autonomous AI financial copilot engineered for the 8+ million micro, cottage, small, and medium enterprises (CMSMEs) in Bangladesh. 

Informal business owners typically do not use ERPs, balance sheets, or accounting software—they maintain paper *Lal Khatas* (লাল খাতা) or transact purely over cash, bKash, and Nagad. ArthoPilot bridges this informal-to-formal gap through:
1. **Multilingual Voice Bookkeeping (হিসাব)** supporting regional Bengali dialects (Chatgaya, Sylheti, Promito) with real-time waveform capture and instant voucher generation.
2. **Autonomous Multi-Agent Swarm (এজেন্ট ইকোসিস্টেম)** comprising HISHAB (Auditor), PAHARA (Fraud Guard), NIYOM (Compliance), and UNNOTI (Credit Growth) communicating over an internal event pipeline.
3. **MFS Spoofed SMS & Fraud Guard (পাহারা)** with forensic 94% risk heuristic analysis and immediate wallet freeze protocols.
4. **CMSME Formal Credit Readiness Profile** computing Bangladesh Bank compliant 9% interest EMI models, automated creditworthiness scoring, and exportable bank dossiers.
5. **Artho Mitra (অর্থ মিত্র) Human-in-the-Loop Network** featuring 99.8% GPS geo-fenced field verification agents who physically audit inventories and stamp digital trust.
6. **National Macro Social Impact Dashboard** tracking financial inclusion telemetry across all 64 districts in Bangladesh.

---

## 🚀 Key Implemented Pages & Routes

| Route | Page Name | Core Functionality & Fidelity Highlights |
|---|---|---|
| `/` | **Landing Page** | Full Stitch hero, Bengali/English live toggle, 4-agent feature matrix, interactive financial sparkline, customer metrics, CTA. |
| `/dashboard` | **AI Financial Dashboard** | Real-time KPI summaries, dynamic bKash/Nagad/Cash balance cards, responsive mobile preview simulator, filtered transaction streams, voice command assistant. |
| `/voice` | **Voice Bookkeeper (হিসাব)** | Pulsing microphone animation, live waveform visualizer, dialect selector (প্রমিত বাংলা, চাটগাঁইয়া, সিলেটি), real-time transcription, automated digital voucher with audio playback. |
| `/agents` | **AI Agent Ecosystem** | 4 autonomous agent cards, interactive Swarm simulation (MFS verification, anomaly detection, day-end reconciliation), and live RabbitMQ/gRPC event telemetry log. |
| `/fraud` | **Fraud Guard (পাহারা)** | 94% risk severity gauge, spoofed SMS visual forensics, transaction freeze action with toast feedback, and central MFS fraud database reporting. |
| `/profile` | **Credit Readiness Profile** | Tier-A dossier, 88% credit readiness score, interactive 9% Bangladesh Bank EMI loan slider (BDT 50k - 200k), and required document compliance checklist. |
| `/mitra` | **Artho Mitra (মানব যাচাই)** | Field Officer Kamrul Hasan profile, 99.8% GPS geofenced shop audit, physical Lal Khata photo verification, dual-layer trust model, and interactive visit booking modal. |
| `/impact` | **Social Impact Dashboard** | Countrywide 64-district telemetry, Formal Banking Integration SVG curve, micro-merchant growth stories, and inclusion milestones. |

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React 18, TypeScript)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) with custom Stitch design tokens:
  - Teal (`#00A6A6` / `primary`)
  - Deep Navy (`#12355B` / `navy`)
  - Growth Green (`#38B000` / `growth-green`)
  - Alert Rose (`#E11D48` / `danger`)
  - Slate Canvas (`#F8FAFC`)
- **Typography & Icons**:
  - `Manrope` & `Plus Jakarta Sans` via Google Fonts
  - `Material Symbols Outlined` (Google Fonts icon library for 100% Stitch fidelity)
  - `Lucide React` for interactive controls
- **State Management**:
  - React Context (`AppContext.tsx`) with real-time dynamic transaction store, bilingual dictionary switcher, and interactive alerts.

---

## 💻 Local Setup & Execution

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### 2. Installation
```bash
# Clone or navigate to the project directory
cd d:/arthopilot_gp

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Live Demo & Repository

- **Live Netlify URL**: [https://arthopilot.netlify.app](https://arthopilot.netlify.app)
- **GitHub Repository**: [https://github.com/Neha-hub-maker/arthopilot_gp](https://github.com/Neha-hub-maker/arthopilot_gp)

---

## 🌐 Deployment Settings

### Netlify Configuration
The project is configured via `netlify.toml` with static generation for maximum edge delivery performance:
- **Build Command**: `npm run build`
- **Publish Directory**: `out`
- **Output Mode**: `export` (configured in `next.config.mjs`)
- **Node Version**: 18+ / 20+

#### Automatic Git Deployment:
1. Connect this GitHub repository (`Neha-hub-maker/arthopilot_gp`) to Netlify.
2. Netlify will auto-detect `netlify.toml` with `npm run build` and `out`.
3. Every `git push` to `main` will automatically trigger a production build and deploy.

### Deploy to Vercel
1. Import repository on [Vercel](https://vercel.com).
2. Framework preset **Next.js** is auto-detected.
3. Click **Deploy**.

---

## 🏆 Competition Highlights
- **100% Faithful to Stitch Designs**: Every color code, typography ratio, border radius, and icon precisely mirrors the high-resolution prototype.
- **Bilingual by Design**: Seamless one-click toggling between Bengali (বাংলা) and English across all routes and interactive dialogues.
- **Deep Micro-Interactions**: Real-time waveform audio visualization, dialect recognition preview, instant loan calculator adjustments, and dynamic transaction additions that update all dashboard metrics instantaneously.
