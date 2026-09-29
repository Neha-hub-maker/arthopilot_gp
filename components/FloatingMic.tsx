"use client";

import React from "react";
import { useApp } from "@/context/AppContext";

export default function FloatingMic() {
  const { openVoiceModal } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group">
      {/* Speech prompt bubble on hover */}
      <div className="hidden md:flex items-center px-3 py-1.5 rounded-full bg-deep-navy text-white text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <span>কথা বলে হিসাব লিখুন</span>
        <span className="w-1.5 h-1.5 rounded-full bg-vibrant-teal ml-1.5 animate-ping"></span>
      </div>

      {/* Floating Orb Button */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-vibrant-teal/30 animate-pulse-ring"></div>
        <button
          onClick={openVoiceModal}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-vibrant-teal text-white flex items-center justify-center shadow-[0_4px_20px_rgba(0,166,166,0.4)] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none"
          title="Speak in Bangla (হিসাব বলুন)"
          aria-label="Speak in Bangla"
        >
          <span className="material-symbols-outlined text-[28px]">mic</span>
        </button>
      </div>
    </div>
  );
}
