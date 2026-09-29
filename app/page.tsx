"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function LandingPage() {
  const { openVoiceModal, todaySales, netProfit, language } = useApp();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeDay, setActiveDay] = useState("শুক্র");

  const weeklyData = [
    { day: "শনি", height: 40, sales: "৳৮,২০০" },
    { day: "রবি", height: 50, sales: "৳১০,৫০০" },
    { day: "সোম", height: 35, sales: "৳৭,১০০" },
    { day: "মঙ্গল", height: 60, sales: "৳১২,৩০০" },
    { day: "বুধ", height: 45, sales: "৳৯,৪০০" },
    { day: "বৃহস্পতি", height: 65, sales: "৳১৩,৮০০" },
    { day: "শুক্র", height: 70, sales: "৳২২,৫০০" },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-bg-canvas py-space-xl lg:py-margin-lg">
        {/* Ambient luminous background accents */}
        <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-primary-container/15 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-24 w-[30rem] h-[30rem] rounded-full bg-secondary-container/30 blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-7xl mx-auto px-gutter lg:px-gutter-lg relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            {/* Left Hero Content (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-space-md">
              {/* Flagship Badge */}
              <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface shadow-sm border border-surface-border/60">
                <span className="text-base leading-none">🇧🇩</span>
                <span className="font-label-sm text-label-sm text-deep-navy font-semibold">
                  বাংলাদেশের প্রথম বাংলা এআই ফিনান্সিয়াল সাথী • Bangla-First AI Financial Companion
                </span>
              </div>

              {/* Kicker & Headline */}
              <div className="space-y-space-xs">
                <p className="font-title-md text-title-md text-primary font-bold tracking-tight">
                  আপনার ব্যবসার নির্ভরযোগ্য ডিজিটাল হিসাবরক্ষক
                </p>
                <h1 className="font-display-lg text-display-lg text-deep-navy font-bold leading-tight">
                  Your Bangla AI <br className="hidden sm:inline" />
                  Financial Companion
                </h1>
              </div>

              {/* Subtitle */}
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                Helping small entrepreneurs record, protect, and grow their businesses through intuitive
                voice, smart fraud detection, and automated financial visibility.
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-wrap items-center gap-space-md pt-space-xs w-full sm:w-auto">
                <Link
                  href="/dashboard"
                  className="h-12 px-space-lg rounded-xl bg-vibrant-teal hover:bg-primary text-on-primary font-label-lg text-label-lg font-semibold flex items-center justify-center gap-space-xs shadow-md transition-all active:scale-[0.98]"
                >
                  <span>বিনা খরচে শুরু করুন</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </Link>

                <button
                  type="button"
                  onClick={openVoiceModal}
                  className="h-12 px-space-lg rounded-xl bg-surface hover:bg-surface-container-low text-deep-navy font-label-lg text-label-lg font-semibold flex items-center justify-center gap-space-xs shadow-sm transition-all border border-surface-border/80"
                >
                  <span
                    className="material-symbols-outlined text-vibrant-teal text-[22px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_circle
                  </span>
                  <span>Try Live Voice Demo</span>
                </button>
              </div>

              {/* Trust Badges Under Hero */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm pt-space-md w-full">
                <div className="p-space-sm rounded-xl bg-surface shadow-sm border border-surface-border/40 flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-vibrant-teal text-[20px]">storefront</span>
                  <span className="font-label-md text-label-md text-deep-navy font-bold">
                    ৫০,০০০+ ব্যবসায়ী
                  </span>
                </div>
                <div className="p-space-sm rounded-xl bg-surface shadow-sm border border-surface-border/40 flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-vibrant-teal text-[20px]">mic</span>
                  <span className="font-label-md text-label-md text-deep-navy font-bold">
                    বাংলায় ভয়েস
                  </span>
                </div>
                <div className="p-space-sm rounded-xl bg-surface shadow-sm border border-surface-border/40 flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-growth-green text-[20px]">check_circle</span>
                  <span className="font-label-md text-label-md text-deep-navy font-bold">
                    বিকাশ / নগদ রেডি
                  </span>
                </div>
                <div className="p-space-sm rounded-xl bg-surface shadow-sm border border-surface-border/40 flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
                  <span className="font-label-md text-label-md text-deep-navy font-bold">
                    ১০০% সুরক্ষিত ডেটা
                  </span>
                </div>
              </div>
            </div>

            {/* Right Hero Interactive Showcase Mockup (5 cols) */}
            <div className="lg:col-span-5 relative w-full flex justify-center">
              <div className="w-full max-w-md bg-surface rounded-2xl p-space-md shadow-2xl border border-surface-border relative z-10 space-y-space-md hover:shadow-cyan-100/50 transition-shadow">
                {/* Merchant Profile Ribbon */}
                <div className="flex items-center justify-between bg-surface-container-low p-space-sm rounded-xl">
                  <div className="flex items-center gap-space-sm">
                    <img
                      className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-primary/20"
                      alt="Nusrat Jahan"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPVyus1mj1j-i3QD9SrfACSS2B6ggaEKoZ5EkNuR38dmlWeQrMyX-uX7QaL-hRSDhjoMJYCKXa53wz2iXiMHVxTwTYVeTOM_owJv2JOpWXVIfwaXuY_OH-i0gO-zjIgA3OcmX7F3-OYdUmq8G13bCjkxY1ZrSYy7LTTwDcNSnTOyUPTk67PnCuolCiVNzdkQqK2UjgXzMyW2kua8leb5kaGt62zV0diSWn-xZXGZEcPpbP5ZRWwtXv"
                    />
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-deep-navy font-bold text-base leading-none">
                        নুসরাত জাহান
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        সুমিস ক্রাফট অ্যান্ড জামদানি, মিরপুর
                      </span>
                    </div>
                  </div>
                  <span className="px-space-sm py-space-xs rounded-full bg-tertiary-fixed/30 text-on-tertiary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-growth-green animate-pulse"></span>
                    লাইভ হিসাব
                  </span>
                </div>

                {/* Speech Audio Simulated Bubble with Pulse */}
                <div
                  onClick={openVoiceModal}
                  className="p-space-md rounded-xl bg-surface-container shadow-sm space-y-space-xs relative overflow-hidden cursor-pointer hover:border-vibrant-teal border border-transparent transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-vibrant-teal font-semibold flex items-center gap-space-xs">
                      <span className="w-2 h-2 rounded-full bg-vibrant-teal animate-ping"></span>
                      ভয়েস রেকর্ডিং (Bangla Natural Language)
                    </span>
                    <span className="material-symbols-outlined text-vibrant-teal text-[18px]">
                      graphic_eq
                    </span>
                  </div>
                  <div className="p-space-sm rounded-lg bg-surface flex items-center gap-space-sm">
                    <span className="w-8 h-8 rounded-full bg-vibrant-teal text-on-primary flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">mic</span>
                    </span>
                    <p className="font-headline-sm text-headline-sm text-deep-navy text-[16px] font-bold">
                      “আজ ১২,৫০০ টাকা বিক্রি হয়েছে, সুতা বাবদ খরচ ৩,২০০ টাকা।”
                    </p>
                  </div>
                </div>

                {/* Real-time AI Extraction / Parsing Engine */}
                <div className="space-y-space-xs">
                  <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                    <span className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-vibrant-teal text-[16px]">
                        auto_awesome
                      </span>
                      অর্থপাইলট অটোপার্সিং কমপ্লিট
                    </span>
                    <span className="text-growth-green font-semibold">কনফার্মড • ০.৩ সেকেন্ড</span>
                  </div>

                  <div className="grid grid-cols-2 gap-space-sm">
                    {/* Card 1 */}
                    <div className="p-space-sm rounded-xl bg-surface-container-low shadow-sm">
                      <span className="font-body-sm text-body-sm text-on-surface-variant block">
                        মোট আয় (Revenue)
                      </span>
                      <div className="flex items-baseline gap-space-xs mt-1">
                        <span className="font-headline-md text-headline-md text-growth-green font-bold">
                          ৳ {todaySales.toLocaleString()}
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant mt-1 block">
                        ক্রেডিট: নগদ + বিকাশ
                      </span>
                    </div>

                    {/* Card 2 */}
                    <div className="p-space-sm rounded-xl bg-surface-container-low shadow-sm">
                      <span className="font-body-sm text-body-sm text-on-surface-variant block">
                        কাঁচামাল খরচ (Expense)
                      </span>
                      <div className="flex items-baseline gap-space-xs mt-1">
                        <span className="font-headline-md text-headline-md text-danger-rose font-bold">
                          ৳ ৩,২০০
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant mt-1 block">
                        ডেবিট: ক্যাশ ড্রয়ার
                      </span>
                    </div>
                  </div>

                  {/* Computed Ledger Balance Row */}
                  <div className="p-space-sm rounded-xl bg-deep-navy text-on-primary shadow-sm flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm text-secondary-fixed block">
                        আজকের নিট ক্যাশ ইনফ্লো
                      </span>
                      <span className="font-headline-md text-headline-md font-bold text-primary-fixed">
                        ৳ ৯,৩০০.০০
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-label-sm text-label-sm text-tertiary-fixed block">লেজার সিঙ্ক</span>
                      <span className="font-label-md text-label-md font-bold text-on-primary">
                        অটো ডাবল-এন্ট্রি
                      </span>
                    </div>
                  </div>
                </div>

                {/* Micro Interactive CTA */}
                <div className="flex items-center justify-between pt-space-xs">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    স্বয়ংক্রিয় ভাউচার আইডি: #AP-29831
                  </span>
                  <Link
                    href="/dashboard"
                    className="px-space-sm py-space-xs bg-surface-container hover:bg-surface-container-high text-deep-navy font-label-sm text-label-sm rounded-lg font-semibold flex items-center gap-space-xs transition-colors"
                  >
                    <span>রসিদ দেখুন</span>
                    <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: PROBLEM DIAGNOSIS */}
      <section className="w-full py-space-xl lg:py-margin-md bg-surface border-y border-surface-border/50">
        <div className="w-full max-w-7xl mx-auto px-gutter lg:px-gutter-lg">
          <div className="max-w-3xl mb-space-xl">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-error-container/40 text-on-error-container font-label-sm text-label-sm font-semibold mb-space-xs">
              বাস্তব সংকট • Real Ground Reality
            </div>
            <h2 className="font-headline-lg text-headline-lg text-deep-navy font-bold leading-tight">
              The Unbanked &amp; Financially Invisible Dilemma in Bangladesh
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
              প্রতিদিন কোটি কোটি টাকার লেনদেন হচ্ছে অথচ দেশের ১ কোটি ৩০ লাখের বেশি মাইক্রো-উদ্যোক্তা
              আর্থিক ব্যবস্থার বাইরে থেকে যাচ্ছেন।
            </p>
          </div>

          {/* Problem Cards Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {/* Card 1 */}
            <div className="bg-surface-container-low rounded-2xl p-space-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-surface-border/40">
              <div>
                <div className="w-12 h-12 rounded-xl bg-error-container text-on-error-container flex items-center justify-center mb-space-md shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">menu_book</span>
                </div>
                <span className="font-label-sm text-label-sm text-danger-rose font-bold uppercase tracking-wider block mb-space-xs">
                  ০১. অ্যানালগ খাতা
                </span>
                <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold mb-space-xs">
                  Paper Tally Books &amp; Lost Records
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  খাতার হিসাব ভিজে নষ্ট হয়, বাকি লেখার খাতা হারিয়ে যায় এবং প্রতিদিন রাতে ক্লান্ত শরীরে ঘণ্টা
                  ধরে হিসাব মেলাতে গিয়ে সময় অপচয় হয়।
                </p>
              </div>
              <div className="mt-space-md p-space-sm rounded-xl bg-surface shadow-sm">
                <span className="font-label-sm text-label-sm text-danger-rose font-semibold flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px]">priority_high</span>
                  বছরে গড়ে ১৮% হিসাব গরমিল বা নিখোঁজ
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-surface-container-low rounded-2xl p-space-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-surface-border/40">
              <div>
                <div className="w-12 h-12 rounded-xl bg-warning-amber/20 text-warning-amber flex items-center justify-center mb-space-md shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">phonelink_erase</span>
                </div>
                <span className="font-label-sm text-label-sm text-warning-amber font-bold uppercase tracking-wider block mb-space-xs">
                  ০২. জালিয়াতির ফাঁদ
                </span>
                <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold mb-space-xs">
                  SMS Phishing &amp; Payment Fraud
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  নকল বিকাশ/নগদ এসএমএস দেখিয়ে পণ্য নিয়ে যাওয়া এবং গ্রাহকদের ভুয়া কিউআর পেমেন্ট প্রতারণায়
                  দোকানদাররা আর্থিক ক্ষতির শিকার হচ্ছেন।
                </p>
              </div>
              <div className="mt-space-md p-space-sm rounded-xl bg-surface shadow-sm">
                <span className="font-label-sm text-label-sm text-warning-amber font-semibold flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px]">gpp_maybe</span>
                  ৩৫%+ ক্ষুদ্র ব্যবসায়ী একবার হলেও প্রতারিত
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-surface-container-low rounded-2xl p-space-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-surface-border/40">
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-space-md shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">money_off</span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider block mb-space-xs">
                  ০৩. ঋণ প্রত্যাখ্যান
                </span>
                <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold mb-space-xs">
                  Inability to Access Bank Loans
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  আনুষ্ঠানিক আর্থিক রিপোর্টের অভাবে ব্যাংক ও এনজিও থেকে ঋণ না পেয়ে মহাজনের চড়া সুদে ব্যবসা
                  জিম্মি হয়ে পড়ে।
                </p>
              </div>
              <div className="mt-space-md p-space-sm rounded-xl bg-surface shadow-sm">
                <span className="font-label-sm text-label-sm text-deep-navy font-semibold flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px]">visibility_off</span>
                  ক্রেডিট স্কোর না থাকায় ৯১% ব্যাংক লোন বাতিল
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SOLUTION ARCHITECTURE */}
      <section className="w-full py-space-xl lg:py-margin-md bg-surface-container-low">
        <div className="w-full max-w-7xl mx-auto px-gutter lg:px-gutter-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            {/* Text details */}
            <div className="lg:col-span-6 space-y-space-md">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-vibrant-teal/10 text-primary font-label-sm text-label-sm font-semibold">
                উদ্ভাবনী সমাধান • Groundbreaking Solution
              </div>
              <h2 className="font-headline-lg text-headline-lg text-deep-navy font-bold leading-tight">
                Voice-First Simplicity Meets Fintech Power
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                কোনো জটিল অ্যাকাউন্টিং জ্ঞান ছাড়াই ব্যবসা পরিচালনা করুন। আপনার মুখের স্বাভাবিক ভাষাকে
                তাৎক্ষণিক ব্যাংকিং-গ্রেড আর্থিক ডেটায় রূপান্তর করে অর্থপাইলট।
              </p>

              <div className="space-y-space-sm pt-space-xs">
                {/* Feature Item 1 */}
                <div className="p-space-md rounded-xl bg-surface shadow-sm flex items-start gap-space-md">
                  <div className="w-10 h-10 rounded-lg bg-vibrant-teal/15 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px]">translate</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-[18px] text-deep-navy font-bold">
                      আঞ্চলিক ভাষায় স্পষ্ট হিসাব
                    </h4>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                      প্রমিত বাংলার পাশাপাশি সিলেটি, চাটগাঁইয়া বা আঞ্চলিক উচ্চারণে কথা বললেও এআই নিখুঁতভাবে
                      পণ্য ও টাকার পরিমাণ বুঝে নেয়।
                    </p>
                  </div>
                </div>

                {/* Feature Item 2 */}
                <div className="p-space-md rounded-xl bg-surface shadow-sm flex items-start gap-space-md">
                  <div className="w-10 h-10 rounded-lg bg-growth-green/15 text-growth-green flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px]">account_tree</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-[18px] text-deep-navy font-bold">
                      অটোমেটিক ডাবল-এন্ট্রি লেজার
                    </h4>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                      ডেবিট ও ক্রেডিট সম্পর্কে না জেনেও আন্তর্জাতিক অ্যাকাউন্টিং ফরম্যাটে স্বয়ংক্রিয় খতিয়ান ও
                      লাভ-ক্ষতির হিসাব তৈরি হয়।
                    </p>
                  </div>
                </div>

                {/* Feature Item 3 */}
                <div className="p-space-md rounded-xl bg-surface shadow-sm flex items-start gap-space-md">
                  <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px]">sim_card_download</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-[18px] text-deep-navy font-bold">
                      এক ক্লিকে ব্যাংক ও এমএফআই রিপোর্ট
                    </h4>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                      ব্র্যাক, আশা বা যেকোনো বাণিজ্যিক ব্যাংকে জমা দেওয়ার মতো ভেরিফায়েড পিঅ্যান্ডএল (P&amp;L) ও
                      ক্যাশ-ফ্লো পিডিএফ স্টেটমেন্ট জেনারেট করুন।
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual demonstration card with photo & SVG metric */}
            <div className="lg:col-span-6 relative">
              <div className="relative bg-surface rounded-2xl p-space-md shadow-xl overflow-hidden border border-surface-border">
                <div className="relative h-64 rounded-xl overflow-hidden mb-space-md">
                  <img
                    className="w-full h-full object-cover"
                    alt="Young Bangladeshi grocery store owner"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEeO5Deztv-n2d1ZfSsAfTaGlS0mU290rA0l4c2DVlxkgf-x-m1SPKGVyGgtRC9Tu6ZmbJ0mLdFeOVujo4HhUHP1Fx4MXNSBsYOKYxpxCNZYZ_qoAsx9rZ1RGpTtM9Jcqv5XlleCd7ufOEBdU2Ck9vZvRrLmZ0za7OwWCKSrqfI30Ed3HcmTW4PLZxhobM4bXL5XVFwixIg_Gmzfa0xW55j9f22rDzsOOgqkl3YfgL3Ok0gBP1nVyz"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 via-transparent to-transparent flex items-end p-space-md">
                    <div className="text-on-primary">
                      <span className="px-space-xs py-0.5 rounded bg-vibrant-teal text-white font-label-sm text-label-sm font-bold">
                        ভয়েস রেকর্ডিং চলমান
                      </span>
                      <p className="font-headline-sm text-headline-sm text-white font-bold mt-1">
                        “মোল্লা স্টোর থেকে ১০ বস্তা চাল নিলাম বাকিতে।”
                      </p>
                    </div>
                  </div>
                </div>

                {/* Weekly Cash Flow Snapshot */}
                <div className="bg-surface-container-low p-space-md rounded-xl space-y-space-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        সাপ্তাহিক ক্যাশ ফ্লো ডায়াগ্রাম
                      </span>
                      <p className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                        ৳ ৮৪,৩৫০ <span className="font-label-sm text-label-sm text-growth-green font-semibold">+১৮.২%</span>
                      </p>
                    </div>
                    <span className="p-space-xs bg-surface rounded-lg text-primary shadow-sm font-label-sm text-label-sm font-semibold">
                      বিগত ৭ দিন
                    </span>
                  </div>

                  {/* Interactive Bar visualization */}
                  <div className="flex items-end justify-between gap-2 h-24 pt-4 px-2">
                    {weeklyData.map((d) => (
                      <button
                        key={d.day}
                        onClick={() => setActiveDay(d.day)}
                        className="flex-1 flex flex-col items-center gap-1 group focus:outline-none"
                      >
                        <div
                          className={`w-full rounded-t transition-all duration-300 ${
                            activeDay === d.day
                              ? "bg-vibrant-teal shadow-md"
                              : "bg-secondary-container hover:bg-primary-container"
                          }`}
                          style={{ height: `${d.height}px` }}
                        ></div>
                        <span
                          className={`text-xs font-semibold ${
                            activeDay === d.day ? "text-deep-navy font-bold" : "text-on-surface-variant"
                          }`}
                        >
                          {d.day}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-surface-border text-on-surface-variant">
                    <span>নির্বাচিত দিন: <strong className="text-deep-navy font-bold">{activeDay}</strong></span>
                    <span>বিক্রি: <strong className="text-growth-green font-bold">{weeklyData.find(d => d.day === activeDay)?.sales}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: AI AGENTS ECOSYSTEM PREVIEW */}
      <section className="w-full py-space-xl lg:py-margin-md bg-surface">
        <div className="w-full max-w-7xl mx-auto px-gutter lg:px-gutter-lg">
          <div className="text-center max-w-2xl mx-auto mb-space-xl">
            <span className="px-space-sm py-space-xs rounded-full bg-surface-container text-deep-navy font-label-sm text-label-sm font-bold">
              বিশেষজ্ঞ এআই টিম • 4 Specialized Agents
            </span>
            <h2 className="font-headline-lg text-headline-lg text-deep-navy font-bold mt-space-xs">
              আপনার ব্যবসার চার স্তম্ভ: এআই এজেন্ট স্যুট
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
              প্রতিটি এজেন্ট আপনার আর্থিক সুরক্ষার একটি নির্দিষ্ট ক্ষেত্রে ২৪/৭ নিরবচ্ছিন্নভাবে কাজ করে।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {/* Agent 1: Hishab */}
            <Link
              href="/agents"
              className="bg-surface-container-low rounded-2xl p-space-md shadow-sm hover:shadow-lg transition-all flex flex-col justify-between border border-surface-border/50 group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-vibrant-teal text-on-primary flex items-center justify-center mb-space-md shadow-sm group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[26px]">calculate</span>
                </div>
                <div className="flex items-center justify-between mb-space-xs">
                  <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                    হিসাব (Hishab)
                  </h3>
                  <span className="px-space-xs py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-bold">
                    Bookkeeper
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  মুখে বলা কথা, রসিদের ছবি বা চিরকুট থেকে সেকেন্ডে স্বয়ংক্রিয় লেজার ও ক্যাশ ডায়েরি প্রস্তুত করে।
                </p>
              </div>
              <div className="mt-space-md pt-space-sm border-t border-surface-border/50">
                <span className="font-label-sm text-label-sm text-deep-navy font-semibold flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-vibrant-teal">mic</span>
                  বাংলা ভয়েস রিকগনিশন ৯৯.২%
                </span>
              </div>
            </Link>

            {/* Agent 2: Pahara */}
            <Link
              href="/fraud"
              className="bg-surface-container-low rounded-2xl p-space-md shadow-sm hover:shadow-lg transition-all flex flex-col justify-between border border-surface-border/50 group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-deep-navy text-on-primary flex items-center justify-center mb-space-md shadow-sm group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[26px]">security</span>
                </div>
                <div className="flex items-center justify-between mb-space-xs">
                  <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                    পাহারা (Pahara)
                  </h3>
                  <span className="px-space-xs py-0.5 rounded-full bg-danger-rose/10 text-danger-rose font-label-sm text-label-sm font-bold">
                    Fraud Guard
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  ভুয়া বিকাশ ও নগদ এসএমএস স্ক্যান করে সাথে সাথে লাল সতর্কতা দেয়। জালিয়াতির হাত থেকে মূলধন বাঁচায়।
                </p>
              </div>
              <div className="mt-space-md pt-space-sm border-t border-surface-border/50">
                <span className="font-label-sm text-label-sm text-deep-navy font-semibold flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-growth-green">verified</span>
                  ফেক এসএমএস ডিটেকশন ১০০%
                </span>
              </div>
            </Link>

            {/* Agent 3: Niyom */}
            <Link
              href="/agents"
              className="bg-surface-container-low rounded-2xl p-space-md shadow-sm hover:shadow-lg transition-all flex flex-col justify-between border border-surface-border/50 group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary text-on-primary flex items-center justify-center mb-space-md shadow-sm group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[26px]">gavel</span>
                </div>
                <div className="flex items-center justify-between mb-space-xs">
                  <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                    নিয়ম (Niyom)
                  </h3>
                  <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                    Compliance
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  ট্রেড লাইসেন্স নবায়ন, ট্যাক্স রিটার্ন ও ভ্যাট নীতি সহজ ভাষায় বুঝিয়ে দেয় এবং সময়মতো তাগাদা দেয়।
                </p>
              </div>
              <div className="mt-space-md pt-space-sm border-t border-surface-border/50">
                <span className="font-label-sm text-label-sm text-deep-navy font-semibold flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
                  স্বয়ংক্রিয় রিমাইন্ডার সিস্টেম
                </span>
              </div>
            </Link>

            {/* Agent 4: Unnoti */}
            <Link
              href="/profile"
              className="bg-surface-container-low rounded-2xl p-space-md shadow-sm hover:shadow-lg transition-all flex flex-col justify-between border border-surface-border/50 group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-growth-green text-on-primary flex items-center justify-center mb-space-md shadow-sm group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[26px]">trending_up</span>
                </div>
                <div className="flex items-center justify-between mb-space-xs">
                  <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                    উন্নতি (Unnoti)
                  </h3>
                  <span className="px-space-xs py-0.5 rounded-full bg-tertiary-fixed/40 text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold">
                    Growth
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  বাকি আদায়ের তাগাদা নোটিফিকেশন পাঠায় এবং ব্যাংকের ক্ষুদ্রঋণ পাওয়ার সম্ভাবনা স্কোর বিশ্লেষণ করে।
                </p>
              </div>
              <div className="mt-space-md pt-space-sm border-t border-surface-border/50">
                <span className="font-label-sm text-label-sm text-deep-navy font-semibold flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-growth-green">credit_score</span>
                  ক্রেডিট রেডিনেস স্কোরিং
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: SOCIAL IMPACT METRICS */}
      <section className="w-full py-space-xl bg-deep-navy text-on-primary relative overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-gutter lg:px-gutter-lg relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider font-semibold">
                আর্থিক অন্তর্ভুক্তি ও রূপান্তর
              </span>
              <h2 className="font-headline-lg text-headline-lg text-white font-bold mt-space-xs">
                কাগজের হিসাব থেকে জাতীয় অর্থনীতিতে অন্তর্ভুক্তি
              </h2>
            </div>
            <p className="font-body-md text-body-md text-surface-container max-w-md">
              অর্থপাইলট তৃণমূল ব্যবসায়ীদের ডিজিটাল পরিচিতি গড়ে তুলছে যা টেকসই ব্যাংকিং সংযোগ ও অর্থনৈতিক
              নিরাপত্তা নিশ্চিত করে।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            <div className="p-space-lg rounded-2xl bg-surface/10 backdrop-blur-md border border-white/10 hover:bg-surface/15 transition-colors">
              <span className="font-headline-lg text-headline-lg font-bold text-primary-fixed block leading-none mb-space-xs">
                ৳১৪.২ কোটি+
              </span>
              <span className="font-title-md text-title-md text-white font-semibold block mb-1">
                লেনদেন রেকর্ড
              </span>
              <p className="font-body-sm text-body-sm text-surface-container-high">
                স্বল্প আয়ের উদ্যোক্তাদের নথিভুক্ত প্রকৃত বিক্রয় ও ক্রয়মূল্য।
              </p>
            </div>

            <div className="p-space-lg rounded-2xl bg-surface/10 backdrop-blur-md border border-white/10 hover:bg-surface/15 transition-colors">
              <span className="font-headline-lg text-headline-lg font-bold text-tertiary-fixed block leading-none mb-space-xs">
                ৬৮%
              </span>
              <span className="font-title-md text-title-md text-white font-semibold block mb-1">
                নারী উদ্যোক্তা
              </span>
              <p className="font-body-sm text-body-sm text-surface-container-high">
                ঘরে বসে বুটিক, কুটিরশিল্প ও খাবারের ব্যবসা পরিচালনাকারী নারী।
              </p>
            </div>

            <div className="p-space-lg rounded-2xl bg-surface/10 backdrop-blur-md border border-white/10 hover:bg-surface/15 transition-colors">
              <span className="font-headline-lg text-headline-lg font-bold text-primary-fixed-dim block leading-none mb-space-xs">
                ৯৯.৪%
              </span>
              <span className="font-title-md text-title-md text-white font-semibold block mb-1">
                প্রতারণা প্রতিরোধ
              </span>
              <p className="font-body-sm text-body-sm text-surface-container-high">
                পাহারা এজেন্টের সহায়তায় ভুয়া পেমেন্ট মেসেজ শনাক্তকরণ হার।
              </p>
            </div>

            <div className="p-space-lg rounded-2xl bg-surface/10 backdrop-blur-md border border-white/10 hover:bg-surface/15 transition-colors">
              <span className="font-headline-lg text-headline-lg font-bold text-tertiary-fixed block leading-none mb-space-xs">
                ৪.২ গুণ
              </span>
              <span className="font-title-md text-title-md text-white font-semibold block mb-1">
                ঋণ অনুমোদন বৃদ্ধি
              </span>
              <p className="font-body-sm text-body-sm text-surface-container-high">
                সুনির্দিষ্ট খতিয়ান পেশ করার মাধ্যমে দ্রুত মাইক্রোলোন প্রাপ্তি।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="w-full py-space-xl lg:py-margin-md bg-surface">
        <div className="w-full max-w-7xl mx-auto px-gutter lg:px-gutter-lg">
          <div className="text-center max-w-2xl mx-auto mb-space-xl">
            <span className="px-space-sm py-space-xs rounded-full bg-vibrant-teal/10 text-primary font-label-sm text-label-sm font-bold">
              ব্যবহার পদ্ধতি • 3 Easy Steps
            </span>
            <h2 className="font-headline-lg text-headline-lg text-deep-navy font-bold mt-space-xs">
              মাত্র তিন ধাপে আপনার ব্যবসার পূর্ণ নিয়ন্ত্রণ
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
              অ্যাপ চালানো শেখার কোনো ঝামেলা নেই। প্রতিদিনের কথা বলার মতোই সহজ ও স্বাভাবিক।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg relative">
            {/* Step 1 */}
            <div className="bg-surface-container-low rounded-2xl p-space-lg shadow-sm flex flex-col justify-between border border-surface-border/50">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="w-12 h-12 rounded-xl bg-deep-navy text-on-primary font-headline-sm text-headline-sm font-bold flex items-center justify-center shadow-sm">
                    ১
                  </span>
                  <span className="material-symbols-outlined text-vibrant-teal text-[28px]">mic_none</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold mb-space-xs">
                  মুখে বলুন বা ভাউচারের ছবি তুলুন
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  “বটতলার রফিকের কাছে ৭৫০ টাকার বাকি দিলাম”—মাইক্রোফোন চেপে সাধারণ ভাষায় বলুন অথবা ক্রেতার
                  মেমো ও পণ্যের চালানের ছবি তুলুন।
                </p>
              </div>
              <div className="mt-space-md pt-space-sm bg-surface p-space-sm rounded-xl shadow-sm">
                <span className="font-label-sm text-label-sm text-primary font-semibold flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
                  ভয়েস ও ইমেজ অটো-স্ক্যান
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-surface-container-low rounded-2xl p-space-lg shadow-sm flex flex-col justify-between border border-surface-border/50">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="w-12 h-12 rounded-xl bg-vibrant-teal text-on-primary font-headline-sm text-headline-sm font-bold flex items-center justify-center shadow-sm">
                    ২
                  </span>
                  <span className="material-symbols-outlined text-vibrant-teal text-[28px]">hub</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold mb-space-xs">
                  এআই খতিয়ান তৈরি ও যাচাই করে
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  অর্থপাইলট কথাটি শুনে নিজে থেকেই বাকি বা নগদ হিসেবে ক্যাটাগরি সাজায় এবং কোনো অসংগতি বা
                  জালিয়াতি থাকলে সাথে সাথে সাবধান করে।
                </p>
              </div>
              <div className="mt-space-md pt-space-sm bg-surface p-space-sm rounded-xl shadow-sm">
                <span className="font-label-sm text-label-sm text-growth-green font-semibold flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px]">bolt</span>
                  তাৎক্ষণিক লাইভ ব্যালেন্স আপডেট
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-surface-container-low rounded-2xl p-space-lg shadow-sm flex flex-col justify-between border border-surface-border/50">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="w-12 h-12 rounded-xl bg-growth-green text-on-primary font-headline-sm text-headline-sm font-bold flex items-center justify-center shadow-sm">
                    ৩
                  </span>
                  <span className="material-symbols-outlined text-growth-green text-[28px]">approval</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold mb-space-xs">
                  ক্রেডিট ভিজিবিলিটি ও মূলধন নিশ্চিত
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  প্রতি মাসের ভেরিফায়েড স্টেটমেন্ট নিয়ে ব্যাংকে আবেদন করুন। আপনার পরিশ্রমের নিখুঁত রেকর্ডই
                  হবে আপনার ঋণের নিশ্চয়তা।
                </p>
              </div>
              <div className="mt-space-md pt-space-sm bg-surface p-space-sm rounded-xl shadow-sm">
                <span className="font-label-sm text-label-sm text-deep-navy font-semibold flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px]">account_balance</span>
                  সহজ শর্তে এসএমই ঋণ পাওয়ার সুযোগ
                </span>
              </div>
            </div>
          </div>

          {/* Action Banner at bottom of Landing */}
          <div className="mt-space-xl p-space-lg lg:p-space-xl rounded-2xl bg-gradient-to-r from-deep-navy via-deep-navy to-primary text-on-primary flex flex-col lg:flex-row items-center justify-between gap-space-md shadow-2xl">
            <div className="space-y-space-xs text-center lg:text-left">
              <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider font-semibold">
                আজই যুক্ত হোন
              </span>
              <h3 className="font-headline-lg text-headline-lg text-white font-bold">
                আপনার ব্যবসাকে সুরক্ষিত ও সম্প্রসারিত করতে প্রস্তুত?
              </h3>
              <p className="font-body-md text-body-md text-surface-container max-w-xl">
                কোনো মাসিক চার্জ নেই। ফ্রি রেজিস্ট্রেশন করে আজই পরীক্ষা করুন দেশের সেরা বাংলা এআই হিসাবরক্ষক।
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-space-sm w-full lg:w-auto">
              <Link
                href="/dashboard"
                className="h-12 px-space-lg rounded-xl bg-vibrant-teal hover:bg-white hover:text-deep-navy text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs shadow-md transition-all text-center"
              >
                <span>ফ্রি একাউন্ট খুলুন</span>
                <span className="material-symbols-outlined text-[20px]">person_add</span>
              </Link>
              <Link
                href="/mitra"
                className="h-12 px-space-lg rounded-xl bg-surface/15 hover:bg-surface/25 text-white font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs transition-all text-center"
              >
                <span>কমিউনিটিতে যোগ দিন</span>
                <span className="material-symbols-outlined text-[20px]">groups</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
