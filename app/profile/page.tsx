"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function CreditReadinessPage() {
  const { showToast, language } = useApp();

  const [loanAmount, setLoanAmount] = useState<number>(350000);
  const [loanTenure, setLoanTenure] = useState<number>(12); // months
  const [isDownloading, setIsDownloading] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [checklist, setChecklist] = useState([
    {
      id: 1,
      title: "৬ মাসের ডিজিটালি ভেরিফাইড খতিয়ান",
      desc: "দৈনন্দিন অডিও ও ম্যানুয়াল রসিদ হতে এআই দ্বারা সংকলিত ও ভ্যালিডেটেড",
      status: true,
    },
    {
      id: 2,
      title: "ডিজিটাল পেমেন্ট স্টেটমেন্ট (bKash / Nagad)",
      desc: "সরাসরি এমএফএস মার্চেন্ট অ্যাকাউন্ট এপিআই ডাটা ফিড সংযুক্ত",
      status: true,
    },
    {
      id: 3,
      title: "Artho Mitra ফিল্ড ভেরিফিকেশন সম্পন্ন",
      desc: "আর্থিক এজেন্ট কামরুল হাসান দ্বারা বুটিকের ফিজিক্যাল স্টক অডিট সম্পন্ন",
      status: true,
    },
    {
      id: 4,
      title: "আপডেট ট্যাক্স রিটার্ন একনলেজমেন্ট",
      desc: "২০২৪-২৫ অর্থবছরের প্রমাণপত্র জমা দেওয়া বাকি রয়েছে",
      status: false,
    },
  ]);

  // Loan calculation: 9% annual interest rate
  const monthlyRate = 0.09 / 12;
  const monthlyEMI = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTenure)) /
      (Math.pow(1 + monthlyRate, loanTenure) - 1)
  );

  const toggleCheck = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: !item.status } : item))
    );
    showToast("চেকলিস্ট আপডেট করা হয়েছে");
  };

  const handleDownload = () => {
    setIsDownloading(true);
    showToast("📄 অফিসিয়াল PDF ডসিয়ার ডাউনলোড শুরু হয়েছে (ArthoPilot_Credit_Dossier_Nusrat.pdf)...");
    setTimeout(() => {
      setIsDownloading(false);
      showToast("✅ PDF ডসিয়ার সফলভাবে ডাউনলোড হয়েছে!");
    }, 2000);
  };

  const handleApply = () => {
    setIsApplying(true);
    showToast("🏦 ব্র্যাক ব্যাংক, সিটি ব্যাংক ও IDLC তে ডিজিটাল লোন ফাইল পাঠানো হচ্ছে...");
    setTimeout(() => {
      setIsApplying(false);
      showToast("🎉 অভিনন্দন! আপনার ৳৩,৫০,০০০ ঋণ আবেদন সফলভাবে গৃহীত হয়েছে। ২৪ ঘণ্টার মধ্যে ব্যাংক যোগাযোগ করবে।");
    }, 2500);
  };

  const completedCount = checklist.filter((c) => c.status).length;
  const readinessPercent = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="w-full flex flex-col">
      {/* Top Banner & Header Section */}
      <section className="relative w-full overflow-hidden bg-surface py-space-xl px-space-md lg:px-gutter-lg border-b border-surface-border/50">
        <div className="absolute -top-32 -right-24 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-28 w-80 h-80 bg-surface-container-highest/40 rounded-full blur-2xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-lg">
            <div className="flex items-center gap-space-xs">
              <span className="px-space-sm py-space-xs bg-surface-container rounded-full text-deep-navy font-label-sm text-label-sm flex items-center gap-1.5 shadow-sm border border-surface-border">
                <span
                  className="material-symbols-outlined text-[15px] text-vibrant-teal"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                বাংলাদেশ ব্যাংক CMSME ফ্রেমওয়ার্ক অনুমোদিত
              </span>
              <span className="text-outline text-label-sm">•</span>
              <span className="text-on-surface-variant font-label-sm text-label-sm">
                Dossier ID: AP-BD-8924-N
              </span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-growth-green animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-deep-navy font-semibold">
                লাইভ ক্রেডিট সিঙ্ক সক্রিয়
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
            {/* Left Profile Overview */}
            <div className="lg:col-span-8 bg-surface-container-low rounded-2xl p-space-lg lg:p-gutter flex flex-col justify-between shadow-sm border border-surface-border/60 relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-md">
                  <div className="relative">
                    <img
                      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover shadow-md ring-2 ring-primary/20"
                      alt="Nusrat Jahan"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrWmiUl8uWMHEoKQ2qGBrxGZknCBxYJO6bobTS92XnBFl6XBZZpnbkqSiQqR4m2qAgMhyg0OksF3u4x8DQFTjv5vxdfIqKP1GhtvXmBykC8dLvi215XatRmyAouN1WjZHdNI-scWZyuVfDeeRc4AN7GMKeeFI_Zf8C6zX7Hwg1rfsA_KEm3V8KCYiJ636ixFZnKrKG6wXLIF-UWPpYvmN5LeAXOj1U2iwnIkwJA3NhkG2TGv3OgmxX"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-growth-green text-surface p-0.5 rounded-full flex items-center justify-center ring-2 ring-white">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </div>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-space-xs flex-wrap">
                      <span className="font-label-sm text-label-sm px-space-xs py-0.5 bg-surface text-primary rounded-full font-bold shadow-xs">
                        CMSME Tier A
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        রেজিস্ট্রেশন: ২০১৭৩২৯৪
                      </span>
                    </div>
                    <h1 className="font-headline-md text-headline-md text-deep-navy font-bold mt-1 truncate">
                      মেসার্স সুমনা ফ্যাশন ও বুটিক
                    </h1>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      স্বত্বাধিকারী: <strong className="text-deep-navy font-bold">নুসরাত জাহান</strong> • নারী
                      উদ্যোক্তা ও কুটির শিল্প
                    </p>
                  </div>
                </div>

                <div className="flex md:flex-col items-end gap-1 shrink-0 self-start md:self-auto bg-surface py-space-xs px-space-sm rounded-xl shadow-xs border border-surface-border/40">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">রেটিং মেয়াদ</span>
                  <span className="font-label-md text-label-md text-deep-navy font-bold">
                    মে ২০২৫ পর্যন্ত বৈধ
                  </span>
                </div>
              </div>

              {/* 3 Metric Summary Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md mt-space-lg pt-space-md bg-surface rounded-xl p-space-md shadow-sm border border-surface-border/40">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[16px] text-vibrant-teal">analytics</span>
                    বিকল্প ক্রেডিট স্কোর
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="font-display-lg text-display-lg text-deep-navy font-bold">৭৮৫</span>
                    <span className="font-body-sm text-body-sm text-outline">/ ৯০০</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-growth-green font-bold flex items-center gap-1 mt-0.5">
                    <span
                      className="material-symbols-outlined text-[14px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      thumb_up
                    </span>
                    চমৎকার / Excellent
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[16px] text-growth-green">
                      account_balance_wallet
                    </span>
                    প্রাক-অনুমোদিত ঋণ সীমা
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-display-lg text-display-lg text-deep-navy font-bold">
                      ৳৩,৫০,০০০
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-semibold mt-0.5">
                    ৯% বার্ষিক সহজ মুনাফাহারে
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[16px] text-deep-navy">
                      partner_exchange
                    </span>
                    অংশীদার ব্যাংক ও NBFI
                  </span>
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    <span className="font-label-sm text-label-sm px-space-xs py-0.5 bg-surface-container rounded-lg font-bold text-deep-navy">
                      BRAC Bank
                    </span>
                    <span className="font-label-sm text-label-sm px-space-xs py-0.5 bg-surface-container rounded-lg font-bold text-deep-navy">
                      City Bank
                    </span>
                    <span className="font-label-sm text-label-sm px-space-xs py-0.5 bg-surface-container rounded-lg font-bold text-deep-navy">
                      IDLC
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">
                    সরাসরি ডিজিটাল ঋণ বিতরণযোগ্য
                  </span>
                </div>
              </div>
            </div>

            {/* Right Readiness Circular Meter */}
            <div className="lg:col-span-4 bg-deep-navy text-on-secondary rounded-2xl p-space-lg flex flex-col justify-between relative shadow-xl overflow-hidden">
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-vibrant-teal/20 rounded-full blur-xl pointer-events-none"></div>
              <div className="relative z-10 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed font-bold">
                    ব্যাংক রেডিনেস ভিউ
                  </span>
                  <span className="font-label-sm text-label-sm px-space-xs py-0.5 bg-growth-green/20 text-tertiary-fixed rounded-full font-bold">
                    স্মার্ট ভেরিফাইড
                  </span>
                </div>

                <div className="my-space-md flex flex-col items-center justify-center py-space-xs">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-surface/10"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      ></path>
                      <path
                        className="text-vibrant-teal"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray={`${readinessPercent}, 100`}
                        strokeLinecap="round"
                        strokeWidth="3.5"
                      ></path>
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="font-display-lg text-display-lg text-surface font-extrabold leading-none">
                        {readinessPercent}%
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary-fixed mt-1">
                        প্রস্তুতি সম্পন্ন
                      </span>
                    </div>
                  </div>
                </div>

                <p className="font-body-sm text-body-sm text-secondary-fixed text-center">
                  আপনার প্রোফাইল আনুষ্ঠানিক ব্যাংকিং সুবিধার জন্য প্রায় সম্পূর্ণ প্রস্তুত।
                </p>
              </div>

              <div className="relative z-10 mt-space-md pt-space-sm bg-surface/5 rounded-xl p-space-sm flex items-center justify-between border border-white/10">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-vibrant-teal text-[20px]">
                    verified_user
                  </span>
                  <span className="font-label-sm text-label-sm text-surface">
                    মানব যাচাই (Artho Mitra)
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-growth-green font-bold">
                  যাচাইকৃত ✓
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Micro-Loan EMI Calculator */}
      <section className="w-full py-space-lg px-space-md lg:px-gutter-lg max-w-7xl mx-auto">
        <div className="bg-surface rounded-2xl p-space-lg shadow-sm border border-surface-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-md border-b border-surface-border">
            <div className="flex items-center gap-space-sm">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">calculate</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                  CMSME সহজ শর্তে ঋণ ক্যালকুলেটর (Interactive EMI Simulator)
                </h3>
                <p className="text-xs text-on-surface-variant">
                  বাংলাদেশ ব্যাংক নির্ধারিত ৯% সরল মুনাফাহারে আপনার মাসিক কিস্তি গণনা করুন
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-growth-green/10 text-growth-green text-xs font-bold self-start md:self-center">
              প্রাক-অনুমোদিত রেট: ৯% বার্ষিক
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mt-space-lg items-center">
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              {/* Loan Amount Slider */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-md text-label-md text-deep-navy font-bold">
                    ঋণের পরিমাণ (Loan Amount):
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    ৳{loanAmount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={50000}
                  max={500000}
                  step={10000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-vibrant-teal"
                />
                <div className="flex justify-between text-xs text-on-surface-variant mt-1">
                  <span>৳৫০,০০০</span>
                  <span>৳২,৫০,০০০</span>
                  <span>৳৫,০০,০০০</span>
                </div>
              </div>

              {/* Loan Tenure Slider */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-md text-label-md text-deep-navy font-bold">
                    পরিশোধের মেয়াদ (Tenure):
                  </span>
                  <span className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                    {loanTenure} মাস
                  </span>
                </div>
                <input
                  type="range"
                  min={6}
                  max={36}
                  step={6}
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-on-surface-variant mt-1">
                  <span>৬ মাস</span>
                  <span>১২ মাস</span>
                  <span>২৪ মাস</span>
                  <span>৩৬ মাস</span>
                </div>
              </div>
            </div>

            {/* Computed Installment Result */}
            <div className="lg:col-span-5 bg-surface-container-low p-space-lg rounded-2xl border border-vibrant-teal/30 flex flex-col justify-between">
              <div>
                <span className="text-xs text-on-surface-variant uppercase font-bold tracking-wider block">
                  আনুমানিক মাসিক কিস্তি (Monthly Installment):
                </span>
                <div className="font-display-lg text-display-lg text-deep-navy font-extrabold mt-1">
                  ৳{monthlyEMI.toLocaleString()}
                  <span className="text-sm font-normal text-on-surface-variant"> / প্রতি মাসে</span>
                </div>
                <div className="flex items-center justify-between text-xs text-on-surface-variant mt-3 pt-3 border-t border-surface-border">
                  <span>মোট মূলধন: <strong>৳{loanAmount.toLocaleString()}</strong></span>
                  <span>মুনাফা হার: <strong>৯%</strong></span>
                </div>
              </div>

              <button
                onClick={handleApply}
                disabled={isApplying}
                className="mt-space-md w-full py-3 bg-vibrant-teal hover:bg-primary text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
                <span>{isApplying ? "আবেদন পাঠানো হচ্ছে..." : "এই প্যাকেজে আবেদন করুন"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Tier Audit Metrics */}
      <section className="w-full py-space-xl px-space-md lg:px-gutter-lg max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm mb-space-lg">
          <div>
            <div className="flex items-center gap-space-xs text-primary font-label-md text-label-md font-semibold mb-1">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              ৪-স্তরের অডিট মেট্রিক্স
            </div>
            <h2 className="font-headline-lg text-headline-lg text-deep-navy font-bold">
              ব্যবসায়িক স্বাস্থ্য ও ক্রেডিট ভিত্তি
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
            দৈনন্দিন ব্যবসার মৌখিক ও ডিজিটাল এন্ট্রির ভিত্তিতে কৃত্রিম বুদ্ধিমত্তা চালিত বাস্তবসম্মত লোন ক্রেডিট সক্ষমতা পরিমাপ।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
          {/* Audit 1 */}
          <div className="bg-surface rounded-2xl p-space-lg shadow-sm border border-surface-border/60 hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-space-sm mb-space-sm">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[24px]">history_edu</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-outline font-semibold">
                      ১. হিসাবের নিয়মানুবর্তিতা
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                      Record Consistency
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-warning-amber">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                  <span className="font-label-md text-label-md font-bold text-deep-navy ml-1">৫.০ / ৫</span>
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                গত ১৮০ দিন ধরে প্রতিদিন নিয়মিত আয়-ব্যয় রেকর্ড করা হয়েছে। কোনো অস্বাভাবিক খতিয়ান বিরতি পাওয়া যায়নি।
              </p>
            </div>
            <div className="mt-space-md pt-space-sm bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between border border-surface-border/40">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                দৈনিক হিসাব লগ ইন সক্রিয়তা
              </span>
              <span className="font-label-sm text-label-sm text-growth-green font-bold">
                ১৮০ দিন পূর্ণ (১০০%)
              </span>
            </div>
          </div>

          {/* Audit 2 */}
          <div className="bg-surface rounded-2xl p-space-lg shadow-sm border border-surface-border/60 hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-space-sm mb-space-sm">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-vibrant-teal">
                    <span className="material-symbols-outlined text-[24px]">payments</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-outline font-semibold">
                      ২. লেনদেনের ইতিহাস ও প্রবাহ
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                      Transaction History
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-warning-amber">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                  <span className="font-label-md text-label-md font-bold text-deep-navy ml-1">৫.০ / ৫</span>
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                মাসিক গড় লেনদেন ৳১,৮৫,০০০; নগদ ও ডিজিটাল লেনদেনের সঠিক অনুপাত এবং স্বাস্থ্যকর কার্যনির্বাহী নগদ প্রবাহ বজায় রয়েছে।
              </p>
            </div>
            <div className="mt-space-md pt-space-sm bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between border border-surface-border/40">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                ডিজিটাল পেমেন্ট অনুপাত
              </span>
              <span className="font-label-sm text-label-sm text-deep-navy font-bold">
                ৬৪% bKash/Nagad/Cards
              </span>
            </div>
          </div>

          {/* Audit 3 */}
          <div className="bg-surface rounded-2xl p-space-lg shadow-sm border border-surface-border/60 hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-space-sm mb-space-sm">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[24px]">folder_special</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-outline font-semibold">
                      ৩. কাগজপত্র ও কমপ্লায়েন্স
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                      Documentation Readiness
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-warning-amber">
                  {[...Array(4)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                  <span className="material-symbols-outlined text-[20px] text-surface-container-highest">
                    star
                  </span>
                  <span className="font-label-md text-label-md font-bold text-deep-navy ml-1">৪.০ / ৫</span>
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                ট্রেড লাইসেন্স ও জাতীয় পরিচয়পত্র যুক্ত আছে; TIN সার্টিফিকেট এবং সাম্প্রতিক রিটার্ন জমা দিলে ক্রেডিট স্কোর ৮২০ ছাড়াবে।
              </p>
            </div>
            <div className="mt-space-md pt-space-sm bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between border border-surface-border/40">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                টিপস: TIN যোগ করে বৃদ্ধি
              </span>
              <span className="font-label-sm text-label-sm text-primary font-bold">
                +৩৫ পয়েন্ট সম্ভাব্য
              </span>
            </div>
          </div>

          {/* Audit 4 */}
          <div className="bg-surface rounded-2xl p-space-lg shadow-sm border border-surface-border/60 hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-space-sm mb-space-sm">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-growth-green">
                    <span className="material-symbols-outlined text-[24px]">price_check</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-outline font-semibold">
                      ৪. ঋণ পরিশোধের সক্ষমতা
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                      Debt Servicing Capacity
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-warning-amber">
                  {[...Array(4)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                  <span className="material-symbols-outlined text-[20px]">star_half</span>
                  <span className="font-label-md text-label-md font-bold text-deep-navy ml-1">৪.৯ / ৫</span>
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                বর্তমান লাভ ও নগদ উদ্বৃত্ত অনুযায়ী প্রতি মাসে নিয়মিত ৳১৫,০০০ কিস্তি পরিশোধ করা অনায়াসেই সম্ভব। ডিফল্ট ঝুঁকি নিম্নতম।
              </p>
            </div>
            <div className="mt-space-md pt-space-sm bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between border border-surface-border/40">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                ঋণ কভারেজ রেশিও (DSCR)
              </span>
              <span className="font-label-sm text-label-sm text-growth-green font-bold">
                ২.৪x (আদর্শ মান ১.৫x)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Readiness Checklist & Instant PDF Dossier */}
      <section className="w-full py-space-lg px-space-md lg:px-gutter-lg max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Checklist */}
          <div className="lg:col-span-7 bg-surface rounded-2xl p-space-lg shadow-sm border border-surface-border">
            <div className="flex items-center justify-between mb-space-md">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                  ব্যাংক রেডিনেস চেকলিস্ট
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  লোন ফাইল প্রক্রিয়াকরণের জন্য প্রয়োজনীয় প্রামাণিক উপাত্ত
                </p>
              </div>
              <span className="font-label-md text-label-md px-space-sm py-space-xs bg-surface-container text-deep-navy rounded-full font-bold">
                {completedCount} / {checklist.length} সম্পন্ন
              </span>
            </div>

            <div className="space-y-space-sm">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`flex items-start gap-space-sm p-space-sm rounded-xl cursor-pointer transition-all border ${
                    item.status
                      ? "bg-surface-container-low border-surface-border/60 hover:bg-surface-container"
                      : "bg-amber-50/60 border-amber-200"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[22px] shrink-0 mt-0.5 ${
                      item.status ? "text-growth-green" : "text-warning-amber"
                    }`}
                    style={item.status ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {item.status ? "check_circle" : "pending"}
                  </span>
                  <div className="flex-1">
                    <span className="font-label-lg text-label-lg text-deep-navy block font-semibold">
                      {item.title}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{item.desc}</span>
                  </div>
                  <span
                    className={`font-label-sm text-label-sm px-space-xs py-0.5 rounded shadow-xs shrink-0 font-bold ${
                      item.status ? "bg-surface text-growth-green" : "bg-warning-amber/20 text-warning-amber"
                    }`}
                  >
                    {item.status ? "যাচাইকৃত" : "অসম্পূর্ণ"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dossier Download & Apply Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-surface to-surface-container rounded-2xl p-space-lg shadow-sm border border-surface-border flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-space-xs text-primary mb-space-xs">
                <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
                <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider">
                  ইনস্ট্যান্ট ডসিয়ার প্রস্তুত
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                ব্যাংক-গ্রেড ক্রেডিট ফাইল
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                কাগজের ঝামেলাহীন ও শতভাগ স্বচ্ছ নথি। এই ফাইলটি ব্র্যাক ব্যাংক, সিটি ব্যাংক অথবা যেকোনো CMSME ঋণদাতা আর্থিক প্রতিষ্ঠানে সরাসরি গ্রহণযোগ্য।
              </p>

              {/* PDF File Mock */}
              <div className="my-space-md p-space-sm bg-surface rounded-xl flex items-center justify-between shadow-sm border border-surface-border/60">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-danger-rose/10 text-danger-rose flex items-center justify-center font-bold font-label-md text-label-md">
                    PDF
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-deep-navy font-bold">
                      ArthoPilot_Credit_Dossier_Nusrat.pdf
                    </span>
                    <span className="font-body-sm text-body-sm text-outline">
                      ১৮ পাতা • সিল্ড ডিজিটাল ক্রিপ্টো-স্বাক্ষরযুক্ত
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline">lock</span>
              </div>
            </div>

            <div className="flex flex-col gap-space-sm mt-space-md">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full flex items-center justify-center gap-space-xs py-space-sm px-space-md bg-deep-navy text-on-secondary rounded-xl font-label-lg text-label-lg hover:bg-opacity-95 transition-all shadow-md active:scale-95"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">download</span>
                <span>
                  {isDownloading ? "ডাউনলোড হচ্ছে..." : "Generate Bank-Ready PDF Dossier (ডাউনলোড)"}
                </span>
              </button>

              <button
                onClick={handleApply}
                disabled={isApplying}
                className="w-full flex items-center justify-center gap-space-xs py-space-sm px-space-md bg-vibrant-teal text-surface rounded-xl font-label-lg text-label-lg hover:bg-primary transition-all shadow-[0_2px_10px_rgba(0,166,166,0.3)] active:scale-95 font-bold"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
                <span>
                  {isApplying ? "আবেদন জমা হচ্ছে..." : "Apply for 9% CMSME Micro Loan (আবেদন করুন)"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Security Guarantee Banner */}
      <div className="w-full py-space-md px-space-md lg:px-gutter-lg max-w-7xl mx-auto">
        <div className="bg-surface-container-low rounded-2xl p-space-md flex flex-col md:flex-row items-center justify-between gap-space-md border border-surface-border">
          <div className="flex items-center gap-space-md">
            <span className="material-symbols-outlined text-vibrant-teal text-[32px]">shield_person</span>
            <div>
              <h4 className="font-label-lg text-label-lg text-deep-navy font-bold">
                ব্যাংকিং ডাটা গোপনীয়তা ও সুরক্ষা গ্যারান্টি
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                আপনার ব্যবসায়িক হিসাব শুধুমাত্র আপনার অনুমোদনেই লোন যাচাইয়ের জন্য ব্যাংকের সাথে শেয়ার করা হয়। কোনো তৃতীয় পক্ষের প্রবেশাধিকার নেই।
              </p>
            </div>
          </div>
          <Link
            className="font-label-sm text-label-sm text-primary font-bold hover:underline shrink-0"
            href="/fraud"
          >
            নিরাপত্তা নীতি জানুন →
          </Link>
        </div>
      </div>
    </div>
  );
}
