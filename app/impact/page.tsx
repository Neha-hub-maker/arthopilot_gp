"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

interface ImpactStats {
  merchants: string;
  womenPercent: string;
  literacyPercent: string;
  loansDisbursed: string;
  fraudProtected: string;
}

const STATS_MAP: Record<string, ImpactStats> = {
  "All-time": {
    merchants: "৫২,৪০০+",
    womenPercent: "৬৪.৮%",
    literacyPercent: "৮৭.২%",
    loansDisbursed: "৳৪৭.৫ কোটি",
    fraudProtected: "৳১.৮+ কোটি",
  },
  "FY24-25": {
    merchants: "২৮,২০০+",
    womenPercent: "৬৭.১%",
    literacyPercent: "৮৯.৪%",
    loansDisbursed: "৳২৬.৩ কোটি",
    fraudProtected: "৳১.১ কোটি",
  },
  "Last Quarter": {
    merchants: "৯,৪৫০+",
    womenPercent: "৬৯.৫%",
    literacyPercent: "৯২.১%",
    loansDisbursed: "৳৯.৮ কোটি",
    fraudProtected: "৳৩৮ লাখ",
  },
};

export default function SocialImpactPage() {
  const { showToast, language } = useApp();
  const [selectedTimeframe, setSelectedTimeframe] = useState<"All-time" | "FY24-25" | "Last Quarter">("All-time");
  const [selectedDivision, setSelectedDivision] = useState<string>("Dhaka");

  const currentStats = STATS_MAP[selectedTimeframe];

  const handleDownloadESG = () => {
    showToast("📄 ESG Dossier রিপোর্ট তৈরি হচ্ছে (UN SDG 1, 5, 8 & 9)...");
    setTimeout(() => {
      showToast("✅ ESG Dossier (PDF) সফলভাবে ডাউনলোড হয়েছে!");
    }, 2000);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full max-w-[1400px] mx-auto px-space-md lg:px-gutter-lg pb-margin-lg space-y-space-xl">
        {/* Header & Mission Alignment Strip */}
        <section className="relative pt-space-md pb-space-lg">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
            <div className="max-w-3xl space-y-space-xs">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container text-deep-navy shadow-sm border border-surface-border">
                <span className="w-2 h-2 rounded-full bg-growth-green animate-ping"></span>
                <span className="font-label-sm text-label-sm font-semibold tracking-wider uppercase text-primary">
                  National Impact Monitor • বাংলাদেশ ব্যুরো তথ্য
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-deep-navy tracking-tight font-extrabold">
                কাগজের খাতা থেকে জাতীয় অর্থনীতিতে অন্তর্ভুক্তি •{" "}
                <span className="text-primary font-display-lg text-display-lg block sm:inline">
                  Measurable Social Impact
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Transforming informal micro-commerce into transparent, bankable, and resilient economic
                drivers across all 64 districts of Bangladesh. Built for alignment with UN SDGs 1, 5, 8 &amp; 9.
              </p>
            </div>

            {/* Filter Pills & Export Tools */}
            <div className="flex flex-wrap items-center gap-space-sm bg-surface p-space-xs rounded-2xl shadow-sm border border-surface-border self-start lg:self-auto">
              {(["All-time", "FY24-25", "Last Quarter"] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-space-md py-space-xs rounded-xl font-label-md text-label-md transition-all font-bold ${
                    selectedTimeframe === tf
                      ? "bg-deep-navy text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:text-deep-navy hover:bg-surface-container"
                  }`}
                  type="button"
                >
                  {tf}
                </button>
              ))}

              <div className="w-px h-6 bg-surface-border mx-space-xs"></div>

              <button
                onClick={handleDownloadESG}
                className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-xl font-label-sm text-label-sm text-primary hover:bg-primary/10 transition-colors font-bold"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>ESG Dossier (PDF)</span>
              </button>
            </div>
          </div>
        </section>

        {/* Top 4 Hero Impact Counters (Giant Scale & Glowing Accents) */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
          {/* Card 1: Active Merchants */}
          <div className="relative overflow-hidden rounded-2xl bg-surface p-space-lg shadow-sm hover:shadow-lg transition-all border border-surface-border group">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/15 transition-all"></div>
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold">
                ক্ষুদ্র ব্যবসায়ী সংযোগ
              </span>
              <span className="p-space-xs rounded-xl bg-surface-container text-primary">
                <span className="material-symbols-outlined text-[20px]">storefront</span>
              </span>
            </div>
            <div className="font-headline-lg text-headline-lg text-deep-navy font-extrabold tracking-tight">
              {currentStats.merchants}
            </div>
            <div className="font-label-md text-label-md text-deep-navy font-semibold mt-space-xs">
              Small Merchants Active Nationwide
            </div>
            <div className="mt-space-md pt-space-sm border-t border-surface-border/60 flex items-center gap-space-xs text-tertiary">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              <span className="font-label-sm text-label-sm font-semibold">
                +34% YoY across 48 Upazilas
              </span>
            </div>
          </div>

          {/* Card 2: Women Empowerment */}
          <div className="relative overflow-hidden rounded-2xl bg-surface p-space-lg shadow-sm hover:shadow-lg transition-all border border-surface-border group">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-vibrant-teal/10 blur-2xl group-hover:bg-vibrant-teal/20 transition-all"></div>
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold">
                নারী উদ্যোক্তা স্বাবলম্বন
              </span>
              <span className="p-space-xs rounded-xl bg-surface-container text-vibrant-teal">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  female
                </span>
              </span>
            </div>
            <div className="font-headline-lg text-headline-lg text-deep-navy font-extrabold tracking-tight">
              {currentStats.womenPercent}
            </div>
            <div className="font-label-md text-label-md text-deep-navy font-semibold mt-space-xs">
              Female Business Owners Active
            </div>
            <div className="mt-space-md pt-space-sm border-t border-surface-border/60 flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
              <span className="font-label-sm text-label-sm line-clamp-1">
                Boutiques, f-commerce direct banking
              </span>
            </div>
          </div>

          {/* Card 3: Financial Literacy */}
          <div className="relative overflow-hidden rounded-2xl bg-surface p-space-lg shadow-sm hover:shadow-lg transition-all border border-surface-border group">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-growth-green/10 blur-2xl group-hover:bg-growth-green/20 transition-all"></div>
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold">
                ডিজিটাল আর্থিক সাক্ষরতা
              </span>
              <span className="p-space-xs rounded-xl bg-surface-container text-tertiary">
                <span className="material-symbols-outlined text-[20px]">psychology</span>
              </span>
            </div>
            <div className="font-headline-lg text-headline-lg text-deep-navy font-extrabold tracking-tight">
              {currentStats.literacyPercent}
            </div>
            <div className="font-label-md text-label-md text-deep-navy font-semibold mt-space-xs">
              Financial Autonomy &amp; Confidence
            </div>
            <div className="mt-space-md pt-space-sm border-t border-surface-border/60 flex items-center gap-space-xs text-tertiary">
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              <span className="font-label-sm text-label-sm font-semibold">
                Reading P&amp;L independently
              </span>
            </div>
          </div>

          {/* Card 4: Working Capital Unlocked */}
          <div className="relative overflow-hidden rounded-2xl bg-surface p-space-lg shadow-sm hover:shadow-lg transition-all border border-surface-border group">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-deep-navy/10 blur-2xl group-hover:bg-deep-navy/15 transition-all"></div>
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-bold">
                সহজ শর্তে ঋণ তহবিল
              </span>
              <span className="p-space-xs rounded-xl bg-surface-container text-deep-navy">
                <span className="material-symbols-outlined text-[20px]">account_balance</span>
              </span>
            </div>
            <div className="font-headline-lg text-headline-lg text-deep-navy font-extrabold tracking-tight">
              {currentStats.loansDisbursed}
            </div>
            <div className="font-label-md text-label-md text-deep-navy font-semibold mt-space-xs">
              BDT Micro-Loans Disbursed
            </div>
            <div className="mt-space-md pt-space-sm border-t border-surface-border/60 flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-tertiary">arrow_downward</span>
              <span className="font-label-sm text-label-sm">
                Interest: <span className="text-danger-rose line-through font-semibold">35%</span> to{" "}
                <span className="text-tertiary font-bold">9% p.a.</span>
              </span>
            </div>
          </div>
        </section>

        {/* Detailed Impact Breakdown: Analytical Visuals & Prevention Metrics */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Graph 1: Formal Banking Integration Curve */}
          <div className="lg:col-span-7 rounded-2xl bg-surface p-space-lg shadow-sm border border-surface-border flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
                <div>
                  <div className="inline-flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Institutional Credit Pathway
                  </div>
                  <h2 className="font-headline-sm text-headline-sm text-deep-navy font-bold mt-space-xs">
                    Formal Banking Integration Curve
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Progressive merchant transition from unrated ledger cash flows to institutional credit lines.
                  </p>
                </div>
                <div className="flex items-center gap-space-xs self-start sm:self-auto bg-surface-container-low p-space-xs rounded-xl border border-surface-border/40">
                  <span className="px-space-xs py-0.5 rounded-lg text-[11px] font-semibold bg-surface text-deep-navy shadow-xs">
                    Micro-Traders
                  </span>
                  <span className="px-space-xs py-0.5 rounded-lg text-[11px] font-semibold text-on-surface-variant">
                    SME Scale
                  </span>
                </div>
              </div>

              {/* Custom Responsive Metric SVG Chart */}
              <div className="relative w-full h-64 mt-space-md">
                <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 600 240">
                  <defs>
                    <linearGradient id="curveGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#00A6A6" stopOpacity="0.35"></stop>
                      <stop offset="100%" stopColor="#00A6A6" stopOpacity="0.0"></stop>
                    </linearGradient>
                  </defs>

                  <line stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="600" y1="40" y2="40"></line>
                  <line stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="600" y1="100" y2="100"></line>
                  <line stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="600" y1="160" y2="160"></line>
                  <line stroke="#E2E8F0" strokeWidth="1" x1="0" x2="600" y1="220" y2="220"></line>

                  <path d="M 30 215 Q 150 205 240 170 T 420 85 T 570 30 L 570 220 L 30 220 Z" fill="url(#curveGradient)"></path>
                  <path d="M 30 215 Q 150 205 240 170 T 420 85 T 570 30" fill="none" stroke="#00A6A6" strokeLinecap="round" strokeWidth="3.5"></path>

                  <g className="cursor-pointer group">
                    <circle cx="30" cy="215" fill="#12355B" r="5"></circle>
                    <text fill="#3d4949" fontFamily="Plus Jakarta Sans" fontSize="10" textAnchor="middle" x="30" y="235">Stage 0: খাতা</text>
                  </g>
                  <g className="cursor-pointer group">
                    <circle cx="240" cy="170" fill="#12355B" r="5"></circle>
                    <circle className="animate-ping opacity-75" cx="240" cy="170" r="9" stroke="#00A6A6" strokeWidth="2"></circle>
                    <text fill="#3d4949" fontFamily="Plus Jakarta Sans" fontSize="10" textAnchor="middle" x="240" y="195">Stage 1: ভয়েস রেকর্ড</text>
                  </g>
                  <g className="cursor-pointer group">
                    <circle cx="420" cy="85" fill="#12355B" r="5"></circle>
                    <text fill="#3d4949" fontFamily="Plus Jakarta Sans" fontSize="10" textAnchor="middle" x="420" y="110">Stage 2: স্কোর তৈরি</text>
                  </g>
                  <g className="cursor-pointer group">
                    <circle cx="570" cy="30" fill="#38B000" r="6"></circle>
                    <text fill="#206d00" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="700" x="500" y="20">ঋণ অনুমোদন (Bank Disbursal)</text>
                  </g>
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-space-sm pt-space-md border-t border-surface-border mt-space-sm bg-surface-container-low/60 rounded-xl p-space-sm">
              <div>
                <span className="font-body-sm text-body-sm text-on-surface-variant block">Zero-to-Credit Days</span>
                <span className="font-headline-sm text-headline-sm text-deep-navy font-bold">৪২ দিন</span>
              </div>
              <div>
                <span className="font-body-sm text-body-sm text-on-surface-variant block">Partner Bank Portals</span>
                <span className="font-headline-sm text-headline-sm text-deep-navy font-bold">৭ টি ব্যাংক</span>
              </div>
              <div>
                <span className="font-body-sm text-body-sm text-on-surface-variant block">Repayment Health</span>
                <span className="font-headline-sm text-headline-sm text-growth-green font-bold">৯৯.১%</span>
              </div>
            </div>
          </div>

          {/* Graph 2: Financial Security Shield */}
          <div className="lg:col-span-5 rounded-2xl bg-surface p-space-lg shadow-sm border border-surface-border flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <div className="inline-flex items-center gap-space-xs text-danger-rose font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  <span className="material-symbols-outlined text-[16px]">shield</span>
                  Fraud Loss Defense
                </div>
                <span className="px-space-xs py-0.5 rounded-full bg-danger-rose/10 text-danger-rose font-label-sm text-label-sm font-bold">
                  MFS Scams Blocked
                </span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                টাকা হারানোর হাত থেকে সুরক্ষা
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                Saved fragile margins by intercepting fake bKash/Nagad SMS screenshots and unauthorized balance debits.
              </p>

              {/* Metric Highlight Box */}
              <div className="my-space-md p-space-md rounded-xl bg-surface-container-low border border-surface-border/40 flex items-center justify-between">
                <div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block">
                    Total Direct Capital Protected
                  </span>
                  <span className="font-headline-md text-headline-md text-deep-navy font-extrabold">
                    {currentStats.fraudProtected}
                  </span>
                  <span className="font-label-sm text-label-sm text-tertiary font-semibold block mt-0.5">
                    Saved from Fraudsters
                  </span>
                </div>
                <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[28px]">lock_reset</span>
                </div>
              </div>

              {/* Prevention Breakdown Bars */}
              <div className="space-y-space-sm">
                <div>
                  <div className="flex justify-between font-label-sm text-label-sm mb-1">
                    <span className="text-deep-navy font-semibold">Fake Payment SMS Phishing</span>
                    <span className="text-on-surface-variant font-bold">৬৪% (৳১.১৫ কোটি)</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                    <div className="bg-vibrant-teal h-full rounded-full" style={{ width: "64%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-label-sm text-label-sm mb-1">
                    <span className="text-deep-navy font-semibold">Voice-over Ledger Impersonation</span>
                    <span className="text-on-surface-variant font-bold">২৬% (৳৪৬ লাখ)</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                    <div className="bg-secondary h-full rounded-full" style={{ width: "26%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-label-sm text-label-sm mb-1">
                    <span className="text-deep-navy font-semibold">Distributor Double-Billing</span>
                    <span className="text-on-surface-variant font-bold">১০% (৳১৯ লাখ)</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                    <div className="bg-warning-amber h-full rounded-full" style={{ width: "10%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-space-md border-t border-surface-border mt-space-md flex items-center justify-between text-on-surface-variant">
              <span className="font-label-sm text-label-sm flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[16px] text-growth-green">check_circle</span>
                AI Fraud Guard Active 24/7
              </span>
              <Link className="font-label-sm text-label-sm text-primary font-bold hover:underline" href="/fraud">
                অডিট লগ দেখুন →
              </Link>
            </div>
          </div>
        </section>

        {/* Geographic Footprint & Cluster Distribution Map */}
        <section className="rounded-2xl bg-surface p-space-lg shadow-sm border border-surface-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-md">
            <div>
              <div className="inline-flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                Countrywide Penetration
              </div>
              <h2 className="font-headline-sm text-headline-sm text-deep-navy font-bold mt-space-xs">
                সারাদেশে ৬৪ জেলায় বিস্তৃত নেটওয়ার্ক
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Real-time telemetry showing merchant hubs across urban, semi-urban, and off-grid bazaar clusters.
              </p>
            </div>
            <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-space-xs rounded-xl border border-surface-border/40">
              <span className="w-2.5 h-2.5 rounded-full bg-growth-green animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-deep-navy font-semibold">
                Live Clusters: 184 active hubs
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-center">
            {/* Visual Hotspots Map Overlay */}
            <div className="lg:col-span-8 rounded-2xl overflow-hidden relative shadow-inner border border-surface-border">
              <div
                className="w-full h-96 bg-cover bg-center rounded-2xl relative"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAPZ7EXKzKBYAsyLI-Og7reeuTrZKSKLG6BOjc4saboTmnUaeGuTyBhFjsOQVEyujHsg-9n_y1b_WOEe0EuqE_72qhG9Y-2ARe-dZrcBaQKtB1oOEWznax-IYYdG1IIEN-WYTe6sPC638ViN_nGulRQlacvFSCr8kNecl5LCbYNSRS9EjCtKj5x4dJMY_e3pH56kzi9YGOkivmd_55EhQCGsnEJXjNL9zcXy-LM4HZ_L06AkADrM3D3')",
                }}
              >
                <div className="absolute inset-0 bg-deep-navy/40 backdrop-blur-[1px] p-space-md flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="bg-surface/95 backdrop-blur-md px-space-sm py-space-xs rounded-xl font-label-sm text-label-sm text-deep-navy font-bold shadow-md">
                      Dhaka Metropolitan • 16,840 Nodes
                    </span>
                    <span className="bg-surface/95 backdrop-blur-md px-space-sm py-space-xs rounded-xl font-label-sm text-label-sm text-deep-navy font-bold shadow-md">
                      Sylhet Tea-Belt • 5,420 Nodes
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="bg-surface/95 backdrop-blur-md px-space-sm py-space-xs rounded-xl font-label-sm text-label-sm text-deep-navy font-bold shadow-md">
                      Khulna &amp; Jashore Cluster • 8,910 Nodes
                    </span>
                    <span className="bg-surface/95 backdrop-blur-md px-space-sm py-space-xs rounded-xl font-label-sm text-label-sm text-deep-navy font-bold shadow-md">
                      Chittagong Coastal Trade • 14,200 Nodes
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Ledger Stats */}
            <div className="lg:col-span-4 space-y-space-sm">
              {[
                { name: "Dhaka Division (ঢাকা)", share: "32.1%", desc: "Wholesale textiles, grocery kiosks, and cloud kitchen bakeries." },
                { name: "Chittagong & Cox's Bazar", share: "27.3%", desc: "Cross-border supplies, dry-fish markets, and logistics agents." },
                { name: "Rajshahi & Rangpur (উত্তরবঙ্গ)", share: "18.6%", desc: "Agri-dealers, cold store fruit traders, and cottage silk weavers." },
                { name: "Khulna, Barishal & Sylhet", share: "22.0%", desc: "Aquaculture feeds, regional transport fleets, and handicraft guilds." },
              ].map((reg, idx) => (
                <div
                  key={idx}
                  className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors border border-surface-border/40"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-label-md text-label-md text-deep-navy font-bold">{reg.name}</span>
                    <span className="font-label-sm text-label-sm text-primary font-bold">{reg.share}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{reg.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real Stories from the Field: Human-Centric Micro-Stories */}
        <section className="space-y-space-md">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
            <div>
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                Grassroots Transformation • বাস্তব পরিবর্তন
              </span>
              <h2 className="font-headline-sm text-headline-sm text-deep-navy font-bold mt-space-xs">
                মাঠপর্যায়ের সফল উদ্যোক্তাদের অভিজ্ঞতা
              </h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
              How autonomous voice bookkeeping replaced debt anxieties with measurable credit readiness for rural shopkeepers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {/* Story 1 */}
            <div className="rounded-2xl bg-surface overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row border border-surface-border">
              <div className="sm:w-2/5 h-56 sm:h-auto shrink-0 relative">
                <img
                  className="w-full h-full object-cover"
                  alt="Rokeya Begum"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9dSwshdFRMnvnDM90RHmhN-uqEwLcvpFEIZuDKLwb-CofvWR8qJ67I3bn14VOW1_zuc9KIgLOPnBGFNAS7uG9JdHesIIFK0q373td7nwfVhC0k3GJ1nB_afyNImkuc4oUci4bQsif42JeO7gs5x1XVX4djq2m6UJ4AvdqYMHIYiNvzdvkoORtPxZ46RqLJbSg8uL5cGlXoA0DpZV6_FNLi3_mlKDs3w6j60VRe-5owuttXcvJ4IoY"
                />
                <span className="absolute top-space-xs left-space-xs bg-deep-navy/85 backdrop-blur-sm text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-md">
                  বুটিক ও হস্তশিল্প • কুমিল্লা
                </span>
              </div>
              <div className="p-space-md flex flex-col justify-between flex-1 space-y-space-sm">
                <div>
                  <div className="flex items-center gap-space-xs text-warning-amber">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <h3 className="font-title-md text-title-md text-deep-navy font-bold mt-space-xs">
                    রোকেয়া বেগম (Rokeya's Crafts)
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant italic mt-1">
                    "আগে মহাজনের কাছ থেকে ৩০% সুদে টাকা নিতাম। অর্থপাইলটে মুখে কথা বলে হিসাব রাখতেই ৩ মাসে ব্যাংক আমাকে ২ লাখ টাকা সহজ ঋণ দিয়েছে।"
                  </p>
                </div>
                <div className="pt-space-sm border-t border-surface-border flex items-center justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">Loan Received</span>
                    <span className="font-label-md text-label-md text-primary font-bold">
                      ৳২,০০,০০০ (City Bank SME)
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-growth-green font-bold">৯% মুনাফাহার</span>
                </div>
              </div>
            </div>

            {/* Story 2 */}
            <div className="rounded-2xl bg-surface overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row border border-surface-border">
              <div className="sm:w-2/5 h-56 sm:h-auto shrink-0 relative">
                <img
                  className="w-full h-full object-cover"
                  alt="Abul Kashem"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEeO5Deztv-n2d1ZfSsAfTaGlS0mU290rA0l4c2DVlxkgf-x-m1SPKGVyGgtRC9Tu6ZmbJ0mLdFeOVujo4HhUHP1Fx4MXNSBsYOKYxpxCNZYZ_qoAsx9rZ1RGpTtM9Jcqv5XlleCd7ufOEBdU2Ck9vZvRrLmZ0za7OwWCKSrqfI30Ed3HcmTW4PLZxhobM4bXL5XVFwixIg_Gmzfa0xW55j9f22rDzsOOgqkl3YfgL3Ok0gBP1nVyz"
                />
                <span className="absolute top-space-xs left-space-xs bg-deep-navy/85 backdrop-blur-sm text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-md">
                  মুদি ও পাইকারি • বগুড়া
                </span>
              </div>
              <div className="p-space-md flex flex-col justify-between flex-1 space-y-space-sm">
                <div>
                  <div className="flex items-center gap-space-xs text-warning-amber">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <h3 className="font-title-md text-title-md text-deep-navy font-bold mt-space-xs">
                    আবুল কাশেম (Kashem Store)
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant italic mt-1">
                    "পাহারা এজেন্টের কারণে গত সপ্তাহে ভুয়া বিকাশ এসএমএস থেকে ৩৫,০০০ টাকার চালের বস্তা রক্ষা পেয়েছি। আমার ব্যবসার সবচেয়ে বিশ্বস্ত প্রহরী।"
                  </p>
                </div>
                <div className="pt-space-sm border-t border-surface-border flex items-center justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">Fraud Avoided</span>
                    <span className="font-label-md text-label-md text-danger-rose font-bold">
                      ৳৩৫,০০০ সুরক্ষিত
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-growth-green font-bold">১০০% রিকভারি</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* UN SDG Alignment Badges */}
        <section className="p-space-lg rounded-2xl bg-surface-container-low border border-surface-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Global Impact Standards
              </span>
              <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                UN Sustainable Development Goals (SDG Alignment)
              </h3>
              <p className="text-xs text-on-surface-variant">
                ArthoPilot directly advances United Nations SDG targets for financial inclusion and gender equity in South Asia.
              </p>
            </div>

            <div className="flex items-center gap-space-sm flex-wrap justify-center">
              <div className="px-3 py-2 bg-red-600 text-white rounded-xl font-bold text-xs shadow-sm">
                SDG 1: No Poverty
              </div>
              <div className="px-3 py-2 bg-orange-600 text-white rounded-xl font-bold text-xs shadow-sm">
                SDG 5: Gender Equality
              </div>
              <div className="px-3 py-2 bg-red-800 text-white rounded-xl font-bold text-xs shadow-sm">
                SDG 8: Decent Work
              </div>
              <div className="px-3 py-2 bg-orange-500 text-white rounded-xl font-bold text-xs shadow-sm">
                SDG 9: Industry & Innovation
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
