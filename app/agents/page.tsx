"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

interface Scenario {
  id: number;
  title: string;
  trigger: string;
  steps: {
    agent: string;
    action: string;
    status: string;
    color: string;
    icon: string;
  }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: "বিকাশ লেনদেন যাচাই (bKash Payment Verification)",
    trigger: "গ্রাহক বিকাশ মার্চেন্ট পেমেন্ট করলেন: ৳১,৫০০",
    steps: [
      {
        agent: "PAHARA (পাহারা)",
        action: "বিকাশ এসএমএস ও TrxID স্ক্রিনিং: জালিয়াতি নেই, গেটওয়ে ভেরিফায়েড",
        status: "নিরাপদ • ০.২s",
        color: "text-growth-green",
        icon: "security",
      },
      {
        agent: "HISHAB (হিসাব)",
        action: "ডাবল-এন্ট্রি খতিয়ানে জমা: ক্যাশ বুক ক্রেডিট ৳১,৫০০, রাজস্ব বৃদ্ধি",
        status: "লেজার সিঙ্ক • ০.৪s",
        color: "text-vibrant-teal",
        icon: "calculate",
      },
      {
        agent: "NIYOM (নিয়ম)",
        action: "ভ্যাট সিলিং পরীক্ষণ: বর্তমান মাসিক লেনদেন করমুক্ত সীমার ভেতরে",
        status: "কমপ্লায়েন্ট • ০.৫s",
        color: "text-secondary",
        icon: "gavel",
      },
      {
        agent: "UNNOTI (উন্নতি)",
        action: "বিকল্প ক্রেডিট স্কোর আপডেট: ক্রেডিট স্কোর +৪ পয়েন্ট বৃদ্ধি",
        status: "স্কোর: ৭৮৯ • ০.৮s",
        color: "text-growth-green",
        icon: "trending_up",
      },
    ],
  },
  {
    id: 2,
    title: "জালিয়াতি সনাক্তকরণ (Fraud Detection Interception)",
    trigger: "অজ্ঞাত নম্বর থেকে সন্দেহজনক নকল বিকাশ মেসেজ আসল",
    steps: [
      {
        agent: "PAHARA (পাহারা)",
        action: "🚨 নকল এসএমএস শনাক্ত! ক্রিপ্টোগ্রাফিক কোড নেই, ভুয়া রাউটিং",
        status: "ব্লকড • ০.১s",
        color: "text-danger-rose",
        icon: "warning",
      },
      {
        agent: "HISHAB (হিসাব)",
        action: "লেজার এন্ট্রি স্থগিত: কোনো ভুয়া ক্রেডিট যুক্ত হতে দেওয়া হয়নি",
        status: "সুরক্ষিত • ০.৩s",
        color: "text-vibrant-teal",
        icon: "lock",
      },
      {
        agent: "NIYOM (নিয়ম)",
        action: "অপরাধ রিপোর্ট ডাটাবেজে এন্ট্রি এবং সাইবার সুরক্ষা রেকর্ড তৈরি",
        status: "লগ সংরক্ষিত • ০.৪s",
        color: "text-secondary",
        icon: "policy",
      },
      {
        agent: "UNNOTI (উন্নতি)",
        action: "দোকানদারের মূলধন রক্ষা সতর্কতা: ৩,৫০০ টাকার পণ্য ডেলিভারি স্থগিতের সুপারিশ",
        status: "সতর্কবার্তা • ০.৬s",
        color: "text-warning-amber",
        icon: "crisis_alert",
      },
    ],
  },
  {
    id: 3,
    title: "দিন-শেষের সমাপনী ও ক্রেডিট সিঙ্ক (Day-end Closing)",
    trigger: "দোকান বন্ধ করার সময় দৈনিক হিসাব পর্যালোচনা শুরু",
    steps: [
      {
        agent: "HISHAB (হিসাব)",
        action: "২৪টি লেনদেনের চূড়ান্ত ব্যালেন্স মেলানো: ক্যাশ ড্রয়ার ৳৪,৩০০, বিকাশ ৳৬,১০০",
        status: "সমাপনী সফল • ০.৫s",
        color: "text-vibrant-teal",
        icon: "fact_check",
      },
      {
        agent: "PAHARA (পাহারা)",
        action: "সারাদিনের সব পেমেন্ট অডিট সম্পন্ন: কোনো অমিল বা অস্বাভাবিক রিভার্সেল নেই",
        status: "ক্লিয়ারড • ০.৬s",
        color: "text-growth-green",
        icon: "verified_user",
      },
      {
        agent: "NIYOM (নিয়ম)",
        action: "মাসিক পিঅ্যান্ডএল (P&L) ফাইল প্রস্তুত: ব্র্যাক ব্যাংক স্ট্যান্ডার্ড ফাইল এনক্রিপ্ট",
        status: "রেডি • ০.৭s",
        color: "text-secondary",
        icon: "description",
      },
      {
        agent: "UNNOTI (উন্নতি)",
        action: "সাপ্তাহিক পূর্বাভাস তৈরি: আগামী ৩ দিনে কাঁচামাল কেনার জন্য ৳৮,০০০ লিকুইডিটি প্রস্তাব",
        status: "অ্যাকশনেবল • ০.৯s",
        color: "text-growth-green",
        icon: "insights",
      },
    ],
  },
];

export default function AgentsPage() {
  const { showToast, language } = useApp();
  const [selectedAgent, setSelectedAgent] = useState<string>("hishab");
  const [activeScenarioId, setActiveScenarioId] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(4);

  const activeScenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimStep(0);
    showToast("⚡ Autonomous Swarm Simulation চলমান...");

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setSimStep(current);
      if (current >= 4) {
        clearInterval(interval);
        setIsSimulating(false);
        showToast("✅ সোয়ার্ম কার্যপ্রণালী সফলভাবে সম্পন্ন হয়েছে!");
      }
    }, 700);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Interactive Ambient Header Canvas */}
      <section className="relative w-full px-space-md lg:px-gutter-lg pt-space-lg pb-space-xl overflow-hidden">
        <div className="absolute -top-24 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 bg-growth-green/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg relative z-10">
          {/* Top Meta Breadcrumbs / System Health Bar */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs bg-surface shadow-sm rounded-full border border-surface-border/60">
              <span className="w-2.5 h-2.5 rounded-full bg-growth-green animate-ping"></span>
              <span className="font-label-sm text-label-sm text-deep-navy font-semibold uppercase tracking-wider">
                ArthoNet Swarm • v3.8
              </span>
              <span className="text-on-surface-variant text-label-sm">/</span>
              <span className="font-label-sm text-label-sm text-primary font-medium">
                ঢাকা ক্লাস্টার (Dhaka Cluster)
              </span>
            </div>

            <div className="flex items-center gap-space-md bg-surface px-space-md py-space-xs rounded-full shadow-sm border border-surface-border/60">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-growth-green text-[18px]">verified_user</span>
                <span className="font-label-sm text-label-sm text-deep-navy font-bold">
                  All 4 Agents Active
                </span>
              </div>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-vibrant-teal animate-pulse"></span>
                24/7 Realtime Monitoring
              </span>
            </div>
          </div>

          {/* Main Headline Grid with Asymmetric Metric Badge */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-end">
            <div className="lg:col-span-8 flex flex-col gap-space-xs">
              <div className="flex items-center gap-space-xs text-primary font-label-md text-label-md font-bold tracking-tight">
                <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                <span>স্বয়ংক্রিয় এআই ইকোসিস্টেম</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-deep-navy font-extrabold tracking-tight leading-tight">
                আপনার ব্যবসার বিশ্বস্ত চার এআই প্রতিনিধি <br className="hidden sm:inline" />
                <span className="text-primary font-headline-md text-headline-md font-normal">
                  • 4 Autonomous AI Agents
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-space-xs">
                ArthoPilot runs four specialized agents behind the scenes to automate daily bookkeeping,
                protect against digital fraud, ensure regulatory readiness, and unlock credit access.
              </p>
            </div>

            {/* Live Swarm Heartbeat Metric Display */}
            <div className="lg:col-span-4 bg-surface p-space-md rounded-2xl shadow-sm border border-surface-border flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">
                  সমন্বিত নিরাপত্তা ও গতি
                </span>
                <span className="font-headline-md text-headline-md text-deep-navy font-bold">৯৯.৮৮%</span>
                <span className="font-body-sm text-body-sm text-growth-green flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[15px]">sync_alt</span>
                  ০.৮ সেকেন্ড প্রতিক্রিয়া সময়
                </span>
              </div>
              <div className="w-28 h-12">
                <svg className="w-full h-full text-primary" fill="none" viewBox="0 0 100 40">
                  <path
                    d="M0 32 L15 28 L30 35 L45 15 L60 22 L75 8 L90 14 L100 5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  ></path>
                  <path
                    d="M0 32 L15 28 L30 35 L45 15 L60 22 L75 8 L90 14 L100 5 V 40 H 0 Z"
                    fill="currentColor"
                    fillOpacity="0.08"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Core Agents Showcase (Bento Grid) */}
      <section className="w-full px-space-md lg:px-gutter-lg pb-space-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
          {/* AGENT 1: HISHAB (হিসাব) */}
          <div
            onClick={() => setSelectedAgent("hishab")}
            className={`group bg-surface rounded-2xl p-space-lg shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer border ${
              selectedAgent === "hishab" ? "border-primary ring-2 ring-primary/20" : "border-surface-border/60"
            }`}
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>
            <div className="flex flex-col gap-space-md relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    edit_note
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-space-sm py-space-xs rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-growth-green"></span>
                  Active • ১৪টি এন্ট্রি
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-space-xs">
                  <h2 className="font-headline-sm text-headline-sm text-deep-navy font-bold tracking-tight">
                    HISHAB
                  </h2>
                  <span className="font-headline-sm text-headline-sm text-primary font-semibold">(হিসাব)</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mt-0.5 font-bold">
                  Autonomous Bookkeeper
                </span>
                <p className="font-body-md text-body-md text-on-surface mt-space-sm">
                  স্বাভাবিক বাংলা কথ্য অডিও ও মোবাইল ভাউচার স্ক্যান থেকে তাৎক্ষণিক ক্রয়-বিক্রয়ের ডিজিটাল খতিয়ান লেখে।
                </p>
              </div>

              <div className="bg-surface-container-low p-space-sm rounded-xl flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">মোট নথিভুক্ত</span>
                  <span className="font-label-md text-label-md text-deep-navy font-bold">২.৪M+ লেনদেন</span>
                </div>
                <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[88%] rounded-full"></div>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-1">
                  <span>ডাবল-এন্ট্রি স্বয়ংক্রিয়</span>
                  <span className="text-growth-green font-semibold">১০০% মিল</span>
                </div>
              </div>

              <div className="flex flex-col gap-space-xs pt-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                  রিয়েল-টাইম কাজসমূহ:
                </span>
                <div className="flex items-center gap-space-xs text-on-surface font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[16px] text-primary">receipt_long</span>
                  <span>bKash/Nagad এসএমএস রিডার</span>
                </div>
                <div className="flex items-center gap-space-xs text-on-surface font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[16px] text-primary">account_balance_wallet</span>
                  <span>লাইভ ক্যাশ ড্রয়ার মেলানো</span>
                </div>
              </div>
            </div>

            <div className="pt-space-md mt-space-md border-t border-surface-border/40 flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">লেটেন্সি: &lt;১.১s</span>
              <span className="text-xs font-bold text-primary group-hover:underline">সিলেক্টেড ✓</span>
            </div>
          </div>

          {/* AGENT 2: PAHARA (পাহারা) */}
          <div
            onClick={() => setSelectedAgent("pahara")}
            className={`group bg-surface rounded-2xl p-space-lg shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer border ${
              selectedAgent === "pahara" ? "border-danger-rose ring-2 ring-danger-rose/20" : "border-surface-border/60"
            }`}
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-danger-rose/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>
            <div className="flex flex-col gap-space-md relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-danger-rose shadow-sm">
                  <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    security
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-space-sm py-space-xs rounded-full bg-surface-container-low text-danger-rose font-label-sm text-label-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-danger-rose animate-pulse"></span>
                  Guarding • Zero Breaches
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-space-xs">
                  <h2 className="font-headline-sm text-headline-sm text-deep-navy font-bold tracking-tight">
                    PAHARA
                  </h2>
                  <span className="font-headline-sm text-headline-sm text-danger-rose font-semibold">(পাহারা)</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mt-0.5 font-bold">
                  Fraud Guard &amp; Sentinel
                </span>
                <p className="font-body-md text-body-md text-on-surface mt-space-sm">
                  ভুয়া পেমেন্ট এসএমএস, রিভার্সেল ট্র্যাপ ও বিকৃত কিউআর কোড স্ক্যাম থেকে দোকানদারকে মুহূর্তে সতর্ক করে।
                </p>
              </div>

              <div className="bg-surface-container-low p-space-sm rounded-xl flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">প্রতারণা সনাক্তকরণ হার</span>
                  <span className="font-label-md text-label-md text-deep-navy font-bold">৯৯.৪% নির্ভুল</span>
                </div>
                <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                  <div className="bg-danger-rose h-full w-[99.4%] rounded-full"></div>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-1">
                  <span>সুরক্ষিত তহবিল</span>
                  <span className="text-deep-navy font-bold">৳৮৪ লাখ+</span>
                </div>
              </div>

              <div className="flex flex-col gap-space-xs pt-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                  রিয়েল-টাইম কাজসমূহ:
                </span>
                <div className="flex items-center gap-space-xs text-on-surface font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[16px] text-danger-rose">mark_email_read</span>
                  <span>এসএমএস ক্রিপ্টোগ্রাফিক ভ্যালিডেশন</span>
                </div>
                <div className="flex items-center gap-space-xs text-on-surface font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[16px] text-danger-rose">qr_code_scanner</span>
                  <span>QR কোড তথ্য অমিল পরীক্ষণ</span>
                </div>
              </div>
            </div>

            <div className="pt-space-md mt-space-md border-t border-surface-border/40 flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">রেসপন্স: ১.২ সেকেন্ড</span>
              <Link href="/fraud" className="text-xs font-bold text-danger-rose hover:underline">
                পাহারা স্ক্রিন ↗
              </Link>
            </div>
          </div>

          {/* AGENT 3: NIYOM (নিয়ম) */}
          <div
            onClick={() => setSelectedAgent("niyom")}
            className={`group bg-surface rounded-2xl p-space-lg shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer border ${
              selectedAgent === "niyom" ? "border-secondary ring-2 ring-secondary/20" : "border-surface-border/60"
            }`}
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-secondary/15 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>
            <div className="flex flex-col gap-space-md relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-secondary shadow-sm">
                  <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    gavel
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-space-sm py-space-xs rounded-full bg-surface-container-low text-secondary font-label-sm text-label-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  Compliant • FY25 প্রস্তুত
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-space-xs">
                  <h2 className="font-headline-sm text-headline-sm text-deep-navy font-bold tracking-tight">
                    NIYOM
                  </h2>
                  <span className="font-headline-sm text-headline-sm text-secondary font-semibold">(নিয়ম)</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mt-0.5 font-bold">
                  Compliance Guide
                </span>
                <p className="font-body-md text-body-md text-on-surface mt-space-sm">
                  ট্রেড লাইসেন্স, ভ্যাট স্ল্যাব ও বাংলাদেশ ব্যাংকের কুটির ও ক্ষুদ্র শিল্প নির্দেশনা সহজ ভাষায় ব্যাখ্যা করে।
                </p>
              </div>

              <div className="bg-surface-container-low p-space-sm rounded-xl flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">পলিসি কমপ্লায়েন্স</span>
                  <span className="font-label-md text-label-md text-deep-navy font-bold">বাংলাদেশ ব্যাংক SME</span>
                </div>
                <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full w-[94%] rounded-full"></div>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-1">
                  <span>কর হিসাব সুবিধা</span>
                  <span className="text-deep-navy font-semibold">১-ক্লিকে স্টেটমেন্ট</span>
                </div>
              </div>

              <div className="flex flex-col gap-space-xs pt-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                  রিয়েল-টাইম কাজসমূহ:
                </span>
                <div className="flex items-center gap-space-xs text-on-surface font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[16px] text-secondary">calculate</span>
                  <span>NBR ভ্যাট সিলিং ক্যালকুলেশন</span>
                </div>
                <div className="flex items-center gap-space-xs text-on-surface font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[16px] text-secondary">notifications_active</span>
                  <span>ট্রেড লাইসেন্স রিনিউয়াল এলার্ট</span>
                </div>
              </div>
            </div>

            <div className="pt-space-md mt-space-md border-t border-surface-border/40 flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">স্টেটাস: আপডেট</span>
              <span className="text-xs font-bold text-secondary">বিধিমালা প্রস্তুত</span>
            </div>
          </div>

          {/* AGENT 4: UNNOTI (উন্নতি) */}
          <div
            onClick={() => setSelectedAgent("unnoyon")}
            className={`group bg-surface rounded-2xl p-space-lg shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer border ${
              selectedAgent === "unnoyon" ? "border-growth-green ring-2 ring-growth-green/20" : "border-surface-border/60"
            }`}
          >
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-growth-green/15 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none"></div>
            <div className="flex flex-col gap-space-md relative z-10">
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-growth-green shadow-sm">
                  <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    trending_up
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-space-sm py-space-xs rounded-full bg-surface-container-low text-growth-green font-label-sm text-label-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-growth-green animate-pulse"></span>
                  ৩টি সুযোগ উন্মুক্ত
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-space-xs">
                  <h2 className="font-headline-sm text-headline-sm text-deep-navy font-bold tracking-tight">
                    UNNOTI
                  </h2>
                  <span className="font-headline-sm text-headline-sm text-growth-green font-semibold">(উন্নতি)</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mt-0.5 font-bold">
                  Growth &amp; Credit Advisor
                </span>
                <p className="font-body-md text-body-md text-on-surface mt-space-sm">
                  ভবিষ্যৎ নগদ টাকার প্রবাহ বিশ্লেষণ করে দ্রুত লোন অনুমোদন এবং পণ্য মজুদের আগাম নির্দেশনা দেয়।
                </p>
              </div>

              <div className="bg-surface-container-low p-space-sm rounded-xl flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">মুনাফা বৃদ্ধি হার</span>
                  <span className="font-label-md text-label-md text-growth-green font-bold">+২৭% গড় বৃদ্ধি</span>
                </div>
                <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                  <div className="bg-growth-green h-full w-[78%] rounded-full"></div>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-1">
                  <span>প্রাক-অনুমোদিত ঋণ</span>
                  <span className="text-deep-navy font-bold">৳৩,৫০,০০০ প্রস্তুত</span>
                </div>
              </div>

              <div className="flex flex-col gap-space-xs pt-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                  রিয়েল-টাইম কাজসমূহ:
                </span>
                <div className="flex items-center gap-space-xs text-on-surface font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[16px] text-growth-green">inventory_2</span>
                  <span>রমজান পূর্ববর্তী স্টক রি-অর্ডার এলার্ট</span>
                </div>
                <div className="flex items-center gap-space-xs text-on-surface font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[16px] text-growth-green">handshake</span>
                  <span>ব্যাংক ক্ষুদ্রঋণ মেলানোর ইঞ্জিন</span>
                </div>
              </div>
            </div>

            <div className="pt-space-md mt-space-md border-t border-surface-border/40 flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">পরামর্শ: ৩টি নতুন</span>
              <Link href="/profile" className="text-xs font-bold text-growth-green hover:underline">
                ক্রেডিট প্রোফাইল ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Agent Workflow Sandbox & Live Simulation */}
      <section className="w-full px-space-md lg:px-gutter-lg pb-space-xl">
        <div className="max-w-7xl mx-auto bg-surface rounded-2xl p-space-md lg:p-space-xl shadow-md border border-surface-border relative overflow-hidden">
          {/* Sandbox Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-lg border-b border-surface-border">
            <div>
              <div className="inline-flex items-center gap-1.5 text-primary font-label-sm text-label-sm uppercase tracking-wider font-bold">
                <span className="material-symbols-outlined text-[18px]">hub</span>
                <span>Agent Interaction Engine</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold mt-1">
                চার এজেন্টের যৌথ কার্যপ্রণালী সিমুলেশন (Autonomous Swarm Pipeline)
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                একটি কাস্টমার লেনদেন আসার পর এজেন্টরা কীভাবে নিজেদের মধ্যে রিয়েল-টাইম তথ্য শেয়ার করে
              </p>
            </div>

            {/* Simulation Interactive Selector */}
            <div className="flex flex-wrap items-center gap-space-xs bg-surface-container-low p-1.5 rounded-full border border-surface-border/60">
              {SCENARIOS.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => {
                    setActiveScenarioId(sc.id);
                    setSimStep(4);
                  }}
                  className={`px-space-md py-space-xs rounded-full font-label-sm text-label-sm font-semibold transition-all ${
                    activeScenarioId === sc.id
                      ? "bg-deep-navy text-white shadow-sm"
                      : "text-on-surface-variant hover:text-deep-navy"
                  }`}
                >
                  {sc.id === 1 ? "বিকাশ লেনদেন" : sc.id === 2 ? "জালিয়াতি সনাক্ত" : "দিন-শেষের ক্লোজিং"}
                </button>
              ))}
            </div>
          </div>

          {/* Trigger Event Banner */}
          <div className="my-space-md p-space-md bg-surface-container-low rounded-xl border border-surface-border/60 flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <span className="w-3 h-3 rounded-full bg-vibrant-teal animate-ping"></span>
              <div>
                <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider block">
                  ট্রিগার ইভেন্ট (Incoming Event):
                </span>
                <span className="font-headline-sm text-headline-sm text-deep-navy font-bold text-[17px]">
                  {activeScenario.trigger}
                </span>
              </div>
            </div>
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className={`px-space-md py-space-xs rounded-xl font-label-md text-label-md font-bold flex items-center gap-2 transition-all ${
                isSimulating
                  ? "bg-surface-border text-on-surface-variant cursor-not-allowed"
                  : "bg-vibrant-teal text-white hover:bg-primary shadow-md active:scale-95"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              <span>{isSimulating ? "সিমুলেশন চলছে..." : "পুনরায় সিমুলেট করুন"}</span>
            </button>
          </div>

          {/* Animated Pipeline Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md mt-space-md">
            {activeScenario.steps.map((st, idx) => {
              const isVisible = simStep > idx;
              return (
                <div
                  key={idx}
                  className={`p-space-md rounded-xl transition-all duration-500 border ${
                    isVisible
                      ? "bg-surface shadow-md border-vibrant-teal/40 scale-100"
                      : "bg-surface-container-low/40 border-surface-border/40 opacity-40 scale-95"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-surface-container text-deep-navy">
                      ধাপ ০{idx + 1}
                    </span>
                    <span className={`text-xs font-bold ${st.color}`}>{st.status}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">{st.icon}</span>
                    <h4 className="font-headline-sm text-headline-sm text-deep-navy font-bold text-[16px]">
                      {st.agent}
                    </h4>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed">{st.action}</p>
                </div>
              );
            })}
          </div>

          {/* Swarm Communication Log */}
          <div className="mt-space-lg p-space-md bg-deep-navy text-on-primary rounded-xl font-mono text-xs space-y-1 shadow-inner">
            <div className="flex items-center justify-between text-secondary-fixed border-b border-white/10 pb-1 mb-2">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-growth-green"></span>
                ArthoNet Realtime Event-Driven Message Bus (RabbitMQ/gRPC Protocol)
              </span>
              <span>Latency: 0.8ms</span>
            </div>
            <div className="text-primary-fixed">
              [2025-10-24 14:28:01] INGEST: event_type="PAYMENT_RECEIVED" channel="bKash" id="EV-88419"
            </div>
            <div className="text-tertiary-fixed">
              [2025-10-24 14:28:02] DISPATCH -&gt; PaharaSentinelAgent.evaluate() =&gt; RISK_SCORE=0.01 (CLEARED)
            </div>
            <div className="text-white">
              [2025-10-24 14:28:03] EMIT -&gt; HishabBookkeeper.postDoubleEntry(ledger_id="LD-9912", dr="Cash", cr="Revenue")
            </div>
            <div className="text-secondary-fixed">
              [2025-10-24 14:28:04] COMMIT -&gt; UnnoyiCreditAdvisor.updateScore() =&gt; ALL_AGENTS_SYNCED
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
