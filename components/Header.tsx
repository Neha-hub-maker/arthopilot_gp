"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function Header() {
  const pathname = usePathname();
  const { language, toggleLanguage, openVoiceModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: language === "bn" ? "Overview" : "Overview", href: "/", id: "overview" },
    { label: language === "bn" ? "Dashboard" : "Dashboard", href: "/dashboard", id: "dashboard" },
    { label: language === "bn" ? "Voice Bookkeeper (হিসাব)" : "Voice Bookkeeper", href: "/voice", id: "voice" },
    { label: language === "bn" ? "AI Agents" : "AI Agents", href: "/agents", id: "agents" },
    { label: language === "bn" ? "Fraud Guard (পাহারা)" : "Fraud Guard", href: "/fraud", id: "fraud" },
    { label: language === "bn" ? "Credit Readiness" : "Credit Readiness", href: "/profile", id: "profile" },
    { label: language === "bn" ? "Artho Mitra (মানব যাচাই)" : "Artho Mitra", href: "/mitra", id: "mitra" },
    { label: language === "bn" ? "Social Impact" : "Social Impact", href: "/impact", id: "impact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/95 backdrop-blur-md shadow-[0_1px_8px_rgba(18,53,91,0.06)] border-b border-surface-border/40">
      <div className="h-20 w-full px-space-md lg:px-gutter-lg flex items-center justify-between gap-space-md">
        {/* Brand & Logo */}
        <div className="flex items-center gap-space-lg shrink-0">
          <Link className="flex items-center gap-space-sm focus:outline-none" href="/">
            <img
              alt="ArthoPilot Official Logo"
              className="h-9 w-auto object-contain rounded-md"
              src="/images/logo.png"
              onError={(e) => {
                // Fallback if local image has issues
                (e.target as HTMLImageElement).src =
                  "https://lh3.googleusercontent.com/aida/AEtjO1WZyF5RMF5lRbYBwoTah-JksWoNCfaF9QeOteRz8fwb0aCR47c2S6TZTrAO46p1qQL1lyCjxNsBTjnVVgLlF8Dm7VSrwRM2vtXUoeKi3QPn9P0P3TIEAV7bCAQtO7pXfe8FSKWcg0uuobsHCLlXlVDkEaO-9PdzjcESjiOLx8G1TtWGYFjItxEn9cgo-BWmJkH61dCSI9j1JoZZZHz4vQpXnTL4trwB3T_EtkycbENiL56fywFdhfagxO0";
              }}
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-deep-navy tracking-tight leading-none">
                ArthoPilot
              </span>
              <span className="font-label-sm text-label-sm text-primary font-medium tracking-normal">
                অর্থপাইলট AI
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden 2xl:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`px-space-sm py-space-xs font-label-md text-label-md transition-all whitespace-nowrap rounded-lg ${
                  isActive
                    ? "bg-surface-container text-deep-navy font-bold shadow-xs"
                    : "text-on-surface-variant hover:text-deep-navy hover:bg-surface-container-low"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Compact Navigation for Medium/Large screens */}
        <nav className="hidden xl:flex 2xl:hidden items-center gap-0.5">
          {navItems.slice(0, 6).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`px-2 py-1.5 font-label-sm text-label-sm transition-all whitespace-nowrap rounded-lg ${
                  isActive
                    ? "bg-surface-container text-deep-navy font-bold"
                    : "text-on-surface-variant hover:text-deep-navy hover:bg-surface-container-low"
                }`}
              >
                {item.id === "voice" ? "Voice" : item.id === "profile" ? "Credit" : item.label}
              </Link>
            );
          })}
          <div className="relative group">
            <button className="px-2 py-1.5 font-label-sm text-label-sm text-on-surface-variant hover:text-deep-navy rounded-lg flex items-center gap-0.5">
              <span>More</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
            <div className="absolute right-0 top-full mt-1 w-48 bg-surface rounded-xl shadow-lg border border-surface-border p-1 hidden group-hover:block z-50">
              <Link
                href="/mitra"
                className="block px-3 py-2 text-sm text-deep-navy hover:bg-surface-container-low rounded-lg font-medium"
              >
                Artho Mitra (মানব যাচাই)
              </Link>
              <Link
                href="/impact"
                className="block px-3 py-2 text-sm text-deep-navy hover:bg-surface-container-low rounded-lg font-medium"
              >
                Social Impact
              </Link>
            </div>
          </div>
        </nav>

        {/* Actions & Profile Bar */}
        <div className="flex items-center gap-space-sm shrink-0">
          {/* Language Switcher */}
          <div
            onClick={toggleLanguage}
            className="hidden md:flex items-center bg-surface-container-low p-space-xs rounded-full shadow-[0_1px_4px_rgba(18,53,91,0.04)] cursor-pointer select-none"
            title="Toggle Language"
          >
            <span
              className={`px-space-sm py-space-xs rounded-full font-label-sm text-label-sm transition-all ${
                language === "bn"
                  ? "bg-surface text-primary shadow-[0_1px_3px_rgba(0,0,0,0.05)] font-bold"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              বাংলা
            </span>
            <span
              className={`px-space-sm py-space-xs rounded-full font-label-sm text-label-sm transition-all ${
                language === "en"
                  ? "bg-surface text-primary shadow-[0_1px_3px_rgba(0,0,0,0.05)] font-bold"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              EN
            </span>
          </div>

          {/* AI Protected Pill */}
          <div className="hidden lg:flex items-center gap-space-xs px-space-sm py-space-xs bg-surface-container rounded-full">
            <span className="w-2 h-2 rounded-full bg-growth-green animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-deep-navy font-semibold whitespace-nowrap">
              AI Protected • নিরাপদ
            </span>
          </div>

          {/* Speak / Voice CTA Button */}
          <button
            onClick={openVoiceModal}
            className="flex items-center gap-space-xs px-space-md py-space-sm bg-primary-container text-on-primary rounded-xl font-label-md text-label-md hover:bg-primary transition-all duration-150 shadow-[0_2px_8px_rgba(0,166,166,0.24)] shrink-0 active:scale-95 group"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">
              mic
            </span>
            <span className="hidden sm:inline font-semibold whitespace-nowrap">
              {language === "bn" ? "কথা বলুন / Speak" : "Speak Now"}
            </span>
          </button>

          {/* User Profile Pill */}
          <Link
            href="/profile"
            className="flex items-center gap-space-sm pl-space-xs hover:opacity-90 transition-opacity"
          >
            <div className="relative">
              <img
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuASGUPFO-R1FLleA8iHBSw0z-7oUgD163B3Jpfy05V7tBRnDjUMR5mFCMuXyiEBhLb4WG5XxhyaAz_yUCb1T1J5ssPXMjDTTzmN5Htv3OFa-St1jR9SQw91H1Ygbf7vKhzaC06MUIQq58OKOeUL6SMUkhfJKhpkcUBrzbds4eJOPXgeJq2oW07Lf6yApzIAk5ABYnGDXROQoEtR-Ty-9_MrPcHD-HzuLDKOKjekDOZDhya-UT87PTwX"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-growth-green rounded-full ring-2 ring-surface"></span>
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="font-label-md text-label-md text-deep-navy font-bold leading-tight truncate max-w-[130px]">
                নুসরাত জাহান
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant leading-tight truncate max-w-[130px]">
                শাড়ি ও বুটিক
              </span>
            </div>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-deep-navy hover:bg-surface-container"
            aria-label="Toggle navigation"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface border-t border-surface-border px-space-md py-space-sm shadow-xl flex flex-col gap-1 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-deep-navy hover:bg-surface-container-low"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="flex items-center justify-between pt-2 mt-2 border-t border-surface-border">
            <span className="text-xs text-on-surface-variant font-medium">ভাষা পরিবর্তন:</span>
            <button
              onClick={toggleLanguage}
              className="text-xs font-bold text-primary px-3 py-1 bg-surface-container rounded-full"
            >
              {language === "bn" ? "English এ দেখুন" : "Switch to বাংলা"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
