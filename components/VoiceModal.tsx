"use client";
import { useEffect, useRef } from "react";
import { X, Sparkles } from "lucide-react";
import { useApp } from "@/context/AppContext";
import VoiceExperience from "@/components/product/VoiceExperience";
export default function VoiceModal() {
 const { isVoiceModalOpen, closeVoiceModal } = useApp();
 const dialog = useRef<HTMLDialogElement>(null);
 useEffect(() => {
  const element = dialog.current;
  if(isVoiceModalOpen) element?.showModal(); else element?.close();
  if(isVoiceModalOpen) { const old=document.body.style.overflow; document.body.style.overflow="hidden"; return()=>{document.body.style.overflow=old;}; }
 },[isVoiceModalOpen]);
 return <dialog ref={dialog} className="voice-dialog" onCancel={closeVoiceModal} onClick={e=>{if(e.target===dialog.current)closeVoiceModal();}} aria-labelledby="voice-dialog-title"><div className="voice-dialog-header"><div><Sparkles size={19}/><h2 id="voice-dialog-title">A moment with ArthoPilot</h2></div><button autoFocus className="icon-button" onClick={closeVoiceModal} aria-label="Close voice assistant"><X size={21}/></button></div>{isVoiceModalOpen&&<VoiceExperience compact/>}</dialog>;
}
