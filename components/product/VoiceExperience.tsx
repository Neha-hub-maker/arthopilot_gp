"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, CheckCheck, Mic, Square, Sparkles, Volume2, ShieldCheck, Keyboard, RotateCcw } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { api, apiError, AgentResponse, categoryLabel } from "@/lib/api";
import { money, Status, Waveform } from "./Primitives";

import { useMotion } from "./Motion";

type Recognition = { lang: string; interimResults: boolean; start: () => void; stop: () => void; onresult: ((event: { results: { transcript: string }[][] }) => void) | null; onerror: ((event: { error: string }) => void) | null; onend: (() => void) | null };
const prompts = ["আজকে ৫০০ টাকার বিক্রি হয়েছে", "ইসলামপুর থেকে ৩,৪০০ টাকার কাপড় ও সুতা কিনলাম ক্যাশে", "দোকানের ভাড়া ৫,০০০ টাকা ব্যাংকে দিলাম", "৭৫০ টাকার বাকি শাড়ি বিক্রি করেছি", "বকেয়া ১,২০০ টাকা বিকাশে পরিশোধ করলেন"];
export default function VoiceExperience({ compact = false }: { compact?: boolean }) {
  const { addTransaction } = useApp();
  const { enabled: motionEnabled } = useMotion();
  const [text, setText] = useState(prompts[0]);
  const [dialect, setDialect] = useState("প্রমিত বাংলা");
  const [stage, setStage] = useState<"ready" | "listening" | "understanding" | "finding" | "preview" | "saving" | "saved">("ready");
  const [preview, setPreview] = useState<AgentResponse["preview"]>(null);
  const [error, setError] = useState("");
  const id = useRef("");
  const version = useRef(0);
  const recognition = useRef<Recognition | null>(null);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; version.current++; recognition.current?.stop(); }; }, []);
  const busy = ["understanding", "finding", "saving", "listening"].includes(stage);
  const change = (value: string) => { version.current++; setText(value); setPreview(null); setStage("ready"); setError(""); id.current = ""; };
  const understand = async () => {
    if (!text.trim() || busy) return;
    const current = ++version.current;
    setError(""); setPreview(null); setStage("understanding");
    const pending = api.chat(text, { save: false });
    // Start handling rejection immediately while the visual processing step plays.
    const handled = pending.then(value => ({ value, error: null })).catch(error => ({ value: null, error }));
    await new Promise(resolve => setTimeout(resolve, motionEnabled ? 350 : 0));
    if (current !== version.current) return;
    setStage("finding");
    const [response] = await Promise.all([handled, new Promise(resolve => setTimeout(resolve, motionEnabled ? 200 : 0))]);
    if (current !== version.current) return;
    if (response.error) { setError(apiError(response.error)); setStage("ready"); return; }
    if (!response.value?.preview) { setError(response.value?.message || "Please describe one transaction."); setStage("ready"); return; }
    id.current = crypto.randomUUID(); setPreview(response.value.preview); setStage("preview");
  };
  const save = async () => {
    if (stage !== "preview" || !preview) return;
    setStage("saving");
    const saved = await addTransaction(text, id.current);
    if (mounted.current) { setStage(saved ? "saved" : "preview"); if (!saved) setError("The record was not saved. Please try again; your entry will not be duplicated."); }
  };
  const listen = () => {
    if (stage === "listening") { recognition.current?.stop(); return; }
    const browser = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
    const Constructor = browser.SpeechRecognition || browser.webkitSpeechRecognition;
    if (!Constructor) { setError("Voice capture is not supported in this browser. Type below or try the Bangla example."); return; }
    setError(""); setPreview(null); id.current = ""; setStage("listening");
    const recorder = new Constructor(); recorder.lang = "bn-BD"; recorder.interimResults = true;
    recorder.onresult = event => { if (mounted.current) setText(Array.from(event.results).map(result => result[0].transcript).join(" ")); };
    recorder.onerror = event => { if (mounted.current) { setError(`Microphone unavailable (${event.error}). You can still type your transaction below.`); setStage("ready"); } };
    recorder.onend = () => { if (mounted.current) setStage(current => current === "listening" ? "ready" : current); };
    recognition.current = recorder;
    try { recorder.start(); } catch { setError("Could not start the microphone. Please use the text field."); setStage("ready"); }
  };
  const playback = () => {
    if (!("speechSynthesis" in window)) { setError("Audio playback is unavailable in this browser."); return; }
    window.speechSynthesis.cancel(); const speech = new SpeechSynthesisUtterance(text); speech.lang = "bn-BD"; window.speechSynthesis.speak(speech);
  };
  return <div className={`voice-experience ${compact ? "compact" : ""}`} data-stage={stage}>
    <div className="voice-stage"><div className="voice-topline"><Status>{stage === "listening" ? "Listening to your words" : stage === "saving" ? "Updating your record" : stage === "saved" ? "Your record is up to date" : stage === "preview" ? "Ready for your review" : busy ? "Hishab is understanding" : "Hishab is ready to help"}</Status><select aria-label="Bangla dialect" value={dialect} onChange={e => setDialect(e.target.value)}>{["প্রমিত বাংলা", "চাটগাঁইয়া", "সিলেটি"].map(d => <option key={d}>{d}</option>)}</select></div><div className={`mic-universe ${busy ? "working" : ""} ${stage === "saved" ? "saved" : ""}`}><div className="mic-orbit orbit-one"/><div className="mic-orbit orbit-two"/><div className="mic-orbit orbit-three"/><span className="orbit-spark spark-one">✦</span><span className="orbit-spark spark-two">✧</span><button className="main-mic" onClick={listen} disabled={busy && stage !== "listening"} aria-label={stage === "listening" ? "Stop recording" : "Start voice recording"}>{stage === "saved" ? <CheckCheck size={38}/> : stage === "listening" ? <Square size={29} fill="currentColor"/> : <Mic size={37}/>}</button></div><h2>{stage === "saved" ? `${preview?.type === "sale" ? "Sale" : "Expense"} recorded.` : stage === "listening" ? "I'm listening. Take your time." : "Tell ArthoPilot about your business"}</h2><p>{stage === "saved" ? "Transaction saved. Your business record is up to date." : "Speak naturally in Bangla. We'll take it from here."}</p><Waveform active={busy}/><div className="processing-steps" aria-live="polite">{["Understanding", "Finding transaction", "Updating business record"].map((label, i) => { const step = ["ready", "listening"].includes(stage) ? -1 : stage === "understanding" ? 0 : ["finding", "preview"].includes(stage) ? 1 : 2; return <span key={label} className={i <= step ? "done" : ""}>{(i < step || stage === "saved") ? <Check size={12}/> : <i/>}{label}{i === step && busy ? "…" : ""}</span>; })}</div></div>
    <div className="voice-input-area"><label htmlFor={compact ? "modal-transcript" : "voice-transcript"}><Keyboard size={14}/>YOUR WORDS, YOUR WAY<button onClick={playback} className="icon-button" type="button" aria-label="Play transcript"><Volume2 size={17}/></button></label><textarea id={compact ? "modal-transcript" : "voice-transcript"} value={text} onChange={e => change(e.target.value)} disabled={busy} rows={2} maxLength={8000}/><div className="voice-input-footer"><span>Bangla voice capture · {dialect !== "প্রমিত বাংলা" ? "dialect preference noted" : "or type instead"}</span><button className="button navy" onClick={understand} disabled={busy || !text.trim()}> {busy && stage !== "listening" ? "Working…" : "Understand my transaction"}<ArrowRight size={16}/></button></div>{error && <p className="form-error" role="alert">{error}</p>}</div>
    {preview && <div className={`transaction-preview ${stage === "saved" ? "saved" : ""}`} role="status"><span className="transaction-tick">{stage === "saved" ? <CheckCheck size={22}/> : <Sparkles size={22}/>}</span><div><span className="micro-label">{stage === "saved" ? "SAVED TO YOUR BUSINESS RECORD" : "UNDERSTOOD. READY FOR YOUR REVIEW."}</span><h3>{preview.type === "sale" ? "Sale" : "Expense"} · {categoryLabel(preview.category)}</h3><span>{preview.method} · {money(preview.amount)}</span></div>{stage === "saved" ? <button className="button soft" onClick={() => change("")}><PlusIcon/>New entry</button> : <button className="button teal" onClick={save} disabled={stage === "saving"}>{stage === "saving" ? "Saving…" : "Confirm & save"}<Check size={16}/></button>}</div>}
    <div className="try-prompts"><span>TRY SAYING</span>{prompts.slice(0, compact ? 2 : 5).map((prompt, i) => <button key={prompt} onClick={() => change(prompt)} disabled={busy}>{["৳500 sale", "Buy supplies", "Pay shop rent", "Credit sale", "Collect a payment"][i]}<ArrowUpRightIcon/></button>)}</div><div className="voice-privacy"><ShieldCheck size={14}/>Always review before saving. Browser voice support varies by device.</div>
  </div>;
}
function PlusIcon() { return <RotateCcw size={14}/>; }
function ArrowUpRightIcon() { return <ArrowRight size={12}/>; }
