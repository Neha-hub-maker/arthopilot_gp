"use client";

import React, { useState, useEffect } from "react";
import { useApp, Transaction } from "@/context/AppContext";

export default function VoiceBookkeeperPage() {
  const {
    transactions,
    addTransaction,
    todaySales,
    todayExpenses,
    language,
    showToast,
  } = useApp();

  const [dialect, setDialect] = useState<"std" | "ctg" | "syl">("std");
  const [isRecording, setIsRecording] = useState(false);
  const [stage, setStage] = useState<"ready" | "listening" | "analyzing" | "complete">("complete");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [spokenText, setSpokenText] = useState("আজ ৫০০ টাকার পণ্য বিক্রি করেছি");
  const [parsedData, setParsedData] = useState<{
    amount: number;
    category: string;
    item: string;
    method: "Cash" | "bKash" | "Nagad" | "Bank";
    type: "inflow" | "outflow";
    voucherNo: string;
    time: string;
    balance: number;
  }>({
    amount: 500,
    category: "পণ্য বিক্রি",
    item: "বুটিক আইটেম",
    method: "Cash",
    type: "inflow",
    voucherNo: "AP-৮৯৪",
    time: "আজ, ১০:৪৩ পূর্বাহ্ন",
    balance: todaySales - todayExpenses,
  });

  const promptOptions = [
    {
      label: "বাকি বিক্রি করেছি",
      text: "বটতলার রফিকের কাছে ৭৫০ টাকার বাকি শাড়ি বিক্রি করেছি",
      amount: 750,
      category: "বাকি বিক্রি",
      item: "সুতি শাড়ি",
      method: "Cash" as const,
      type: "inflow" as const,
    },
    {
      label: "পাইকারি মাল ক্রয়",
      text: "ইসলামপুর পাইকারি বাজার থেকে ৩,৪০০ টাকার কাপড় ও সুতা কিনলাম ক্যাশে",
      amount: 3400,
      category: "কাঁচামাল খরচ",
      item: "কাপড় ও সুতা",
      method: "Cash" as const,
      type: "outflow" as const,
    },
    {
      label: "দোকান ভাড়া পরিশোধ",
      text: "দোকানের চলতি মাসের অগ্রিম ভাড়া ৫,০০০ টাকা ব্যাংক ট্রান্সফারে দিলাম",
      amount: 5000,
      category: "দোকান ভাড়া",
      item: "মাসিক ভাড়া",
      method: "Bank" as const,
      type: "outflow" as const,
    },
    {
      label: "কাস্টমার বকেয়া জমা",
      text: "তানজিলা আপা পূর্বের বকেয়া ১,২০০ টাকা বিকাশে পরিশোধ করলেন",
      amount: 1200,
      category: "বকেয়া আদায়",
      item: "বকেয়া পরিশোধ",
      method: "bKash" as const,
      type: "inflow" as const,
    },
  ];

  const handleStartRecording = (customPrompt?: (typeof promptOptions)[0]) => {
    setIsRecording(true);
    setStage("listening");
    const targetText = customPrompt ? customPrompt.text : "আজ ৫০০ টাকার পণ্য বিক্রি করেছি";
    setSpokenText(targetText);

    setTimeout(() => {
      setStage("analyzing");
    }, 1500);

    setTimeout(() => {
      setIsRecording(false);
      setStage("complete");
      if (customPrompt) {
        setParsedData({
          amount: customPrompt.amount,
          category: customPrompt.category,
          item: customPrompt.item,
          method: customPrompt.method,
          type: customPrompt.type,
          voucherNo: `AP-${Math.floor(100 + Math.random() * 900)}`,
          time: "এইমাত্র",
          balance: todaySales - todayExpenses + (customPrompt.type === "inflow" ? customPrompt.amount : -customPrompt.amount),
        });
      }
    }, 3000);
  };

  const handleConfirmToLedger = () => {
    addTransaction({
      title: `${parsedData.category} (${parsedData.item})`,
      category: parsedData.category,
      amount: parsedData.amount,
      type: parsedData.type,
      method: parsedData.method,
      time: "১০:৪৫ পূর্বাহ্ন",
      voucherNo: parsedData.voucherNo,
      isAiParsed: true,
      dialect: dialect === "std" ? "প্রমিত বাংলা" : dialect === "ctg" ? "চাটগাঁইয়া" : "সিলেটি",
      note: "ভয়েস থেকে স্বয়ংক্রিয় এন্ট্রি",
    });
  };

  const handlePlayTTS = () => {
    setIsPlayingAudio(true);
    showToast("🔊 অডিও বাজছে: 'হিসাবটি নিখুঁতভাবে বিশ্লেষণ করা হয়েছে। নগদ ৫০০ টাকার শাড়ি বিক্রি রেকর্ড প্রস্তুত।'");
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 3500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-gutter sm:px-gutter-md lg:px-gutter-lg py-space-md">
      {/* Top Context & Live Status Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-lg">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[28px]">graphic_eq</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <h1 className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                ভয়েস খাতা • Voice Bookkeeper
              </h1>
              <span className="px-space-xs py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                Active AI Engine
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              দৈনিক বেচাকেনা ও খরচের হিসাব মুখে বলুন, স্বয়ংক্রিয়ভাবে খতিয়ানে জমা হবে
            </span>
          </div>
        </div>

        {/* Quick Tally & Dialect Selector */}
        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="flex items-center gap-space-xs bg-surface shadow-sm rounded-full px-space-md py-space-xs border border-surface-border">
            <span className="material-symbols-outlined text-primary text-[20px]">record_voice_over</span>
            <span className="font-label-md text-label-md text-deep-navy font-medium">
              আজকের রেকর্ড: <span className="text-primary font-bold">{transactions.length}টি</span> সম্পন্ন
            </span>
          </div>

          <div className="flex items-center bg-surface-container rounded-full p-1 gap-1 border border-surface-border/60">
            <button
              onClick={() => setDialect("std")}
              className={`px-space-sm py-space-xs rounded-full font-label-sm text-label-sm transition-all ${
                dialect === "std"
                  ? "bg-surface text-deep-navy font-bold shadow-sm"
                  : "text-on-surface-variant hover:text-deep-navy"
              }`}
            >
              প্রমিত বাংলা
            </button>
            <button
              onClick={() => setDialect("ctg")}
              className={`px-space-sm py-space-xs rounded-full font-label-sm text-label-sm transition-all ${
                dialect === "ctg"
                  ? "bg-surface text-deep-navy font-bold shadow-sm"
                  : "text-on-surface-variant hover:text-deep-navy"
              }`}
            >
              চাটগাঁইয়া
            </button>
            <button
              onClick={() => setDialect("syl")}
              className={`px-space-sm py-space-xs rounded-full font-label-sm text-label-sm transition-all ${
                dialect === "syl"
                  ? "bg-surface text-deep-navy font-bold shadow-sm"
                  : "text-on-surface-variant hover:text-deep-navy"
              }`}
            >
              সিলেটি
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left & Center: Conversational Interaction Deck (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-space-lg">
          {/* Interactive Conversational Stage */}
          <div className="bg-surface rounded-2xl p-space-md sm:p-space-lg shadow-sm border border-surface-border flex flex-col gap-space-lg relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-vibrant-teal/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Merchant / User Message Bubble */}
            <div className="flex flex-col items-end gap-space-xs max-w-xl self-end w-full">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  ১০:৪৩ পূর্বাহ্ন • কণ্ঠস্বর রেকর্ড সম্পন্ন
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-growth-green"></span>
              </div>
              <div className="w-full bg-deep-navy text-on-primary p-space-md rounded-2xl rounded-tr-none shadow-md flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-title-md text-title-md tracking-wide font-bold">
                    “{spokenText}”
                  </span>
                  <span className="px-space-xs py-0.5 rounded-full bg-surface/20 text-inverse-on-surface font-label-sm text-label-sm">
                    বাংলা NLP ৯৯.২%
                  </span>
                </div>

                {/* Dynamic Waveform Indicator */}
                <div className="flex items-center gap-1.5 pt-space-xs">
                  <button
                    onClick={handlePlayTTS}
                    className="w-8 h-8 rounded-full bg-surface/15 hover:bg-surface/25 flex items-center justify-center transition-colors text-white"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isPlayingAudio ? "pause" : "play_arrow"}
                    </span>
                  </button>
                  <div className="flex-1 flex items-end gap-1 h-6 px-space-xs">
                    <span className="w-1 bg-vibrant-teal rounded-full h-3 animate-pulse"></span>
                    <span className="w-1 bg-vibrant-teal rounded-full h-5"></span>
                    <span className="w-1 bg-vibrant-teal rounded-full h-2"></span>
                    <span className="w-1 bg-vibrant-teal rounded-full h-6 animate-pulse"></span>
                    <span className="w-1 bg-vibrant-teal rounded-full h-4"></span>
                    <span className="w-1 bg-vibrant-teal rounded-full h-5"></span>
                    <span className="w-1 bg-vibrant-teal rounded-full h-2"></span>
                    <span className="w-1 bg-vibrant-teal rounded-full h-4"></span>
                    <span className="w-1 bg-vibrant-teal rounded-full h-6 animate-pulse"></span>
                    <span className="w-1 bg-vibrant-teal rounded-full h-3"></span>
                    <span className="w-1 bg-vibrant-teal rounded-full h-5"></span>
                    <span className="w-1 bg-vibrant-teal rounded-full h-2"></span>
                    <span className="w-1 bg-vibrant-teal rounded-full h-4"></span>
                  </div>
                  <span className="font-body-sm text-body-sm text-inverse-on-surface opacity-80">
                    ০:০৩ সেকেন্ড
                  </span>
                </div>
              </div>
            </div>

            {/* AI Companion Response Bubble */}
            <div className="flex items-start gap-space-sm max-w-2xl self-start w-full">
              <div className="relative shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-vibrant-teal flex items-center justify-center text-on-primary shadow-[0_0_16px_rgba(0,166,166,0.3)]">
                  <span className="material-symbols-outlined text-[22px]">smart_toy</span>
                </div>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-growth-green border-2 border-surface"></span>
              </div>
              <div className="flex flex-col gap-space-sm flex-1">
                <div className="bg-surface-container-low p-space-md rounded-2xl rounded-tl-none shadow-sm flex flex-col gap-space-xs border border-surface-border/40">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-deep-navy font-bold">
                      ArthoPilot AI • অর্থপাইলট সহকারী
                    </span>
                    <button
                      onClick={handlePlayTTS}
                      className="flex items-center gap-space-xs text-primary hover:text-on-primary-container font-label-sm text-label-sm font-semibold transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">volume_up</span>
                      <span>🔊 শুনুন (Play Bangla)</span>
                    </button>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface">
                    হিসাবটি নিখুঁতভাবে বিশ্লেষণ করা হয়েছে। {parsedData.category} বাবদ ৳{parsedData.amount} এর ডিজিটাল ভাউচার প্রস্তুত। কোনো জালিয়াতির ঝুঁকি পাওয়া যায়নি!
                  </p>
                </div>

                {/* AI Generated Instant Structured Transaction Card */}
                <div className="bg-surface p-space-md sm:p-space-lg rounded-2xl shadow-md border border-vibrant-teal/30 transition-all">
                  <div className="flex items-center justify-between pb-space-sm border-b border-surface-border">
                    <div className="flex items-center gap-space-xs">
                      <span
                        className={`px-space-sm py-0.5 rounded-full font-label-md text-label-md flex items-center gap-1 font-bold ${
                          parsedData.type === "inflow"
                            ? "bg-surface-container text-growth-green"
                            : "bg-error-container text-danger-rose"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {parsedData.type === "inflow" ? "arrow_downward" : "arrow_upward"}
                        </span>
                        {parsedData.category}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        ভাউচার নং #{parsedData.voucherNo}
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      {parsedData.time}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md py-space-md bg-surface-container-low rounded-xl px-space-md my-space-xs">
                    <div className="flex flex-col">
                      <span className="font-body-sm text-body-sm text-on-surface-variant">টাকার পরিমাণ</span>
                      <span className="font-headline-md text-headline-md text-growth-green font-extrabold">
                        ৳ {parsedData.amount.toLocaleString()}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">পরিশোধিত</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-body-sm text-body-sm text-on-surface-variant">খাত (Category)</span>
                      <span className="font-label-lg text-label-lg text-deep-navy font-bold mt-1">
                        {parsedData.category}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">{parsedData.item}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-body-sm text-body-sm text-on-surface-variant">পরিশোধের মাধ্যম</span>
                      <span className="font-label-lg text-label-lg text-deep-navy font-bold mt-1">
                        {parsedData.method}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">ভেরিফাইড</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-body-sm text-body-sm text-on-surface-variant">হালনাগাদ লাভ</span>
                      <span className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                        ৳ {(todaySales - todayExpenses).toLocaleString()}
                      </span>
                      <span className="font-body-sm text-body-sm text-growth-green">লেজারে সিঙ্কড</span>
                    </div>
                  </div>

                  {/* Action Controls */}
                  <div className="flex flex-col sm:flex-row items-center justify-end gap-space-sm pt-space-md">
                    <button
                      onClick={() => handleStartRecording()}
                      className="w-full sm:w-auto px-space-md py-space-sm bg-surface-container hover:bg-surface-container-high text-deep-navy rounded-xl font-label-md text-label-md transition-all flex items-center justify-center gap-space-xs border border-surface-border/60"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">replay</span>
                      <span>পুনরায় বলুন (Re-record)</span>
                    </button>
                    <button
                      onClick={handleConfirmToLedger}
                      className="w-full sm:w-auto px-space-lg py-space-sm bg-vibrant-teal hover:bg-primary text-on-primary rounded-xl font-label-lg text-label-lg font-bold shadow-md transition-all flex items-center justify-center gap-space-xs active:scale-95"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">check_circle</span>
                      <span>লেজারে সেভ করুন (Confirm &amp; Post)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Voice Interaction Control Dock */}
          <div className="bg-surface rounded-2xl p-space-lg shadow-sm border border-surface-border flex flex-col items-center justify-center relative overflow-hidden text-center">
            <div className="flex items-center gap-space-xs mb-space-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-vibrant-teal animate-ping"></span>
              <span className="font-title-md text-title-md text-deep-navy font-bold">
                {isRecording ? "🎙️ শুনছি... বলুন আপনার সারাদিনের হিসাব" : "🎙️ বোতাম চেপে মুখে হিসাব বলুন"}
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant mb-space-md max-w-md">
              স্পষ্ট করে বলুন: কত টাকা পেলেন বা খরচ করলেন, পণ্যের নাম এবং কাস্টমারের বিবরণ।
            </span>

            {/* Interactive Huge Voice Button */}
            <div className="relative my-space-sm flex items-center justify-center">
              {isRecording && (
                <>
                  <div className="absolute w-28 h-28 rounded-full bg-vibrant-teal/20 animate-ping"></div>
                  <div className="absolute w-36 h-36 rounded-full bg-primary/10 animate-pulse"></div>
                </>
              )}
              <button
                onClick={() => handleStartRecording()}
                className={`relative z-10 w-24 h-24 rounded-full text-on-primary flex flex-col items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all ${
                  isRecording
                    ? "bg-gradient-to-tr from-danger-rose to-warning-amber animate-pulse shadow-[0_0_30px_rgba(225,29,72,0.5)]"
                    : "bg-gradient-to-tr from-deep-navy via-primary to-vibrant-teal shadow-[0_4px_24px_rgba(0,166,166,0.35)]"
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[40px]">
                  {isRecording ? "settings_voice" : "mic"}
                </span>
                <span className="font-label-sm text-label-sm tracking-wide mt-0.5">
                  {isRecording ? "শুনছি..." : "ট্যাপ করুন"}
                </span>
              </button>
            </div>

            {/* Quick Audio Prompt Pills for Rapid Bookkeeping */}
            <div className="w-full pt-space-md">
              <span className="font-label-sm text-label-sm text-on-surface-variant block mb-space-xs uppercase tracking-wider font-semibold">
                দ্রুত ভয়েস কিউ (Quick Audio Prompts - ক্লিক করে টেস্ট করুন):
              </span>
              <div className="flex flex-wrap items-center justify-center gap-space-xs">
                {promptOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleStartRecording(opt)}
                    className="px-space-md py-space-xs bg-surface-container hover:bg-surface-container-high rounded-full font-label-sm text-label-sm text-deep-navy transition-all flex items-center gap-1 border border-surface-border shadow-xs hover:scale-105"
                  >
                    <span className="material-symbols-outlined text-[16px] text-vibrant-teal">mic</span>
                    <span>"{opt.label}"</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Updated Daybook Stream (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-space-md">
          {/* Live Daybook Container */}
          <div className="bg-surface rounded-2xl p-space-md shadow-sm border border-surface-border flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[22px]">menu_book</span>
                <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold">আজকের খাতা</h3>
              </div>
              <span className="px-space-xs py-0.5 rounded-full bg-growth-green/10 text-growth-green font-label-sm text-label-sm font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-growth-green animate-pulse"></span>
                Live Balance
              </span>
            </div>

            {/* Merchant Snapshot Mini Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-sm h-32 bg-deep-navy">
              <img
                className="w-full h-full object-cover opacity-30"
                alt="Boutique Shop"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnvQcRm3tzEh6S9PKEWsWXCobH7fsvRMdUTs455yyJ2oWDWdGRH93ZJGGYXSLPADc5xBaVH_ieluRGzo4Xp8EnlVKoxMJeGkiW1bUpMcDvVjBrDMQFI-eAwjtI_qfeQyk3o6a6hxr6TdG7NqmJ1kxAwJzkjxP3hdBBmHy5wrHsj_9o3dP3q76tOLko6ST4-aQccpnB1-Xksfabdndt_nflhDq1b11S59gry3a4jBqcaJVJ-0KL551Z"
              />
              <div className="absolute inset-0 p-space-md flex flex-col justify-between text-on-primary">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-vibrant-teal font-semibold">
                    নুসরাত শাড়ি অ্যান্ড বুটিক
                  </span>
                  <span className="font-body-sm text-body-sm text-inverse-on-surface">২৮ অক্টোবর, ২০২৫</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-body-sm text-body-sm block opacity-80">দিনের মোট বিক্রি</span>
                    <span className="font-headline-md text-headline-md text-on-primary font-bold">
                      ৳ {todaySales.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-body-sm text-body-sm block opacity-80">মোট খরচ</span>
                    <span className="font-title-md text-title-md text-danger-rose font-bold">
                      ৳ {todayExpenses.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Flow Stream */}
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-space-xs">
                <span>সাম্প্রতিক ভয়েস রেকর্ড</span>
                <span>ব্যালেন্স স্বয়ংক্রিয় সমন্বিত</span>
              </div>

              {transactions.slice(0, 5).map((tx) => (
                <div
                  key={tx.id}
                  className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between border border-surface-border/40"
                >
                  <div className="flex items-center gap-space-sm min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        tx.type === "inflow"
                          ? "bg-growth-green/15 text-growth-green"
                          : "bg-danger-rose/15 text-danger-rose"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {tx.type === "inflow" ? "add_shopping_cart" : "local_shipping"}
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-md text-label-md text-deep-navy font-bold truncate">
                        {tx.title}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {tx.time} • {tx.method}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`font-label-lg text-label-lg font-bold block ${
                        tx.type === "inflow" ? "text-growth-green" : "text-danger-rose"
                      }`}
                    >
                      {tx.type === "inflow" ? "+" : "-"}৳ {tx.amount.toLocaleString()}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant block">
                      #{tx.voucherNo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
