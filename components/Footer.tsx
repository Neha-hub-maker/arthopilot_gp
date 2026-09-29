import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-surface border-t border-surface-border py-gutter-lg mt-space-xl">
      <div className="w-full max-w-7xl mx-auto px-gutter flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-headline-sm text-deep-navy font-bold">
              ArthoPilot (অর্থপাইলট)
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container text-primary font-bold">
              AI Fintech
            </span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs text-center md:text-left">
            Bangla-first Autonomous Financial Companion for Micro-Entrepreneurs
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-space-md">
          <Link
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
            href="/"
          >
            হোমপেজ
          </Link>
          <Link
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
            href="/dashboard"
          >
            ড্যাশবোর্ড
          </Link>
          <Link
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
            href="/voice"
          >
            ভয়েস খাতা
          </Link>
          <Link
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
            href="/agents"
          >
            এআই প্রতিনিধি
          </Link>
          <Link
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
            href="/fraud"
          >
            পাহারা সিকিউরিটি
          </Link>
          <Link
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
            href="/mitra"
          >
            অর্থ মিত্র
          </Link>
          <Link
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
            href="/impact"
          >
            জাতীয় প্রভাব
          </Link>
        </div>

        <div className="font-label-sm text-label-sm text-on-surface-variant text-center md:text-right">
          © 2025 ArthoPilot Bangladesh. সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
}
