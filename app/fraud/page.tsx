"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function FraudGuardPage() {
  const { fraudIncident, freezeIncident, reportIncident, showToast, language } = useApp();
  const [activeScenario, setActiveScenario] = useState<"phishing" | "safe">("phishing");
  const [isFrozen, setIsFrozen] = useState(fraudIncident.status === "frozen");
  const [isReported, setIsReported] = useState(fraudIncident.status === "reported");

  const handleFreeze = () => {
    setIsFrozen(true);
    freezeIncident();
  };

  const handleReport = () => {
    setIsReported(true);
    reportIncident();
  };

  const riskScore = activeScenario === "phishing" ? (isFrozen ? 0 : 94) : 2;

  return (
    <div className="w-full max-w-7xl mx-auto px-space-md lg:px-gutter-lg pb-space-xl">
      {/* Top Action Breadcrumb & Active Shield Bar */}
      <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-md mb-space-md">
        <div className="flex items-center gap-space-xs text-on-surface-variant">
          <span className="material-symbols-outlined text-[20px] text-vibrant-teal">shield</span>
          <span className="font-label-sm text-label-sm tracking-wide uppercase text-vibrant-teal font-bold">
            Pahara Engine v3.4
          </span>
          <span className="text-outline-variant">•</span>
          <span className="font-label-sm text-label-sm">নিরাপত্তা প্রহরী (Real-time Guard)</span>
        </div>

        <div className="flex items-center gap-space-sm">
          {/* Scenario Switcher for Competition Demo */}
          <div className="flex items-center bg-surface-container rounded-full p-1 border border-surface-border text-xs">
            <button
              onClick={() => setActiveScenario("phishing")}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                activeScenario === "phishing"
                  ? "bg-danger-rose text-white shadow-xs"
                  : "text-on-surface-variant hover:text-deep-navy"
              }`}
            >
              🚨 ফিশিং অ্যাটাক ডেমো
            </button>
            <button
              onClick={() => setActiveScenario("safe")}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                activeScenario === "safe"
                  ? "bg-growth-green text-white shadow-xs"
                  : "text-on-surface-variant hover:text-deep-navy"
              }`}
            >
              ✓ নিরাপদ লেনদেন
            </button>
          </div>

          <span className="inline-flex items-center gap-1.5 px-space-sm py-space-xs rounded-full bg-surface-container text-deep-navy font-label-sm text-label-sm shadow-sm border border-surface-border/50">
            <span
              className={`w-2 h-2 rounded-full ${
                activeScenario === "phishing" && !isFrozen
                  ? "bg-danger-rose animate-ping"
                  : "bg-growth-green"
              }`}
            ></span>
            লাইভ স্ক্রিনিং সক্রিয় (Active Shield)
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant hidden sm:inline">
            Session: #SES-88219
          </span>
        </div>
      </div>

      {/* Urgent Incident Alert Banner */}
      <div
        className={`relative overflow-hidden rounded-2xl p-space-md lg:p-space-lg shadow-md mb-space-lg border transition-all duration-300 ${
          isFrozen
            ? "bg-surface-container border-growth-green/50"
            : activeScenario === "phishing"
            ? "bg-error-container/40 border-danger-rose/30 animate-pulse-subtle"
            : "bg-surface-container-low border-growth-green/40"
        }`}
      >
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex items-start gap-space-md">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg text-white ${
                isFrozen
                  ? "bg-growth-green"
                  : activeScenario === "phishing"
                  ? "bg-danger-rose"
                  : "bg-primary"
              }`}
            >
              <span
                className="material-symbols-outlined text-[32px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isFrozen ? "verified_user" : activeScenario === "phishing" ? "warning" : "check_circle"}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-space-xs mb-1">
                <span
                  className={`font-label-sm text-label-sm uppercase tracking-wider font-bold px-space-xs py-0.5 rounded-full shadow-xs ${
                    isFrozen
                      ? "bg-growth-green/20 text-tertiary"
                      : activeScenario === "phishing"
                      ? "bg-surface text-danger-rose"
                      : "bg-growth-green text-white"
                  }`}
                >
                  {isFrozen
                    ? "🛡️ ডেলিভারি সফলভাবে স্থগিত"
                    : activeScenario === "phishing"
                    ? "তাত্ক্ষণিক সতর্কতা • Critical Alert"
                    : "সবকিছু নিরাপদ • Verified Safe"}
                </span>
                <span className="text-on-surface-variant font-body-sm text-body-sm">
                  • ট্র্যাকিং আইডি: #SEC-98421
                </span>
                <span className="text-on-surface-variant font-body-sm text-body-sm">
                  • ২ মিনিট আগে চিহ্নিত
                </span>
              </div>

              <h1 className="font-headline-sm text-headline-sm text-deep-navy font-bold leading-snug">
                {isFrozen
                  ? "পার্সেল হোল্ড করা হয়েছে — আপনার ৩,৫০০ টাকা নিরাপদ!"
                  : activeScenario === "phishing"
                  ? "⚠️ সন্দেহজনক লেনদেন শনাক্ত হয়েছে (Suspicious Activity Flagged)"
                  : "✓ আসল বিকাশ পেমেন্ট নিশ্চিত — কোনো অসঙ্গতি নেই"}
              </h1>

              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                {isFrozen
                  ? "সতর্কতামূলক ব্যবস্থা নেওয়া হয়েছে। বিকাশ কাস্টমার কেয়ার ও সাইবার হেল্পলাইনে কেস নথিভুক্ত।"
                  : activeScenario === "phishing"
                  ? "শাড়ির অর্ডারের জন্য আসা এসএমএসটি ভুয়া হওয়ার প্রবল প্রমাণ পাওয়া গেছে। ডেলিভারি আটকে রাখুন।"
                  : "অফিশিয়াল bKash API সার্ভারের সাথে TrxID ও ব্যালেন্স নিখুঁতভাবে মিলে গেছে।"}
              </p>
            </div>
          </div>

          {/* Risk Gauge */}
          <div className="flex items-center gap-space-md bg-surface px-space-md py-space-sm rounded-2xl shadow-sm shrink-0 self-start lg:self-center border border-surface-border">
            <div className="flex flex-col text-right">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                ঝুঁকির মাত্রা (Risk)
              </span>
              <span
                className={`font-headline-sm text-headline-sm font-extrabold ${
                  isFrozen
                    ? "text-growth-green"
                    : activeScenario === "phishing"
                    ? "text-danger-rose"
                    : "text-growth-green"
                }`}
              >
                {isFrozen ? "০% • সুরক্ষিত" : activeScenario === "phishing" ? "৯৪% • অতি উচ্চ" : "২% • নিরাপদ"}
              </span>
            </div>

            <div className="relative w-14 h-14 shrink-0">
              <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-surface-container"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                ></path>
                <path
                  className={
                    isFrozen
                      ? "text-growth-green"
                      : activeScenario === "phishing"
                      ? "text-danger-rose"
                      : "text-growth-green"
                  }
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray={`${riskScore}, 100`}
                  strokeLinecap="round"
                  strokeWidth="3.5"
                ></path>
              </svg>
              <span
                className={`absolute inset-0 flex items-center justify-center font-label-sm text-label-sm font-bold ${
                  isFrozen
                    ? "text-growth-green"
                    : activeScenario === "phishing"
                    ? "text-danger-rose"
                    : "text-growth-green"
                }`}
              >
                {riskScore}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Inspection Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-lg">
        {/* Left Column: Intercepted Payment SMS & Visual Forensics */}
        <div className="lg:col-span-5 flex flex-col gap-space-md">
          <div className="bg-surface rounded-2xl p-space-md lg:p-space-lg shadow-sm border border-surface-border flex flex-col h-full">
            <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-surface-border">
              <div className="flex items-center gap-space-xs">
                <span
                  className={`material-symbols-outlined text-[22px] ${
                    activeScenario === "phishing" ? "text-danger-rose" : "text-growth-green"
                  }`}
                >
                  {activeScenario === "phishing" ? "sms_failed" : "verified"}
                </span>
                <span className="font-title-md text-title-md text-deep-navy font-bold">
                  {activeScenario === "phishing"
                    ? "গ্রাহকের পাঠানো এসএমএস স্ক্রিনশট"
                    : "গ্রাহকের পেমেন্ট কনফার্মেশন"}
                </span>
              </div>
              <span
                className={`px-space-xs py-0.5 rounded-full font-label-sm text-label-sm font-bold ${
                  activeScenario === "phishing"
                    ? "bg-error-container text-danger-rose"
                    : "bg-growth-green/20 text-tertiary"
                }`}
              >
                {activeScenario === "phishing" ? "নকল / Spoofed" : "আসল / Verified"}
              </span>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
              নুসরাত জাহান শাড়ি বুটিকের ইনবক্সে আসা প্রমাণপত্রের ফরেনসিক স্ক্যান:
            </p>

            {/* Intercepted Phone Screen Frame */}
            <div className="relative rounded-2xl bg-surface-container-low p-space-md shadow-inner border border-surface-border/60 flex flex-col gap-space-sm overflow-hidden">
              {/* Simulated Sender Header */}
              <div className="flex items-center justify-between bg-surface px-space-sm py-2 rounded-xl shadow-xs border border-surface-border/40">
                <div className="flex items-center gap-space-xs">
                  <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-[14px]">
                    bK
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-md text-label-md font-bold text-deep-navy tracking-tight">
                        {activeScenario === "phishing" ? "bKash-Merchant" : "bKash Official 16247"}
                      </span>
                      {activeScenario === "phishing" && (
                        <span className="px-1.5 py-0.2 rounded bg-danger-rose text-on-primary font-label-sm text-[10px] uppercase font-bold tracking-tight">
                          ভুয়া আইডি
                        </span>
                      )}
                    </div>
                    <span
                      className={`font-body-sm text-[11px] font-semibold ${
                        activeScenario === "phishing" ? "text-danger-rose" : "text-growth-green"
                      }`}
                    >
                      {activeScenario === "phishing"
                        ? "Unknown routing shortcode (অননুমোদিত গেটওয়ে)"
                        : "Verified Gateway Routing"}
                    </span>
                  </div>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">14:28</span>
              </div>

              {/* Fake SMS Content Bubble with Micro Red Callouts */}
              <div className="bg-surface rounded-xl p-space-md shadow-sm border border-surface-border/40 relative space-y-2">
                <div className="text-[13px] leading-relaxed text-on-surface font-mono">
                  You have received Tk 3,500.00 from{" "}
                  <span className="bg-error-container/60 text-danger-rose px-1 rounded font-bold">
                    01712-XXXXXX
                  </span>
                  . Ref: Sarees. TrxID:{" "}
                  <span className="bg-error-container/60 text-danger-rose px-1 rounded font-bold">
                    9X82LA712Q
                  </span>
                  . New Balance Tk 14,200.00. Fee Tk 0.00.
                </div>

                {/* Visual Annotation Callouts directly over message */}
                {activeScenario === "phishing" && (
                  <div className="pt-space-xs space-y-1.5 border-t border-surface-border/60">
                    <div className="flex items-center gap-1.5 text-danger-rose text-body-sm">
                      <span className="material-symbols-outlined text-[16px]">cancel</span>
                      <span className="font-label-sm text-label-sm font-semibold">
                        ফন্ট সাইজ ও স্পেসিং mismatch (অফিশিয়াল ফরম্যাট নয়)
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-danger-rose text-body-sm">
                      <span className="material-symbols-outlined text-[16px]">cancel</span>
                      <span className="font-label-sm text-label-sm font-semibold">
                        কোনো ক্রিপ্টোগ্রাফিক ডিজিটাল ভেরিফিকেশন কোড নেই
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Intercepted Order Context Card */}
              <div className="bg-surface-container rounded-xl p-space-sm flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[20px]">shopping_bag</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm font-bold text-deep-navy">
                      অর্ডার: জামদানি শাড়ি (লাল ও সোনালী)
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">
                      গ্রাহক: মো: সাইদুর রহমান (হোয়াটসঅ্যাপ চ্যাট)
                    </span>
                  </div>
                </div>
                <span className="font-label-md text-label-md font-bold text-danger-rose">৳৩,৫০০</span>
              </div>

              <div className="flex items-center justify-between text-on-surface-variant pt-1 text-[11px]">
                <span>স্ক্যানিং মেথড: OCR + হেডার অ্যানালাইসিস</span>
                <span className="text-growth-green font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-growth-green"></span>
                  ছবি ফরেনসিক লক করা হয়েছে
                </span>
              </div>
            </div>

            {/* Merchant Confidence Quote */}
            <div className="mt-space-md p-space-sm bg-surface-container rounded-xl flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[22px] shrink-0">psychology</span>
              <p className="font-body-sm text-body-sm text-on-surface leading-tight">
                <strong>অর্থপাইলট পরামর্শ:</strong> এই ধরনের নকল স্ক্রিনশট বানিয়ে কুরিয়ার বা রাইডারকে দ্রুত
                মালামাল বুঝিয়ে দেওয়ার প্রতারণা গত সপ্তাহে ১৬টি দোকানে চেষ্টা করা হয়েছে।
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: AI Warning & Deep Diagnostic Breakdown */}
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <div className="bg-surface rounded-2xl p-space-md lg:p-space-lg shadow-sm border border-surface-border flex flex-col justify-between h-full">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-sm mb-space-sm border-b border-surface-border">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                    পাহারা ইঞ্জিন গভীর নিরীক্ষা
                  </span>
                  <h2 className="font-title-md text-title-md text-deep-navy font-bold">
                    AI সতর্কবার্তা ও প্রমাণ বিশ্লেষণের বিবরণ
                  </h2>
                </div>
                <div
                  className={`px-space-md py-1.5 rounded-full text-on-primary font-label-md text-label-md font-bold flex items-center gap-1.5 shadow-sm ${
                    isFrozen
                      ? "bg-growth-green"
                      : activeScenario === "phishing"
                      ? "bg-danger-rose"
                      : "bg-growth-green"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isFrozen ? "shield" : activeScenario === "phishing" ? "gpp_bad" : "verified"}
                  </span>
                  <span>
                    {isFrozen
                      ? "সুরক্ষিত • ফ্রড প্রিভেন্টেড"
                      : activeScenario === "phishing"
                      ? "Possible Fraud • নকল বিকাশ নোটিফিকেশন"
                      : "Authentic Transaction"}
                  </span>
                </div>
              </div>

              <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                আমাদের এআই অ্যালগরিদম ৪টি স্তরে যাচাই করে নিশ্চিত হয়েছে যে এই লেনদেনটি ভুয়া:
              </p>

              {/* 4 Structured Reasons / Diagnostic breakdown */}
              <div className="space-y-space-sm mb-space-lg">
                {/* Reason 1 */}
                <div className="p-space-sm bg-surface-container-low rounded-xl flex items-start gap-space-sm hover:bg-surface-container transition-colors border border-surface-border/40">
                  <div className="w-8 h-8 rounded-lg bg-error-container text-danger-rose flex items-center justify-center shrink-0 font-headline-sm text-[16px] font-bold">
                    ১
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-label-lg text-label-lg text-deep-navy font-bold">
                        ভুয়া প্রেরক নম্বর (Fake Sender Masking)
                      </h3>
                      <span className="font-label-sm text-[10px] px-1.5 py-0.5 rounded bg-error-container text-danger-rose font-bold">
                        অপ্রমাণিত
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                      মেসেজটি অফিশিয়াল টেলকো শর্টকোড <strong>১৬২৪৭</strong> বা অনুমোদিত bKash API গেটওয়ে থেকে
                      আসেনি। এটি ইন্টারনেট স্পুফিং অ্যাপ দিয়ে প্রেরিত।
                    </p>
                  </div>
                </div>

                {/* Reason 2 */}
                <div className="p-space-sm bg-surface-container-low rounded-xl flex items-start gap-space-sm hover:bg-surface-container transition-colors border border-surface-border/40">
                  <div className="w-8 h-8 rounded-lg bg-error-container text-danger-rose flex items-center justify-center shrink-0 font-headline-sm text-[16px] font-bold">
                    ২
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-label-lg text-label-lg text-deep-navy font-bold">
                        সার্ভারে TrxID-এর অস্তিত্ব নেই (Non-existent TrxID)
                      </h3>
                      <span className="font-label-sm text-[10px] px-1.5 py-0.5 rounded bg-error-container text-danger-rose font-bold">
                        শূন্য রেকর্ড
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                      লাইভ bKash মার্চেন্ট এপিআই দিয়ে তাৎক্ষণিক যাচাই করে দেখা গেছে ট্রানজেকশন আইডি{" "}
                      <strong>'9X82LA712Q'</strong> ব্যাংক বা এমএফএস ডাটাবেজে রেকর্ড করা হয়নি।
                    </p>
                  </div>
                </div>

                {/* Reason 3 */}
                <div className="p-space-sm bg-surface-container-low rounded-xl flex items-start gap-space-sm hover:bg-surface-container transition-colors border border-surface-border/40">
                  <div className="w-8 h-8 rounded-lg bg-error-container text-danger-rose flex items-center justify-center shrink-0 font-headline-sm text-[16px] font-bold">
                    ৩
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-label-lg text-label-lg text-deep-navy font-bold">
                        অ্যাকাউন্ট ব্যালেন্সের অসামঞ্জস্য (Balance Inconsistency)
                      </h3>
                      <span className="font-label-sm text-[10px] px-1.5 py-0.5 rounded bg-error-container text-danger-rose font-bold">
                        পার্থক্য: ৳৩,৫০০
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                      আপনার প্রকৃত ওয়ালেট ব্যালেন্স বর্তমানে <strong>৳১০,৭০০</strong>। অথচ ভুয়া এসএমএসটিতে নতুন
                      ব্যালেন্স দাবি করা হয়েছে <strong>৳১৪,২০০</strong>। কোনো নতুন টাকা জমা হয়নি।
                    </p>
                  </div>
                </div>

                {/* Reason 4 */}
                <div className="p-space-sm bg-surface-container-low rounded-xl flex items-start gap-space-sm hover:bg-surface-container transition-colors border border-surface-border/40">
                  <div className="w-8 h-8 rounded-lg bg-error-container text-danger-rose flex items-center justify-center shrink-0 font-headline-sm text-[16px] font-bold">
                    ৪
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="font-label-lg text-label-lg text-deep-navy font-bold">
                        সামাজিক কারসাজির প্যাটার্ন (Social Engineering Pattern)
                      </h3>
                      <span className="font-label-sm text-[10px] px-1.5 py-0.5 rounded bg-warning-amber/20 text-warning-amber font-bold">
                        আচরণগত ঝুঁকি
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                      কাস্টমার ইনবক্সে ডেলিভারি রাইডার পাঠিয়ে পার্সেল দ্রুত হস্তান্তরের জন্য বারবার তাগাদা
                      দিচ্ছে। এটি বাংলাদেশের ক্ষুদ্র উদ্যোক্তাদের ফাঁদে ফেলার পরিচিত কৌশল।
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Merchant Recommended Action CTA Area */}
            <div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col gap-space-sm border border-surface-border/60">
              <span className="font-label-sm text-label-sm font-bold text-deep-navy uppercase tracking-wider">
                করণীয় পদক্ষেপ (Recommended Merchant Actions):
              </span>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm">
                {/* Primary Danger CTA */}
                <button
                  onClick={handleFreeze}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-space-md rounded-xl font-label-lg text-label-lg font-bold shadow-md transition-all active:scale-98 ${
                    isFrozen
                      ? "bg-growth-green text-white cursor-default"
                      : "bg-danger-rose text-on-primary hover:opacity-95"
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isFrozen ? "check" : "front_hand"}
                  </span>
                  <span>
                    {isFrozen ? "ডেলিভারি সফলভাবে স্থগিত করা হয়েছে" : "Do Not Dispatch / পণ্য পাঠাবেন না"}
                  </span>
                </button>

                {/* Secondary Verification CTA */}
                <a
                  href="tel:16247"
                  className="flex items-center justify-center gap-2 py-3 px-space-md rounded-xl bg-surface text-deep-navy font-label-lg text-label-lg font-semibold shadow-xs hover:bg-surface-container transition-all border border-surface-border"
                >
                  <span className="material-symbols-outlined text-vibrant-teal text-[20px]">call</span>
                  <span>১৬২৪৭-এ সরাসরি যাচাই করুন</span>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-1 gap-2">
                <button
                  onClick={handleReport}
                  className={`inline-flex items-center gap-1 font-label-sm text-label-sm font-bold transition-colors text-left ${
                    isReported ? "text-growth-green" : "text-danger-rose hover:underline"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">report</span>
                  <span>
                    {isReported
                      ? "✓ সাইবার পুলিশ ও বিকাশ সিকিউরিটিতে নম্বর রিপোর্ট সম্পন্ন!"
                      : "সাইবার ফ্রড সেন্ট্রাল ডাটাবেজে এই নম্বর রিপোর্ট করুন (Report Scam)"}
                  </span>
                </button>
                <span className="font-body-sm text-[11px] text-on-surface-variant">
                  স্বয়ংক্রিয় প্রটেকশন লক চালু রয়েছে
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fraud Prevention Summary & National Hotline Protection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mb-space-lg">
        {/* Card 1: Monthly Saved Amount by Pahara */}
        <div className="bg-surface rounded-2xl p-space-md shadow-sm border border-surface-border flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-surface-container text-growth-green flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              savings
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
              এই মাসে বাঁচানো অর্থ
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-md text-headline-md text-deep-navy font-extrabold">
                ৳৯,৭০০
              </span>
              <span className="font-label-sm text-label-sm text-growth-green font-bold">
                ৩টি প্রতারণা রোধ
              </span>
            </div>
            <span className="font-body-sm text-[11px] text-on-surface-variant truncate">
              নুসরাত জাহান শাড়ি ও বুটিক নিরাপদ
            </span>
          </div>
        </div>

        {/* Card 2: Cyber Crime Emergency Helpline BD */}
        <div className="bg-surface rounded-2xl p-space-md shadow-sm border border-surface-border flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md min-w-0">
            <div className="w-12 h-12 rounded-xl bg-surface-container text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px]">local_police</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                বাংলাদেশ সাইবার ক্রাইম তদন্ত বিভাগ
              </span>
              <span className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                হটলাইন: ০১৩২০০০০৮৮৮
              </span>
              <span className="font-body-sm text-[11px] text-primary font-semibold">
                ২৪ ঘণ্টা উদ্যোক্তা আইনি সহায়তা
              </span>
            </div>
          </div>
          <a
            href="tel:01320000888"
            className="w-10 h-10 rounded-full bg-surface-container-high text-deep-navy flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">phone_in_talk</span>
          </a>
        </div>

        {/* Card 3: Shield Health & Merchant Community Network */}
        <div className="bg-surface rounded-2xl p-space-md shadow-sm border border-surface-border flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-surface-container text-vibrant-teal flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified_user
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              কমিউনিটি ইন্টেলিজেন্স
            </span>
            <span className="font-label-lg text-label-lg text-deep-navy font-bold">
              ১২,৪৫০+ মার্চেন্ট যুক্ত
            </span>
            <span className="font-body-sm text-[11px] text-on-surface-variant">
              সারাদেশের ভুয়া নম্বর তাৎক্ষণিক ব্লক হয়
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
