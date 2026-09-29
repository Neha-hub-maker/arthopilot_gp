"use client";

import React from "react";
import { useApp } from "@/context/AppContext";

export default function Toast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-24 right-6 z-50 max-w-md bg-deep-navy text-white px-space-md py-space-sm rounded-xl shadow-2xl border border-vibrant-teal/40 flex items-center gap-space-sm animate-bounce">
      <span className="material-symbols-outlined text-vibrant-teal text-[22px]">info</span>
      <span className="text-sm font-semibold">{toastMessage}</span>
    </div>
  );
}
