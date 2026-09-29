"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";

const SAMPLE_PROMPTS = [
  {
    text: "আজ ১২,৫০০ টাকা বিক্রি হয়েছে, সুতা বাবদ খরচ ৩,২০০ টাকা।",
    amount: 12500,
    expense: 3200,
    title: "দৈনিক বিক্রয় ও সুতা ক্রয়",
    category: "পণ্য বিক্রি",
    method: "bKash" as const,
    type: "inflow" as const,
    note: "স্বয়ংক্রিয় ডাবল-এন্ট্রি হিসাব প্রস্তুত",
  },
  {
    text: "৫০০ টাকার সুতি শাড়ি বিক্রি করেছি ক্যাশে।",
    amount: 500,
    title: "জামদানি শাড়ি নগদ বিক্রি",
    category: "পণ্য বিক্রি",
    method: "Cash" as const,
    type: "inflow" as const,
    note: "ক্যাশ ড্রয়ারে জমা",
  },
  {
    text: "ইসলামপুর থেকে ৩,৪০০ টাকার কাপড় ও সুতা কিনলাম ক্যাশে।",
    amount: 3400,
    title: "কাপড় ও সুতা ক্রয় (ইসলামপুর)",
    category: "কাঁচামাল খরচ",
    method: "Cash" as const,
    type: "outflow" as const,
    note: "কাঁচামাল ইনভেন্টরি স্টক যোগ",
  },
  {
    text: "বিকাশে ১,৫০০ টাকা পেয়েছি মিরপুরের গ্রাহকের কাছ থেকে।",
    amount: 1500,
    title: "মিরপুর বুটিক অর্ডার (বিকাশ)",
    category: "পণ্য বিক্রি",
    method: "bKash" as const,
    type: "inflow" as const,
    note: "বিকাশ ওয়ালেট সিঙ্কড",
  },
];

export default function VoiceModal() {
  const { isVoiceModalOpen, closeVoiceModal, addTransaction, language } = useApp();
  const [stage, setStage] = useState<"idle" | "recording" | "transcribing" | "parsed">("idle");
  const [selectedPrompt, setSelectedPrompt] = useState(SAMPLE_PROMPTS[0]);
  const [dialect, setDialect] = useState<"std" | "ctg" | "syl">("std");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    if (isVoiceModalOpen) {
      setStage("recording");
      const timer1 = setTimeout(() => {
        setStage("transcribing");
      }, 1500);

      const timer2 = setTimeout(() => {
        setStage("parsed");
      }, 2800);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setStage("idle");
      setIsPlayingAudio(false);
    }
  }, [isVoiceModalOpen, selectedPrompt]);

  if (!isVoiceModalOpen) return null;

  const handleConfirm = () => {
    addTransaction({
      title: selectedPrompt.title,
      category: selectedPrompt.category,
      amount: selectedPrompt.amount,
      type: selectedPrompt.type,
      method: selectedPrompt.method,
      time: "এখনই (ভয়েস ইনপুট)",
      voucherNo: `AP-${Math.floor(1000 + Math.random() * 9000)}`,
      isAiParsed: true,
      dialect: dialect === "std" ? "প্রমিত বাংলা" : dialect === "ctg" ? "চাটগাঁইয়া" : "সিলেটি",
      note: selectedPrompt.note,
    });
    closeVoiceModal();
  };

  const handleSimulateNew = (prompt: typeof SAMPLE_PROMPTS[0]) => {
    setSelectedPrompt(prompt);
    setStage("recording");
    setTimeout(() => setStage("transcribing"), 1200);
    setTimeout(() => setStage("parsed"), 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-navy/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-surface rounded-2xl shadow-2xl overflow-hidden border border-surface-border">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-space-lg py-space-md bg-surface-container-low border-b border-surface-border">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[24px]">graphic_eq</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                {language === "bn" ? "ভয়েস খাতা • Voice Bookkeeper" : "Bangla Voice Bookkeeper"}
              </h3>
              <p className="text-xs text-on-surface-variant">
                {language === "bn" ? "মুখে স্বাভাবিক ভাষায় বলুন, এআই খতিয়ান তৈরি করবে" : "Speak naturally in Bangla to auto-log transactions"}
              </p>
            </div>
          </div>
          <button
            onClick={closeVoiceModal}
            className="w-8 h-8 rounded-full bg-surface hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Dialect selector */}
        <div className="px-space-lg py-space-xs bg-surface flex items-center justify-between border-b border-surface-border/60">
          <span className="text-xs font-semibold text-deep-navy flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-vibrant-teal">translate</span>
            আঞ্চলিক ভাষা:
          </span>
          <div className="flex items-center gap-1 bg-surface-container p-1 rounded-full text-xs">
            <button
              onClick={() => setDialect("std")}
              className={`px-3 py-1 rounded-full transition-all ${
                dialect === "std" ? "bg-surface font-bold text-deep-navy shadow-xs" : "text-on-surface-variant"
              }`}
            >
              প্রমিত বাংলা
            </button>
            <button
              onClick={() => setDialect("ctg")}
              className={`px-3 py-1 rounded-full transition-all ${
                dialect === "ctg" ? "bg-surface font-bold text-deep-navy shadow-xs" : "text-on-surface-variant"
              }`}
            >
              চাটগাঁইয়া
            </button>
            <button
              onClick={() => setDialect("syl")}
              className={`px-3 py-1 rounded-full transition-all ${
                dialect === "syl" ? "bg-surface font-bold text-deep-navy shadow-xs" : "text-on-surface-variant"
              }`}
            >
              সিলেটি
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-space-lg flex flex-col gap-space-md">
          {/* Animated Mic & Orb Stage */}
          <div className="flex flex-col items-center justify-center py-space-sm bg-gradient-to-b from-surface-container-low to-surface rounded-xl p-space-md border border-surface-border/50">
            <div className="relative flex items-center justify-center mb-space-sm">
              {stage === "recording" && (
                <>
                  <div className="absolute w-24 h-24 rounded-full bg-vibrant-teal/20 animate-ping"></div>
                  <div className="absolute w-20 h-20 rounded-full bg-vibrant-teal/30 animate-pulse-ring"></div>
                </>
              )}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 ${
                  stage === "recording"
                    ? "bg-gradient-to-tr from-vibrant-teal to-primary text-white scale-110 shadow-[0_0_24px_rgba(0,166,166,0.5)]"
                    : stage === "transcribing"
                    ? "bg-deep-navy text-primary-fixed animate-spin"
                    : "bg-vibrant-teal text-white"
                }`}
              >
                <span className="material-symbols-outlined text-[32px]">
                  {stage === "transcribing" ? "sync" : "mic"}
                </span>
              </div>
            </div>

            {/* Dynamic Status Text */}
            <div className="text-center">
              {stage === "recording" && (
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-danger-rose animate-ping"></span>
                  <span className="font-label-md text-label-md text-deep-navy font-bold">
                    শুনছি... কথা বলুন (Listening Bangla Audio)
                  </span>
                </div>
              )}
              {stage === "transcribing" && (
                <div className="flex items-center justify-center gap-2">
                  <span className="font-label-md text-label-md text-primary font-bold">
                    এআই বিশ্লেষণ চলছে (Bangla NLP 99.2% Accuracy)...
                  </span>
                </div>
              )}
              {stage === "parsed" && (
                <div className="flex items-center justify-center gap-2 text-growth-green">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span className="font-label-md text-label-md font-bold">
                    হিসাব স্বয়ংক্রিয়ভাবে প্রস্তুত • ০.৩ সেকেন্ড
                  </span>
                </div>
              )}
            </div>

            {/* Dynamic Audio Waveform */}
            <div className="flex items-end justify-center gap-1.5 h-10 mt-3 px-4">
              <span className={`w-1.5 rounded-full bg-vibrant-teal ${stage === "recording" ? "wave-bar-1" : "h-2"}`}></span>
              <span className={`w-1.5 rounded-full bg-vibrant-teal ${stage === "recording" ? "wave-bar-2" : "h-4"}`}></span>
              <span className={`w-1.5 rounded-full bg-vibrant-teal ${stage === "recording" ? "wave-bar-3" : "h-6"}`}></span>
              <span className={`w-1.5 rounded-full bg-vibrant-teal ${stage === "recording" ? "wave-bar-4" : "h-3"}`}></span>
              <span className={`w-1.5 rounded-full bg-vibrant-teal ${stage === "recording" ? "wave-bar-5" : "h-8"}`}></span>
              <span className={`w-1.5 rounded-full bg-vibrant-teal ${stage === "recording" ? "wave-bar-2" : "h-5"}`}></span>
              <span className={`w-1.5 rounded-full bg-vibrant-teal ${stage === "recording" ? "wave-bar-4" : "h-3"}`}></span>
              <span className={`w-1.5 rounded-full bg-vibrant-teal ${stage === "recording" ? "wave-bar-1" : "h-6"}`}></span>
              <span className={`w-1.5 rounded-full bg-vibrant-teal ${stage === "recording" ? "wave-bar-3" : "h-2"}`}></span>
            </div>
          </div>

          {/* User Spoken Prompt Bubble */}
          <div className="p-space-md rounded-xl bg-deep-navy text-on-primary shadow-sm flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs text-secondary-fixed">
              <span>নথিভুক্ত অডিও ট্র্যান্সক্রিপশন:</span>
              <span className="text-tertiary-fixed font-semibold">ভয়েস কনফিডেন্স ৯৯.২%</span>
            </div>
            <p className="font-title-md text-title-md font-bold text-white tracking-wide">
              “{selectedPrompt.text}”
            </p>
          </div>

          {/* AI Parsed Voucher Card */}
          {stage === "parsed" && (
            <div className="bg-surface-container-low p-space-md rounded-xl border border-vibrant-teal/30 shadow-sm flex flex-col gap-space-sm animate-fadeIn">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-border">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-vibrant-teal text-[18px]">auto_awesome</span>
                  <span className="font-label-md text-label-md text-deep-navy font-bold">
                    স্বয়ংক্রিয় ভাউচার (#AP-{Math.floor(1000 + Math.random() * 9000)})
                  </span>
                </div>
                <span className="px-space-xs py-0.5 rounded-full bg-growth-green/20 text-tertiary font-label-sm text-label-sm font-bold">
                  {selectedPrompt.type === "inflow" ? "আয় (Credit)" : "ব্যয় (Debit)"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-space-sm">
                <div>
                  <span className="text-xs text-on-surface-variant block">টাকার পরিমাণ</span>
                  <span className="font-headline-sm text-headline-sm text-growth-green font-extrabold">
                    ৳{selectedPrompt.amount.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-on-surface-variant block">বিবরণ / খাত</span>
                  <span className="font-label-md text-label-md text-deep-navy font-bold block truncate">
                    {selectedPrompt.category}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-on-surface-variant block">পেমেন্ট মাধ্যম</span>
                  <span className="font-label-md text-label-md text-primary font-bold">
                    {selectedPrompt.method}
                  </span>
                </div>
              </div>

              {/* TTS Audio Preview */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isPlayingAudio ? "pause_circle" : "volume_up"}
                  </span>
                  <span>{isPlayingAudio ? "অডিও বাজছে..." : "বাংলায় ভয়েস কনফার্মেশন শুনুন"}</span>
                </button>
                <span className="text-[11px] text-on-surface-variant">ডাবল-এন্ট্রি লেজার সিঙ্ক রেডি</span>
              </div>
            </div>
          )}

          {/* Quick Preset Voice Samples */}
          <div>
            <span className="text-xs font-semibold text-deep-navy block mb-1.5">
              অন্য বাক্য পরীক্ষা করুন (Click to simulate other speech):
            </span>
            <div className="grid grid-cols-2 gap-2">
              {SAMPLE_PROMPTS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSimulateNew(p)}
                  className={`text-left p-2 rounded-lg text-xs transition-all border ${
                    selectedPrompt.text === p.text
                      ? "bg-surface-container border-primary font-bold text-deep-navy"
                      : "bg-surface border-surface-border hover:bg-surface-container-low text-on-surface-variant"
                  }`}
                >
                  <span className="line-clamp-1">🎙️ {p.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-end gap-space-sm px-space-lg py-space-md bg-surface-container-low border-t border-surface-border">
          <button
            onClick={closeVoiceModal}
            className="px-space-md py-space-sm rounded-xl bg-surface border border-surface-border text-deep-navy font-label-md text-label-md hover:bg-surface-container"
          >
            বাতিল করুন
          </button>
          <button
            onClick={handleConfirm}
            disabled={stage !== "parsed"}
            className={`px-space-lg py-space-sm rounded-xl font-label-md text-label-md font-bold flex items-center gap-space-xs shadow-md transition-all ${
              stage === "parsed"
                ? "bg-vibrant-teal text-white hover:bg-primary active:scale-95"
                : "bg-surface-border text-on-surface-variant cursor-not-allowed opacity-60"
            }`}
          >
            <span>খতিয়ানে জমা দিন (Save to Ledger)</span>
            <span className="material-symbols-outlined text-[18px]">check</span>
          </button>
        </div>
      </div>
    </div>
  );
}
