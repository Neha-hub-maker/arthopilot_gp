"use client";
import { Mic } from "lucide-react";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
export default function FloatingMic() { const { openVoiceModal } = useApp(); const path = usePathname(); if (path.replace(/\/$/, "") === "/voice") return null; return <button className="floating-voice" onClick={openVoiceModal} aria-label="Speak in Bangla"><Mic size={20}/><span>Talk to ArthoPilot</span></button>; }
