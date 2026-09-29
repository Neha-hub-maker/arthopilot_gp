"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function ArthoMitraPage() {
  const { showToast, language } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    shopName: "মেসার্স সুমনা ফ্যাশন ও বুটিক",
    address: "দোকান নং ১৪, ব্লক সি, বেনারসি পল্লী, মিরপুর, ঢাকা",
    phone: "০১৭৮৯-XXXXXX",
    preferredDate: "আগামীকাল (সকাল ১০:০০ - ১২:০০)",
    notes: "নতুন সুতা ও জামদানি শাড়ির ইনভেন্টরি স্টক অডিট",
  });
  const [isScheduled, setIsScheduled] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScheduled(true);
    setIsModalOpen(false);
    showToast(
      "✅ অর্থ মিত্র পরিদর্শনের আবেদন সম্পন্ন হয়েছে! অফিসার কামরুল হাসান আগামী ২৪ ঘণ্টার মধ্যে দোকানে উপস্থিত হবেন।"
    );
  };

  return (
    <div className="w-full flex flex-col">
      {/* Hero Canvas Header */}
      <div className="relative w-full overflow-hidden bg-surface py-space-xl px-gutter md:px-gutter-lg border-b border-surface-border">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-vibrant-teal/10 blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/4 -bottom-32 w-80 h-80 rounded-full bg-tertiary-fixed/20 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full flex flex-col gap-space-lg relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-xs bg-surface-container px-space-md py-space-xs rounded-full border border-surface-border">
              <span className="w-2.5 h-2.5 rounded-full bg-growth-green"></span>
              <span className="font-label-sm text-label-sm text-deep-navy font-bold uppercase tracking-wider">
                Grassroots Field Network • গ্রামীণ আস্থা
              </span>
            </div>

            <div className="flex items-center gap-space-sm bg-tertiary-fixed/30 text-on-tertiary-fixed px-space-md py-space-xs rounded-full shadow-sm border border-growth-green/30">
              <span
                className="material-symbols-outlined text-[18px] text-tertiary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="font-label-md text-label-md font-bold">
                Shop Physically Verified • শপ ভেরিফাইড (আইডি: AM-DH-402)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-end">
            <div className="lg:col-span-8 flex flex-col gap-space-sm">
              <h1 className="font-display-lg text-display-lg text-deep-navy tracking-tight font-extrabold">
                অর্থ মিত্র: এআই এবং মানুষের যৌথ আস্থার সেতুবন্ধন
              </h1>
              <p className="font-headline-sm text-headline-sm text-primary font-semibold">
                AI + Human Ground Truth Verification Layer
              </p>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl pt-space-xs">
                While ArthoPilot's AI automates daily bookkeeping and fraud checks, our grassroots “Artho Mitra”
                network provides physical store verification, human empathy, and onboarding assistance for
                first-time digital merchants.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-space-sm px-space-lg py-space-md bg-deep-navy text-on-secondary rounded-xl font-label-lg text-label-lg shadow-md hover:bg-opacity-95 transition-all active:scale-95 font-bold"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px] text-primary-fixed">
                  person_pin_circle
                </span>
                <span>
                  {isScheduled ? "পরিদর্শন শিডিউল করা হয়েছে ✓" : "Request Mitra Visit • পরিদর্শনের অনুরোধ"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Verification Dossier Content */}
      <div className="w-full px-gutter md:px-gutter-lg py-space-xl max-w-7xl mx-auto flex flex-col gap-space-xl">
        <div className="w-full bg-surface rounded-2xl shadow-md border border-surface-border p-space-lg md:p-space-xl flex flex-col gap-space-xl relative overflow-hidden">
          {/* Officer Ribbon */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-md bg-surface-container-low p-space-md rounded-2xl border border-surface-border/60">
            <div className="flex items-center gap-space-md">
              <div className="relative">
                <img
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shadow-sm ring-2 ring-primary"
                  alt="Kamrul Hasan"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzg9c5PPm69QQWcxLyYftvw56qWKo8pP1X8k_olcaFmvD9X8OS2HSM0e_u9DSJJov0eHzgzUoEEAhaArfVlO5bJnCqGMJX02SkVxN3Lvuf1e60YBoJDqkb3LxWBCVkWQJjeuHzFgsSMx_saVjbt85Ahwih4CZM01b6qqLV6-sZRP8mDlHR0PDicE5ygdnXnc3tzRQKvyau0Qw_bSUyeGnAlWVbDO-NE5xV8-Gd3Zg0YK8v3D3zoIhD"
                />
                <span className="absolute bottom-0 right-0 w-5 h-5 bg-growth-green rounded-full ring-2 ring-surface flex items-center justify-center text-on-secondary">
                  <span className="material-symbols-outlined text-[12px] text-white">check</span>
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-space-xs flex-wrap">
                  <span className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                    কামরুল হাসান • Kamrul Hasan
                  </span>
                  <span className="bg-surface px-space-xs py-0.5 rounded text-tertiary font-label-sm text-label-sm font-bold border border-surface-border">
                    Certified Officer
                  </span>
                </div>
                <span className="font-body-md text-body-md text-on-surface-variant">
                  Financial Inclusion Officer • Mirpur Hub (মিরপুর শাখা)
                </span>
                <div className="flex items-center gap-space-sm mt-space-xs text-on-surface-variant font-label-md text-label-md">
                  <div className="flex items-center text-warning-amber">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-bold ml-1 text-on-surface">4.9 / 5.0</span>
                  </div>
                  <span>•</span>
                  <span className="text-deep-navy font-semibold">৪২০+ ব্যবসা ভেরিফাইড (420+ Audited)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-space-sm">
              <a
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-space-xs px-space-md py-space-sm bg-primary text-on-primary rounded-xl font-label-md text-label-md hover:bg-opacity-90 shadow-sm transition-all font-bold"
                href="tel:+8801700000000"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>কথা বলুন / Call Mitra</span>
              </a>
              <button
                onClick={() => showToast("ডসিয়ার লিংক কপি করা হয়েছে!")}
                className="p-space-sm bg-surface text-deep-navy rounded-xl hover:bg-surface-container transition-colors shadow-sm border border-surface-border"
                title="Share Dossier"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
            </div>
          </div>

          {/* Dossier & Evidence 3 Cards */}
          <div>
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[24px]">fact_check</span>
                <h3 className="font-title-md text-title-md text-deep-navy font-bold">
                  ভেরিফিকেশন ডসিয়ার ও প্রমাণক • Verification Dossier
                </h3>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                Last Inspected: Oct 24, 2024
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
              {/* Card 1: GPS Location */}
              <div className="flex flex-col bg-surface-container-low rounded-2xl p-space-md shadow-sm border border-surface-border/60 justify-between">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-space-xs text-primary font-label-md text-label-md font-bold">
                      <span className="material-symbols-outlined text-[18px]">pin_drop</span>
                      শারীরিক অবস্থান নিরীক্ষা (Location)
                    </span>
                    <span className="text-tertiary bg-surface px-space-xs py-0.5 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1 border border-surface-border">
                      <span className="material-symbols-outlined text-[12px]">check_circle</span> GPS লকড
                    </span>
                  </div>
                  <p className="font-title-md text-title-md text-deep-navy font-bold mt-space-xs">
                    দোকান নং ১৪, ব্লক সি, বেনারসি পল্লী
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Shop No. 14, Block C, Benarosi Palli, Mirpur, Dhaka 1216
                  </p>
                </div>

                <div className="mt-space-md pt-space-sm bg-surface rounded-xl p-space-sm flex flex-col gap-space-xs border border-surface-border/40">
                  <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
                    <span>Latitude: 23.8071° N</span>
                    <span>Longitude: 90.3686° E</span>
                  </div>
                  <div
                    className="w-full h-28 bg-surface-container rounded-lg bg-cover bg-center overflow-hidden flex items-end p-space-xs relative"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCs56nK80GfcO0bhqjFB1_onx9e6pBhLNadMZ65mnFvkF_wVqXZLT8MxlPqcumOYiYa0xMp7hYPp8uH3hMSThj64NBdy8jZS5Z1v3sTj_1_RO01wFEGahG99gBNb_YZ2-FgtZNzwYtcqwPFBZvbVGvMMnzrqhAtW3u2uglDRQIQl_2vU0tE3uYyxRqTbVLlxHoXpAQZRTTQGQeOM_MNeg6POhmme3UhbrWAtR52wF79q1bRJc_VBBRC')",
                    }}
                  >
                    <div className="bg-surface/90 backdrop-blur-sm px-space-xs py-0.5 rounded text-[10px] text-deep-navy font-bold">
                      Geo-Fence Match: 99.8%
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Stock Audit */}
              <div className="flex flex-col bg-surface-container-low rounded-2xl p-space-md shadow-sm border border-surface-border/60 justify-between">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-space-xs text-primary font-label-md text-label-md font-bold">
                      <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                      স্টক ও মালামাল যাচাই (Inventory)
                    </span>
                    <span className="text-tertiary bg-surface px-space-xs py-0.5 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1 border border-surface-border">
                      <span className="material-symbols-outlined text-[12px]">check_circle</span> নিশ্চিত
                    </span>
                  </div>
                  <p className="font-title-md text-title-md text-deep-navy font-bold mt-space-xs">
                    সিল্ক ও জামদানি শাড়ির বাস্তব স্টক বিদ্যমান
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    আনুমানিক বাজারমূল্য:{" "}
                    <span className="font-headline-sm text-headline-sm text-tertiary font-bold">
                      ৳৮,৫০,০০০
                    </span>
                  </p>
                </div>

                <div className="mt-space-md flex flex-col gap-space-xs bg-surface p-space-sm rounded-xl border border-surface-border/40">
                  <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                    <span>ভেলুয়েশন মেথডোলজি:</span>
                    <span className="text-deep-navy font-semibold">ফিজিক্যাল গণনা ও চালান</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div className="bg-growth-green h-full rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant pt-space-xs">
                    “উচ্চমানের কাতান, জামদানি ও সিল্কের ৩২০+ পিস ফিজিক্যাল তাক-এ গোছানো রয়েছে।”
                  </span>
                </div>
              </div>

              {/* Card 3: Ledger Cross Check */}
              <div className="flex flex-col bg-surface-container-low rounded-2xl p-space-md shadow-sm border border-surface-border/60 justify-between">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-space-xs text-primary font-label-md text-label-md font-bold">
                      <span className="material-symbols-outlined text-[18px]">menu_book</span>
                      খাতা ও লেজার মিলকরণ (Audit)
                    </span>
                    <span className="text-tertiary bg-surface px-space-xs py-0.5 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1 border border-surface-border">
                      <span className="material-symbols-outlined text-[12px]">verified</span> ১০০% ম্যাচ
                    </span>
                  </div>
                  <p className="font-title-md text-title-md text-deep-navy font-bold mt-space-xs">
                    হাতে লেখা লাল খাতা বনাম ডিজিটাল ভয়েস
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    বিগত ৯০ দিনের দৈনিক বিক্রি, বাকি হিসাব এবং ক্যাশ জমার মধ্যে শূন্য বিচ্যুতি (Zero Discrepancy)।
                  </p>
                </div>

                <div className="mt-space-md bg-surface p-space-sm rounded-xl flex items-center gap-space-sm border border-surface-border/40">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-tertiary text-[28px]">rule</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-deep-navy font-bold">
                      অডিট রিপোর্ট নম্বর: AUD-9831
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      ব্যাংক যাচাইয়ের জন্য প্রস্তুতকৃত পিডিএফে সংকলিত
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photographic Field Evidence */}
          <div className="pt-space-md">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-title-md text-title-md text-deep-navy font-bold">
                ফটোগ্রাফিক প্রমাণ ও সিলমোহর • Field Evidence
              </span>
              <span className="font-label-sm text-label-sm text-tertiary font-bold bg-surface-container px-space-sm py-space-xs rounded-full border border-surface-border">
                Official Tamper-Proof Stamp
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
              {/* Photo 1 */}
              <div className="relative group rounded-2xl overflow-hidden shadow-sm aspect-[4/3] border border-surface-border">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Storefront"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNb89RNcPPYP-3l1E8aSe4hq2-COCNunS8L5LKWLUt7G5JtJIjezmWwhpTpUBbQQUgSlmZC69shUP4eRV_iVo3olG1bsSZHSmEGqkARYdq9NEofehwQfhb1zmGrI-W2_OlijP8VCme7zu9Nj0s186TW7g4yJWh9rX_oKHYkCen8awZ-f7JF-_f_nL_nZK5_CYe13HnRWNW_S4_fstI7WibZshumgpGARtLnzNHlFhy5-vrYv1ZgWCK"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/90 via-deep-navy/30 to-transparent flex flex-col justify-end p-space-sm">
                  <span className="font-label-md text-label-md text-on-secondary font-bold">
                    দোকানের সম্মুখভাগ (Storefront)
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary-fixed">GPS Tagged • 12:42 PM</span>
                </div>
              </div>

              {/* Photo 2 */}
              <div className="relative group rounded-2xl overflow-hidden shadow-sm aspect-[4/3] border border-surface-border">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Merchant Interview"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX_suthwuTN55MxBEsf5TGf6XTUPuDuD_HWUOpEhEYZCXjjTUHOvjpoaVJAC7I4eRZ2Yuw8t0-aSau6NEUUjNhIhkDiE7e5QZLZqfnXoEAchwJbBepoaKWfDHkDwXnBg5tayRZWJW5oKb8KX2veT1Er_ZAbZZhHC71VIl5OySwjSG_gt_ZhCohC1k9akczBi8rWjz_GKPQJodWCzhUrhTh2UMoPlxHBNKX5Dx_wI5UY81hNBtb1Caf"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/90 via-deep-navy/30 to-transparent flex flex-col justify-end p-space-sm">
                  <span className="font-label-md text-label-md text-on-secondary font-bold">
                    স্বত্বাধিকারী সাক্ষাৎকার
                  </span>
                  <span className="font-body-sm text-secondary-fixed">Merchant Identity Check</span>
                </div>
              </div>

              {/* Photo 3 */}
              <div className="relative group rounded-2xl overflow-hidden shadow-sm aspect-[4/3] border border-surface-border">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Stock Audit"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7JZ12o8qmIqraBZWg_PkhIMM5QzVHTs6B9Z73-snIdUfGk928VPHPWqZhKLFdzjy7lgPhCyT16cRIii6EO67svRO_Lt9vMUvjnGZVHioYNRFCYFSlSceJEwraV7gbcSutZUN9d_qaN2qnCQhRUgMZLvdSdv6kMHlaLnVL0y__2_mPAplHlFUEpjuS1pVeXKJWP0qqqbuxc03iXKWOiXD31HwSck3kQTIzaYWRDL_cEjhQYsTgQvyp"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/90 via-deep-navy/30 to-transparent flex flex-col justify-end p-space-sm">
                  <span className="font-label-md text-label-md text-on-secondary font-bold">
                    ইনভেন্টরি শেলফ র্যাক
                  </span>
                  <span className="font-body-sm text-secondary-fixed">Stock Audit Verification</span>
                </div>
              </div>

              {/* Photo 4 */}
              <div className="relative group rounded-2xl overflow-hidden shadow-sm aspect-[4/3] border border-surface-border">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt="Lal Khata Cross-check"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm9cHuDQfIKAaJ7H7_9KRxSi46dXxBYD3yg1Fdv-DwP0JU7H22gPZgN1b31ANymzhOAb3bul_G_DTnsqsmLviAAUHbi311Lo_8cAwlHOsCDcCxALjd5aGQnKLT4hEZ2KfF6JAYRrQGNGOom5HPtkoEEFfJHqLzZlO-FTWbqRNuVrczW78rHC-C6R9CbWeNTLicz1WsbukX8vnbTYYFPxHAbEP47AKdRKDq_yEHw7W2_PIrU6EKgGX-"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/90 via-deep-navy/30 to-transparent flex flex-col justify-end p-space-sm">
                  <span className="font-label-md text-label-md text-on-secondary font-bold">
                    লাল খাতা ও ডিজিটাল রেকর্ড
                  </span>
                  <span className="font-body-sm text-body-sm text-secondary-fixed">Ledger Cross-Check</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dual-Layer Trust Model Section */}
        <div className="w-full flex flex-col gap-space-md">
          <div className="flex flex-col gap-space-xs text-center md:text-left">
            <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">
              কেন শুধু সফটওয়্যার যথেষ্ট নয়
            </span>
            <h2 className="font-headline-lg text-headline-lg text-deep-navy font-bold">
              The Dual-Layer Trust Model (AI + Human Mitra)
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              বাংলাদেশের ক্ষুদ্র ব্যবসায়ীদের জন্য কেবল ডিজিটাল অ্যাপ বা অ্যালগরিদম পর্যাপ্ত নয়; ব্যাংকের নির্ভরতা এবং দোকানির আস্থা তৈরিতে প্রয়োজন দুই স্তরের সুরক্ষা।
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch mt-space-sm">
            {/* What AI Does */}
            <div className="lg:col-span-6 bg-surface rounded-2xl p-space-lg shadow-md border border-surface-border flex flex-col justify-between">
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between pb-space-sm bg-surface-container p-space-sm rounded-xl">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">smart_toy</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-deep-navy font-bold">
                        What AI Does • কৃত্রিম বুদ্ধিমত্তা
                      </h3>
                      <span className="font-label-sm text-label-sm text-primary font-semibold">
                        Autonomous &amp; Real-time Digital Layer
                      </span>
                    </div>
                  </div>
                  <span className="text-tertiary font-label-sm text-label-sm font-bold bg-surface px-space-xs py-0.5 rounded-full">
                    24/7 লাইভ
                  </span>
                </div>

                <ul className="flex flex-col gap-space-sm">
                  <li className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded-xl border border-surface-border/40">
                    <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">mic_none</span>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-deep-navy font-bold">
                        ভয়েস থেকে নির্ভুল হিসাব (Bangla Voice Ledger)
                      </span>
                      <span className="font-body-md text-body-md text-on-surface-variant">
                        কথ্য আঞ্চলিক বাংলা বুঝে তাৎক্ষণিক ডেবিট-ক্রেডিট হিসাব রেকর্ড করে।
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded-xl border border-surface-border/40">
                    <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">calculate</span>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-deep-navy font-bold">
                        গাণিতিক নির্ভুলতা ও ব্যালেন্স শিট
                      </span>
                      <span className="font-body-md text-body-md text-on-surface-variant">
                        মুহূর্তের মধ্যে দৈনন্দিন লাভ, বাকি এবং ক্যাশ-ইনফ্লো হিসাব নিখুঁত রাখে।
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded-xl border border-surface-border/40">
                    <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">shield</span>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-deep-navy font-bold">
                        অস্বাভাবিক লেনদেন ও জালিয়াতি শনাক্ত
                      </span>
                      <span className="font-body-md text-body-md text-on-surface-variant">
                        ফেক বিকাশ/নগদ এসএমএস স্ক্রিনিং এবং অস্বাভাবিক এন্ট্রি ফ্ল্যাগ করে।
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded-xl border border-surface-border/40">
                    <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">insights</span>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-deep-navy font-bold">
                        ক্রেডিট রেটিং ও ক্যাশ-ফ্লো পূর্বাভাস
                      </span>
                      <span className="font-body-md text-body-md text-on-surface-variant">
                        ঐতিহাসিক ডেটা অ্যানালাইসিস করে মাইক্রো-লোন সক্ষমতা পরিমাপ করে।
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm border-t border-surface-border/60">
                <span>কভারেজ: ২৪ ঘণ্টা তাৎক্ষণিক প্রসেসিং</span>
                <span className="text-primary font-bold">গতি ও নির্ভুলতার নিশ্চয়তা</span>
              </div>
            </div>

            {/* What Artho Mitra Does */}
            <div className="lg:col-span-6 bg-surface rounded-2xl p-space-lg shadow-md border border-surface-border flex flex-col justify-between">
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between pb-space-sm bg-tertiary-fixed/30 p-space-sm rounded-xl">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-xl bg-tertiary text-on-tertiary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">support_agent</span>
                    </div>
                    <div>
                      <h3 className="font-title-md text-title-md text-deep-navy font-bold">
                        What Artho Mitra Does • অর্থ মিত্র
                      </h3>
                      <span className="font-label-sm text-label-sm text-tertiary font-semibold">
                        Grassroots Human Truth &amp; Verification
                      </span>
                    </div>
                  </div>
                  <span className="text-tertiary font-label-sm text-label-sm font-bold bg-surface px-space-xs py-0.5 rounded-full">
                    বাস্তব পরিদর্শন
                  </span>
                </div>

                <ul className="flex flex-col gap-space-sm">
                  <li className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded-xl border border-surface-border/40">
                    <span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5">storefront</span>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-deep-navy font-bold">
                        বাস্তব দোকান ও মালামাল উপস্থিতি যাচাই (Ground Truth)
                      </span>
                      <span className="font-body-md text-body-md text-on-surface-variant">
                        ব্যবসায়ী যে বাস্তবেই দোকান পরিচালনা করছেন এবং স্টক আছে তা নিশ্চিতকরণ।
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded-xl border border-surface-border/40">
                    <span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5">how_to_reg</span>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-deep-navy font-bold">
                        ব্যাংকের জন্য অ্যান্টি-সিভিল (Anti-Sybil) গ্যারান্টি
                      </span>
                      <span className="font-body-md text-body-md text-on-surface-variant">
                        ভুয়া একাউন্ট বা একাধিক কৃত্রিম প্রোফাইল তৈরি ঠেকিয়ে ব্যাংকের ঝুঁকি শূন্য করা।
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded-xl border border-surface-border/40">
                    <span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5">handshake</span>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-deep-navy font-bold">
                        মানুষের সহমর্মিতা ও অনবোর্ডিং সহায়তা
                      </span>
                      <span className="font-body-md text-body-md text-on-surface-variant">
                        যেসব দোকানদার নিরক্ষর বা প্রযুক্তিতে অনভিজ্ঞ, তাদের পাশে বসে অ্যাপ শেখানো।
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded-xl border border-surface-border/40">
                    <span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5">local_police</span>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-deep-navy font-bold">
                        আইনি ও পুলিশি সহায়তা সংযোগ
                      </span>
                      <span className="font-body-md text-body-md text-on-surface-variant">
                        জালিয়াতির শিকার হলে দ্রুত নিকটস্থ থানায় অভিযোগ দায়ের ও আইনি সহযোগিতা।
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm border-t border-surface-border/60">
                <span>কভারেজ: বাংলাদেশের ৬৪ জেলায় মাঠপর্যায়ে কর্মকর্তা</span>
                <span className="text-tertiary font-bold">আস্থা ও নির্ভরযোগ্যতার ভিত্তি</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Request Mitra Visit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-navy/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface rounded-2xl shadow-2xl border border-surface-border w-full max-w-lg overflow-hidden">
            <div className="p-space-lg bg-surface-container-low border-b border-surface-border flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-xl bg-deep-navy text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">person_pin_circle</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-deep-navy font-bold">
                    অর্থ মিত্র পরিদর্শনের আবেদন
                  </h3>
                  <p className="text-xs text-on-surface-variant">ফিল্ড অফিসার আপনার দোকান পরিদর্শন করবেন</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-surface hover:bg-surface-container flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-space-lg flex flex-col gap-space-md">
              <div>
                <label className="text-xs font-bold text-deep-navy block mb-1">দোকানের নাম:</label>
                <input
                  type="text"
                  value={formData.shopName}
                  onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-surface-border text-sm font-medium focus:outline-primary"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-deep-navy block mb-1">দোকানের পূর্ণ ঠিকানা:</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-surface-border text-sm font-medium focus:outline-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-space-sm">
                <div>
                  <label className="text-xs font-bold text-deep-navy block mb-1">যোগাযোগের মোবাইল:</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-surface-border text-sm font-medium focus:outline-primary"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-deep-navy block mb-1">পছন্দের সময়:</label>
                  <input
                    type="text"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-surface-border text-sm font-medium focus:outline-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-deep-navy block mb-1">পরিদর্শনের উদ্দেশ্য:</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-surface-border text-sm font-medium focus:outline-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-space-sm pt-space-xs border-t border-surface-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface border border-surface-border text-sm font-bold text-deep-navy"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-deep-navy text-white text-sm font-bold shadow-md hover:bg-opacity-95"
                >
                  আবেদন জমা দিন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
