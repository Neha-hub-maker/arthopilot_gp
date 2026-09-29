"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function DashboardPage() {
  const {
    todaySales,
    todayExpenses,
    netProfit,
    cashDrawer,
    bKashTotal,
    nagadTotal,
    transactions,
    openVoiceModal,
    language,
  } = useApp();

  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "inflow" | "outflow">("all");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const aiMockResponses: Record<string, string> = {
    "আজকের বাকি হিসাব দেখাও":
      "আজকের বাকি বা বকেয়া খাতা শূন্য (৳০)! তবে গত মঙ্গলবারের বকেয়া রয়েছে শায়লা রহমানের নিকট ৳১,৫০০। স্বয়ংক্রিয় তাগাদা এসএমএস পাঠানো হয়েছে।",
    "গত সপ্তাহের চেয়ে লাভ কেমন?":
      "গত সপ্তাহের আজকের চেয়ে আপনার নিট লাভ ২৩.২% বেশি হয়েছে। বিশেষত জামদানি শাড়ি ক্যাটাগরিতে সেল উল্লেখযোগ্য বেড়েছে।",
    "বিকাশের লেনদেন মিলিয়ে দাও":
      "বিকাশ স্টেটমেন্ট ও কাউন্টার রেজিস্টার শতভাগ মিলে গেছে। আজকের মোট প্রাপ্তি ৳৬,১০০ (৮টি ট্রানজ্যাকশন)। ফি কর্তনের পর ক্যাশ ইন হ্যান্ড নিরাপদ।",
  };

  const handlePromptClick = (prompt: string) => {
    setSelectedPrompt(prompt);
    setAiResponse("এআই বিশ্লেষণ করা হচ্ছে...");
    setTimeout(() => {
      setAiResponse(aiMockResponses[prompt] || "উক্ত তথ্যের রিয়েলটাইম রেকর্ড প্রক্রিয়া সম্পন্ন হয়েছে।");
    }, 450);
  };

  const handleVoiceTap = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setSelectedPrompt("কথা শুনে বিশ্লেষণ সম্পন্ন");
      setAiResponse(
        "আপনার কথা শুনলাম: 'আজকের মোট বিকাশ ও ক্যাশ বিক্রির অনুপাত কত?'। উত্তর: আজ বিকাশ ৪৮% এবং ক্যাশ ৩৫%। মোট ক্যাশ ফ্লো চমৎকার অবস্থানে রয়েছে।"
      );
    }, 2500);
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filterType === "all") return true;
    return t.type === filterType;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-space-md lg:px-gutter-lg py-space-lg flex flex-col gap-space-lg">
      {/* Top Header Card */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md bg-surface p-space-md lg:p-space-lg rounded-2xl shadow-sm border border-surface-border/60">
        <div className="flex items-center gap-space-md">
          <div className="relative w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center shrink-0 shadow-inner">
            <span
              className="material-symbols-outlined text-[32px] text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              storefront
            </span>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-growth-green rounded-full ring-2 ring-surface"></span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="font-headline-md text-headline-md text-deep-navy font-bold tracking-tight">
                মেসার্স সুমনা ফ্যাশন ও বুটিক
              </span>
              <span className="px-space-xs py-0.5 bg-surface-container text-on-surface-variant font-label-sm text-label-sm rounded-full">
                SME ID: BD-88219
              </span>
            </div>
            <div className="flex items-center gap-space-xs text-on-surface-variant mt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-growth-green animate-pulse"></span>
              <span className="font-body-sm text-body-sm font-medium">
                সক্রিয় ক্যাশ ড্রয়ার • লাইভ ক্লাউড সিঙ্ক (২ মিনিট আগে)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-space-sm w-full lg:w-auto">
          <div className="flex-1 lg:flex-initial flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-sm rounded-xl border border-surface-border/40">
            <span className="material-symbols-outlined text-vibrant-teal text-[20px]">calendar_today</span>
            <span className="font-label-md text-label-md text-deep-navy font-semibold">
              আজ, ২৪ অক্টোবর ২০২৫
            </span>
          </div>

          {/* Mobile Preview Switcher */}
          <button
            onClick={() => setIsMobilePreview(!isMobilePreview)}
            className={`flex items-center gap-space-xs px-space-md py-space-sm rounded-xl font-label-md text-label-md transition-all shadow-xs ${
              isMobilePreview
                ? "bg-primary-container text-on-primary font-bold shadow-md"
                : "bg-surface-container text-deep-navy hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">devices</span>
            <span>{isMobilePreview ? "ডেস্কটপ ভিউ" : "মোবাইল ভিউ প্রিভিউ"}</span>
          </button>
        </div>
      </div>

      {/* Main Dashboard Container (Supports simulated mobile frame) */}
      <div
        className={`w-full transition-all duration-500 ${
          isMobilePreview
            ? "max-w-md mx-auto bg-surface-container-lowest p-4 rounded-3xl shadow-2xl border-4 border-deep-navy/80"
            : ""
        }`}
      >
        {/* KPI Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md lg:gap-space-lg">
          {/* Sales Card */}
          <div className="bg-surface rounded-2xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden group border border-surface-border/50">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                  আজকের মোট বিক্রি
                </span>
                <span className="px-space-xs py-0.5 rounded-full bg-surface-container text-vibrant-teal font-label-sm text-label-sm font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span> +18%
                </span>
              </div>
              <div className="mt-space-sm flex items-baseline gap-space-xs">
                <span className="font-headline-lg text-headline-lg text-deep-navy font-extrabold tracking-tight">
                  ৳{todaySales.toLocaleString()}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                  / ৳{todaySales.toLocaleString()}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                গতকালের চেয়ে ৳১,৯৫০ বেশি • ২৪টি লেনদেন
              </p>
            </div>

            <div className="mt-space-md pt-space-sm">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm mb-1">
                <span>পেমেন্ট মাধ্যম বিভাজন</span>
                <span className="font-semibold text-deep-navy">১০০% সম্পূর্ণ</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-high flex overflow-hidden">
                <div className="h-full bg-vibrant-teal" style={{ width: "48.8%" }} title="বিকাশ"></div>
                <div className="h-full bg-warning-amber" style={{ width: "16.8%" }} title="নগদ"></div>
                <div className="h-full bg-deep-navy" style={{ width: "34.4%" }} title="ক্যাশ"></div>
              </div>
              <div className="flex items-center justify-between mt-2 font-label-sm text-label-sm text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-vibrant-teal"></span>বিকাশ ৪৮%
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-warning-amber"></span>নগদ ১৭%
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-deep-navy"></span>ক্যাশ ৩৫%
                </span>
              </div>
            </div>
          </div>

          {/* Expense Card */}
          <div className="bg-surface rounded-2xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden group border border-surface-border/50">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-danger-rose/5 rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                  আজকের মোট খরচ
                </span>
                <span className="px-space-xs py-0.5 rounded-full bg-surface-container text-danger-rose font-label-sm text-label-sm font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[14px]">arrow_outward</span> ৭টি এন্ট্রি
                </span>
              </div>
              <div className="mt-space-sm flex items-baseline gap-space-xs">
                <span className="font-headline-lg text-headline-lg text-deep-navy font-extrabold tracking-tight">
                  ৳{todayExpenses.toLocaleString()}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                  / ৳{todayExpenses.toLocaleString()}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                কাঁচামাল কেনা, প্যাকেজিং ও ডেলিভারি চার্জ
              </p>
            </div>

            <div className="mt-space-md pt-space-sm flex flex-col gap-space-xs">
              <div className="flex items-center justify-between py-1 bg-surface-container-low px-space-sm rounded-lg">
                <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                  কাপড় ও সুতা ক্রয় (ইসলামপুর)
                </span>
                <span className="font-label-sm text-label-sm font-bold text-deep-navy">৳৩,৪০০</span>
              </div>
              <div className="flex items-center justify-between py-1 bg-surface-container-low px-space-sm rounded-lg">
                <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                  রেডএক্স ডেলিভারি চার্জ (৩ পার্সেল)
                </span>
                <span className="font-label-sm text-label-sm font-bold text-deep-navy">৳৫২০</span>
              </div>
            </div>
          </div>

          {/* Profit Card */}
          <div className="bg-surface rounded-2xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden group border border-surface-border/50">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-growth-green/5 rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                  আজকের নিট লাভ
                </span>
                <span className="px-space-xs py-0.5 rounded-full bg-surface-container text-tertiary font-label-sm text-label-sm font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span> ৫৮.৪% মার্জিন
                </span>
              </div>
              <div className="mt-space-sm flex items-baseline gap-space-xs">
                <span className="font-headline-lg text-headline-lg text-growth-green font-extrabold tracking-tight">
                  ৳{netProfit.toLocaleString()}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                  / ৳{netProfit.toLocaleString()}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-tertiary font-medium mt-1">
                ✓ স্বাস্থ্যকর আর্থিক প্রবৃদ্ধি রেকর্ড
              </p>
            </div>

            <div className="mt-space-md pt-space-sm flex items-center justify-between bg-surface-container-low p-space-sm rounded-xl">
              <div className="flex items-center gap-space-xs">
                <div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-deep-navy font-bold leading-tight">
                    ক্রেডিট স্কোর সাপোর্ট
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
                    ব্যাংক লোন যোগ্যতা ৮৪%
                  </span>
                </div>
              </div>
              <span className="font-label-sm text-label-sm text-primary font-bold">A+ রেট</span>
            </div>
          </div>
        </div>

        {/* AI Assistant Interactive Card */}
        <div className="mt-space-lg bg-surface rounded-2xl p-space-lg shadow-sm relative overflow-hidden border border-surface-border/60">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
            <div className="flex items-start gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-md">
                <span className="material-symbols-outlined text-[28px]">smart_toy</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-space-xs">
                  <h2 className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                    Ask ArthoPilot anything
                  </h2>
                  <span className="px-space-xs py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                    অর্থপাইলট এআই অ্যাসিস্ট্যান্ট
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                  বাংলায় যে কোনো হিসাব, বাকি খাতা বা ব্যবসায়িক পরামর্শ মুখে জিজ্ঞাসা করুন
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-xs rounded-full">
              <span className="w-2 h-2 rounded-full bg-growth-green"></span>
              <span className="font-label-sm text-label-sm text-deep-navy font-semibold">
                ভয়েস মডেল: বাংলা এনএলইউ ৩.২ লাইভ
              </span>
            </div>
          </div>

          <div className="mt-space-lg flex flex-col md:flex-row items-center justify-center gap-space-lg py-space-md bg-surface-container-low/60 rounded-xl px-space-md border border-surface-border/40">
            {/* Big Mic Button */}
            <div className="flex flex-col items-center justify-center text-center">
              <div onClick={handleVoiceTap} className="relative group cursor-pointer">
                {isListening && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-vibrant-teal/30 animate-ping"></div>
                    <div className="absolute -inset-2 rounded-full bg-vibrant-teal/20 animate-pulse"></div>
                  </>
                )}
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-deep-navy via-primary to-vibrant-teal flex items-center justify-center shadow-lg transform active:scale-95 transition-transform duration-150">
                  <span className="material-symbols-outlined text-[36px] text-on-primary">
                    {isListening ? "settings_voice" : "mic"}
                  </span>
                </div>
              </div>
              <span className="font-label-lg text-label-lg text-deep-navy font-bold mt-space-sm">
                {isListening ? "শুনছি... বলুন" : "কথা বলতে ট্যাপ করুন"}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Tap to Speak Bangla or English
              </span>
            </div>

            {/* Prompt Chips */}
            <div className="flex-1 w-full max-w-xl flex flex-col gap-space-sm">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                সচরাচর জিজ্ঞাসিত প্রম্পটসমূহ (ট্যাপ করে প্রশ্ন করুন):
              </span>
              <div className="flex flex-wrap gap-space-xs">
                {Object.keys(aiMockResponses).map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handlePromptClick(prompt)}
                    className={`px-space-md py-space-sm rounded-full text-deep-navy font-label-sm text-label-sm shadow-sm transition-all flex items-center gap-space-xs text-left border ${
                      selectedPrompt === prompt
                        ? "bg-surface-container border-primary font-bold shadow-md"
                        : "bg-surface border-surface-border/60 hover:bg-surface-container"
                    }`}
                  >
                    <span className="material-symbols-outlined text-vibrant-teal text-[16px]">
                      record_voice_over
                    </span>
                    <span>"{prompt}"</span>
                  </button>
                ))}
              </div>

              {/* AI Transcript Card */}
              {aiResponse && (
                <div className="p-space-md rounded-xl bg-surface shadow-sm border border-vibrant-teal/30 flex items-start gap-space-sm animate-fadeIn">
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                    auto_awesome
                  </span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-primary font-bold">
                      এআই বিশ্লেষণ উত্তর:
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface mt-0.5">{aiResponse}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live Feed & Breakdown Layout */}
        <div className="mt-space-lg grid grid-cols-1 lg:grid-cols-12 gap-space-md lg:gap-space-lg">
          {/* Left Column: Live Transactions Feed */}
          <div className="lg:col-span-8 flex flex-col gap-space-md">
            <div className="bg-surface rounded-2xl p-space-lg shadow-sm border border-surface-border/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-space-md">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-deep-navy text-[22px]">history</span>
                  <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                    লাইভ লেনদেন ফিড (Recent Feed)
                  </h3>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1 bg-surface-container p-1 rounded-full text-xs">
                  <button
                    onClick={() => setFilterType("all")}
                    className={`px-3 py-1 rounded-full font-semibold transition-all ${
                      filterType === "all" ? "bg-surface text-deep-navy shadow-xs" : "text-on-surface-variant"
                    }`}
                  >
                    সবগুলো ({transactions.length})
                  </button>
                  <button
                    onClick={() => setFilterType("inflow")}
                    className={`px-3 py-1 rounded-full font-semibold transition-all ${
                      filterType === "inflow"
                        ? "bg-growth-green text-white shadow-xs"
                        : "text-on-surface-variant"
                    }`}
                  >
                    বিক্রি
                  </button>
                  <button
                    onClick={() => setFilterType("outflow")}
                    className={`px-3 py-1 rounded-full font-semibold transition-all ${
                      filterType === "outflow"
                        ? "bg-danger-rose text-white shadow-xs"
                        : "text-on-surface-variant"
                    }`}
                  >
                    খরচ
                  </button>
                </div>
              </div>

              {/* Transactions List */}
              <div className="flex flex-col gap-space-xs divide-y divide-surface-border/40">
                {filteredTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-space-sm rounded-xl hover:bg-surface-container-low transition-colors"
                  >
                    <div className="flex items-center gap-space-sm min-w-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${
                          tx.type === "inflow"
                            ? "bg-surface-container text-vibrant-teal"
                            : "bg-surface-container text-danger-rose"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {tx.type === "inflow" ? "account_balance_wallet" : "shopping_bag"}
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-label-md text-label-md text-deep-navy font-bold truncate">
                            {tx.title}
                          </span>
                          {tx.isAiParsed && (
                            <span className="px-1.5 py-0.2 rounded bg-primary/10 text-primary text-[10px] font-bold">
                              এআই প্রস্তুত
                            </span>
                          )}
                        </div>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {tx.method} • ভাউচার: #{tx.voucherNo} • {tx.time}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end shrink-0 pl-space-xs">
                      <span
                        className={`font-headline-sm text-headline-sm font-bold ${
                          tx.type === "inflow" ? "text-growth-green" : "text-danger-rose"
                        }`}
                      >
                        {tx.type === "inflow" ? "+" : "-"}৳{tx.amount.toLocaleString()}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {tx.type === "inflow" ? "পেমেন্ট সম্পন্ন" : "খরচ হিসাবভুক্ত"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="mt-space-md pt-space-sm flex items-center justify-between border-t border-surface-border/50">
                <button
                  onClick={openVoiceModal}
                  className="font-label-md text-label-md text-vibrant-teal font-bold hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>নতুন এন্ট্রি যোগ করুন (ভয়েস/টেক্সট)</span>
                </button>
                <Link
                  href="/voice"
                  className="font-label-md text-label-md text-primary font-bold hover:underline flex items-center gap-1"
                >
                  <span>সম্পূর্ণ লেজার খাতা দেখুন</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* AI Insight Card */}
            <div className="bg-surface rounded-2xl p-space-md shadow-sm flex items-center gap-space-md border border-warning-amber/30">
              <div className="w-10 h-10 rounded-xl bg-warning-amber/15 text-warning-amber flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">lightbulb</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-warning-amber font-bold">
                  এআই মাইক্রো-ইনসাইট (AI Alert)
                </span>
                <p className="font-body-sm text-body-sm text-on-surface">
                  💡 টিপস: আজ ডেলিভারি খরচ স্বাভাবিকের চেয়ে ১৫% বেশি হয়েছে। একাধিক পার্সেল একই রুটে একত্রে
                  পাঠালে প্রায় ৳১৮০ সাশ্রয় সম্ভব।
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Cash Breakdown & Predictions */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            {/* Cash Breakdown */}
            <div className="bg-surface rounded-2xl p-space-lg shadow-sm flex flex-col justify-between border border-surface-border/60">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                    ক্যাশ বণ্টন চিত্র
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant">pie_chart</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  আজকের মোট ড্রয়ার ও ডিজিটাল ব্যালেন্স বণ্টন
                </p>

                <div className="mt-space-md flex flex-col gap-space-sm">
                  {/* bKash */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between font-label-md text-label-md">
                      <span className="text-deep-navy font-semibold flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-vibrant-teal"></span> বিকাশ মার্চেন্ট (bKash)
                      </span>
                      <span className="font-bold text-deep-navy">৳{bKashTotal.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                      <div className="bg-vibrant-teal h-full rounded-full" style={{ width: "48.8%" }}></div>
                    </div>
                  </div>

                  {/* Cash */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between font-label-md text-label-md">
                      <span className="text-deep-navy font-semibold flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-deep-navy"></span> নগদ ড্রয়ার ক্যাশ (Cash in Hand)
                      </span>
                      <span className="font-bold text-deep-navy">৳{cashDrawer.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                      <div className="bg-deep-navy h-full rounded-full" style={{ width: "34.4%" }}></div>
                    </div>
                  </div>

                  {/* Nagad */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between font-label-md text-label-md">
                      <span className="text-deep-navy font-semibold flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-warning-amber"></span> নগদ ওয়ালেট (Nagad)
                      </span>
                      <span className="font-bold text-deep-navy">৳{nagadTotal.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                      <div className="bg-warning-amber h-full rounded-full" style={{ width: "16.8%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-space-lg pt-space-md bg-surface-container-low p-space-md rounded-xl border border-surface-border/40">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                  আজকের মোট সংরক্ষিত তহবিল
                </span>
                <div className="font-headline-md text-headline-md text-deep-navy font-extrabold mt-1">
                  ৳{todaySales.toLocaleString()}
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  সব চ্যানেলের অর্থ স্বয়ংক্রিয়ভাবে অডিট সম্পন্ন।
                </p>
              </div>
            </div>

            {/* Weekly Forecast Card */}
            <div className="bg-gradient-to-br from-deep-navy to-primary p-space-lg rounded-2xl text-on-primary shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-space-xs py-0.5 rounded-full bg-surface/20 font-label-sm text-label-sm font-semibold">
                    সাপ্তাহিক পূর্বাভাস
                  </span>
                  <span className="material-symbols-outlined text-primary-fixed">query_stats</span>
                </div>
                <div className="font-headline-sm text-headline-sm font-bold mt-space-sm text-white">
                  প্রত্যাশিত টার্নওভার: ৳৮২,০০০+
                </div>
                <p className="font-body-sm text-body-sm opacity-90 mt-1 text-surface-container">
                  আগামী শুক্রবারের বিয়ের উৎসব চাহিদা মেটাতে আরও ২০ সেট শাড়ির মজুদ প্রস্তুত রাখার পরামর্শ দিচ্ছে এআই।
                </p>
              </div>
              <div className="mt-space-md">
                <Link
                  href="/agents"
                  className="block w-full py-space-sm px-space-md bg-surface text-deep-navy font-label-md text-label-md font-bold rounded-xl hover:bg-surface-container transition-colors shadow-sm text-center"
                >
                  ইনভেন্টরি পরামর্শ দেখুন
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
