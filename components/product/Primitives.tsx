"use client";

import { useEffect, useId, useState } from "react";
import { ArrowUpRight, Sparkles, Activity, ShieldCheck, BookOpen, TrendingUp } from "lucide-react";
import { AnimatedNumber, useInView, useMotion } from "./Motion";
import type { ReactNode } from "react";

export const money = (value: number) => `৳${value.toLocaleString("en-BD", { maximumFractionDigits: 2 })}`;
export function BrandMark({ small = false }: { small?: boolean }) {
  return <span className={`brand-mark ${small ? "small" : ""}`} aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M6 25 16 5l10 20M11 17h10M16 5v22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="25" cy="7" r="3" fill="currentColor" stroke="none"/></svg></span>;
}
export function Eyebrow({ children }: { children: ReactNode }) { return <div className="eyebrow"><span />{children}</div>; }
export function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: ReactNode; action?: ReactNode }) {
  return <div className="page-heading"><div><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{description}</p></div>{action && <div className="page-actions">{action}</div>}</div>;
}
export function Status({ children, tone = "teal" }: { children: ReactNode; tone?: string }) { return <span className={`status ${tone}`}><i />{children}</span>; }
export function AIInsight({ title = "A little insight. A better decision.", children, label = "UNNOTI · GROWTH ADVISOR" }: { title?: string; children: ReactNode; label?: string }) {
  return <div className="ai-insight"><div className="ai-insight-icon"><Sparkles size={21}/></div><div><span className="micro-label">{label}</span><h3>{title}</h3><div className="insight-copy">{children}</div></div><Sparkles className="insight-decoration" size={75}/></div>;
}
export function Waveform({ active = true }: { active?: boolean }) { return <div className={`waveform ${active ? "active" : ""}`} aria-hidden="true">{Array.from({ length: 37 }, (_, i) => <i key={i} style={{ height: `${10 + Math.sin(i * 1.7) ** 2 * 31 + Math.sin(i * .31) ** 2 * 22}px`, animationDelay: `${i * .07}s` }}/>)}</div>; }
export function Metric({ label, value, detail, positive = true, points = [2, 4, 3, 6, 5, 8, 10] }: { label: string; value: string; detail: string; positive?: boolean; points?: number[] }) {
  return <div className="metric"><div className="metric-label">{label}<ArrowUpRight size={16}/></div><strong><AnimatedNumber value={value}/></strong><div className="metric-bottom"><span className={positive ? "positive" : "muted"}>{detail}</span><svg width="90" height="30" viewBox="0 0 90 30" aria-hidden="true"><polyline points={points.map((p, i) => `${i * 14},${29 - p * 2}`).join(" ")} fill="none" stroke={positive ? "#00a6a6" : "#94a3b8"} strokeWidth="2"/></svg></div></div>;
}
export function Chart({ sales, expenses, labels, title = "Sales and expenses" }: { sales: number[]; expenses?: number[]; labels: string[]; title?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(true);
  const { enabled } = useMotion();
  const id = useId().replace(/:/g, "");
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...sales, ...(expenses || []), 1) * 1.18;
  const min = Math.min(0, ...sales, ...(expenses || [])) * 1.18;
  const y = (value: number) => 225 - (value - min) / (max - min) * 180;
  const coords = (values: number[]) => values.map((v, i) => `${50 + i * 650 / Math.max(values.length - 1, 1)},${y(v)}`).join(" ");
  const area = `M ${coords(sales).split(" ").join(" L ")} L ${sales.length > 1 ? 700 : 50},${y(0)} L 50,${y(0)} Z`;
  return <div ref={ref} className={`chart ${inView && enabled ? "chart-reveal" : ""}`} role="group" aria-label={`${title}: ${labels.map((l, i) => `${l} sales ${sales[i] || 0}${expenses ? ` expenses ${expenses[i] || 0}` : ""}`).join(", ")}`}><svg viewBox="0 0 740 270"><defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00a6a6" stopOpacity=".19"/><stop offset="100%" stopColor="#00a6a6" stopOpacity="0"/></linearGradient></defs>{[0, 1, 2, 3].map(i => <g key={i}><line x1="50" x2="710" y1={45 + i * 60} y2={45 + i * 60} stroke="#e9eef0" strokeDasharray="3 5"/><text x="0" y={49 + i * 60} fill="#91a0ab" fontSize="10">{Math.round((max - (max - min) * i / 3) / 1000 * 10) / 10}k</text></g>)}<path className="chart-area" d={area} fill={`url(#${id})`}/>{sales.length === 1 && <circle cx="50" cy={y(sales[0])} r="4" fill="#00a6a6"/>}<polyline key={sales.join(",")} className="chart-trace" pathLength="1" points={coords(sales)} fill="none" stroke="#00a6a6" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"/>{expenses && <polyline className="chart-expense" points={coords(expenses)} fill="none" stroke="#a3adbb" strokeWidth="2" strokeDasharray="5 5" strokeLinejoin="round"/>}{labels.map((label, i) => <g key={i}><text x={50 + i * 650 / Math.max(labels.length - 1, 1)} y="253" textAnchor="middle" fill="#87949f" fontSize="10">{label}</text><rect x={30 + i * 650 / Math.max(labels.length - 1, 1)} y="20" width="40" height="213" fill="transparent" tabIndex={0} role="button" aria-label={`${label}: ${money(sales[i])}${expenses ? ` sales, ${money(expenses[i])} expenses` : ""}`} onFocus={() => setHover(i)} onBlur={() => setHover(null)} onClick={() => setHover(i)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setHover(i); } }} onMouseEnter={() => setHover(i)} onMouseLeave={event => { if (document.activeElement !== event.currentTarget) setHover(null); }}/></g>)}{hover !== null && <g><circle cx={50 + hover * 650 / Math.max(labels.length - 1, 1)} cy={y(sales[hover])} r="5" fill="#fff" stroke="#00a6a6" strokeWidth="3"/><text x="380" y="24" textAnchor="middle" fill="#008888" fontSize="13">{labels[hover]} · {money(sales[hover])}</text></g>}</svg></div>;
}
export const agents = [
  { id: "hishab" as const, name: "Hishab", role: "AI Bookkeeper", bn: "হিসাব", icon: BookOpen, color: "teal", description: "Your everyday business, beautifully accounted for.", prompt: "আজকে ৫০০ টাকার কাপড় বিক্রি করেছি", href: "/voice" },
  { id: "pahara" as const, name: "Pahara", role: "Fraud Protection", bn: "পাহারা", icon: ShieldCheck, color: "rose", description: "A second pair of eyes before you trust a payment.", prompt: "জরুরি: OTP দিন https://payment-check.xyz", href: "/fraud" },
  { id: "niyom" as const, name: "Niyom", role: "Compliance Guide", bn: "নিয়ম", icon: Activity, color: "blue", description: "Find your next step, grounded in your documents.", prompt: "ট্রেড লাইসেন্সের নিয়ম কী?", href: "/agents" },
  { id: "unnoti" as const, name: "Unnoti", role: "Growth Advisor", bn: "উন্নতি", icon: TrendingUp, color: "green", description: "Turn the numbers you record into a clearer direction.", prompt: "ব্যবসার লাভ কেমন?", href: "/insights" },
];
export function useDemo() {
  const [demo, setDemo] = useState(false);
  useEffect(() => { setDemo(new URLSearchParams(window.location.search).get("demo") === "1"); }, []);
  return [demo, setDemo] as const;
}
export function DataSwitch({ demo, onChange }: { demo: boolean; onChange: (demo: boolean) => void }) {
  return <div className="segmented" aria-label="Data source"><button aria-pressed={!demo} className={!demo ? "selected" : ""} onClick={() => onChange(false)}>Live records</button><button aria-pressed={demo} className={demo ? "selected" : ""} onClick={() => onChange(true)}>Demo preview</button></div>;
}
