"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, ArrowRight, Mic, Plus, Sparkles, Wallet, Smartphone, ChevronDown, ShieldCheck, Download, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { api, apiError } from "@/lib/api";
import { useInsights } from "@/lib/useInsights";
import { demoSales, demoExpenses, demoLabels, demoTransactions } from "@/lib/demoData";
import { AIInsight, Chart, DataSwitch, Metric, PageHeading, Status, money, useDemo, Waveform } from "@/components/product/Primitives";

import { CompanionGreeting } from "@/components/product/Motion";

export default function DashboardPage() {
  const { transactions, todaySales, todayExpenses, netProfit, cashDrawer, bKashTotal, nagadTotal, openVoiceModal, language } = useApp();
  const [demo, setDemo] = useDemo();
  const [filter, setFilter] = useState("all");
  const [mobile, setMobile] = useState(false);
  const [answer, setAnswer] = useState("");
  const requestVersion = useRef(0);
  const { result, error } = useInsights(transactions.length);
  const rows = demo ? demoTransactions : transactions;
  const filtered = rows.filter(t => filter === "all" || t.type === filter);
  const daily = result?.insights?.daily || [];
  const sales = demo ? demoSales : daily.length ? daily.map(d => d.sales) : [0, 0, 0, 0, 0, 0, 0];
  const expenses = demo ? demoExpenses : daily.length ? daily.map(d => d.expenses) : [0, 0, 0, 0, 0, 0, 0];
  const labels = demo ? demoLabels : daily.length ? daily.map(d => d.date.slice(5)) : demoLabels;
  const ask = async (prompt: string) => {
    const version = ++requestVersion.current;
    setAnswer("ArthoPilot is looking at your recorded business activity…");
    try { const response = await api.chat(prompt, { save: false }); if (version === requestVersion.current) setAnswer(response.message); }
    catch (e) { if (version === requestVersion.current) setAnswer(apiError(e)); }
  };
  return <div className="product-page">
    <PageHeading eyebrow="A LITTLE CLARITY GOES A LONG WAY" title={language === "bn" ? "আপনার ব্যবসা, এগিয়ে যাওয়ার পথে।" : "Your business, looking ahead."} description={<CompanionGreeting growth={demo ? undefined : result?.insights?.sales_change_percent}/>} action={<button className="button teal" onClick={openVoiceModal}><Plus size={16}/>Add a transaction</button>}/>
    <div className="workspace-toolbar"><div className="business-heading"><span className="business-avatar large">N</span><div><strong>Nusrat Boutique</strong><span>Fashion business <i/> Dhaka, Bangladesh</span></div></div><DataSwitch demo={demo} onChange={setDemo}/></div>
    {demo && <p className="dataset-note">Demo preview · sample figures for exploring the product. Your saved records are unchanged.</p>}
    <div className="metrics-grid"><Metric label="Today's sales" value={money(demo ? 12500 : todaySales)} detail={demo ? "↗ 18.2% this week" : "Recorded today"}/><Metric label="Today's expenses" value={money(demo ? 5200 : todayExpenses)} detail={demo ? "Across 8 transactions" : "Recorded today"} positive={false} points={[8, 7, 9, 5, 6, 4, 5]}/><Metric label="Profit · sales less expenses" value={money(demo ? 7300 : netProfit)} detail={demo ? "↗ Looking healthy" : "Before unrecorded costs"}/><div className="health-metric"><div><span className="metric-label">AI business health</span><strong>{demo ? "Looking healthy" : "Building your picture"}</strong><span>{demo ? "Keep up the good work" : "More records, more clarity"}</span><small>{demo ? "Illustrative score" : "Score not yet available"}</small></div><div className="health-ring" style={{ "--score": demo ? "78%" : "0%" } as React.CSSProperties}><strong>{demo ? "78" : "—"}<small>{demo ? "%" : ""}</small></strong></div></div></div>
    <div className="dashboard-main-grid"><section className="panel sales-panel"><div className="panel-heading"><div><span className="micro-label">THE BIGGER PICTURE</span><h2>Every day, a little progress.</h2></div><Link href="/insights" className="icon-button" aria-label="View business insights"><ArrowUpRight size={20}/></Link></div><div className="chart-summary"><strong>{money(sales.reduce((a, b) => a + b, 0))}<span>Total recorded sales</span></strong><div className="chart-legend"><span><i/>Sales</span><span><i className="gray"/>Expenses</span></div></div><Chart sales={sales} expenses={expenses} labels={labels}/><AIInsight title={demo ? "Friday looks promising." : "Your next step, backed by your records."}><p>{demo ? "Your evening sales are increasing. Consider stocking more products before Friday." : error || result?.message || "Loading your business insights…"}</p></AIInsight></section>
    <aside className="voice-invitation"><span className="micro-label">YOUR MOST NATURAL BUSINESS TOOL</span><h2>Less typing.<br/>More living.</h2><p>Tell us what happened.<br/>We'll help with the numbers.</p><button className="voice-invitation-orb" onClick={openVoiceModal} aria-label="Start a business conversation"><Mic size={32}/></button><Waveform/><p className="bangla-example">“আজকে ৫০০ টাকার বিক্রি হয়েছে”</p><button className="button teal" onClick={openVoiceModal}>Let's talk <ArrowRight size={16}/></button><span className="voice-card-foot"><ShieldCheck size={12}/>Review before you save</span></aside></div>
    <div className="dashboard-bottom-grid"><section className="panel transactions-panel"><div className="panel-heading"><div><span className="micro-label">THE LITTLE THINGS ADD UP</span><h2>Recent transactions</h2></div><button className="icon-button" aria-label="Preview mobile dashboard" onClick={() => setMobile(true)}><Smartphone size={18}/></button></div><div className="transaction-filters">{[["all", "All activity"], ["inflow", "Sales"], ["outflow", "Expenses"]].map(([id, label]) => <button key={id} aria-pressed={filter === id} className={filter === id ? "active" : ""} onClick={() => setFilter(id)}>{label}</button>)}<span>{filtered.length} records</span></div><div className="transaction-list">{filtered.length ? filtered.slice(0, 8).map(tx => <div className="transaction-row" key={tx.id}><span className={`transaction-icon ${tx.type === "inflow" ? "" : "expense"}`}>{tx.type === "inflow" ? <ArrowDownLeft size={19}/> : <ArrowUpRight size={19}/>}</span><div><strong>{tx.title}</strong><span>{tx.category} · {tx.time}</span></div><span className="payment-method">{tx.method}</span><strong className={tx.type === "inflow" ? "positive" : ""}>{tx.type === "inflow" ? "+" : "−"}{money(tx.amount)}</strong></div>) : <div className="empty-state"><Wallet size={24}/><p>No transactions here yet.</p><button className="inline-link" onClick={openVoiceModal}>Record your first sale <ArrowRight size={14}/></button></div>}</div></section>
    <section className="panel money-panel"><span className="micro-label">YOUR MONEY, ORGANIZED</span><h2>Where it comes together.</h2>{[["Cash drawer", demo ? 4300 : cashDrawer, "C"], ["bKash received", demo ? 6100 : bKashTotal, "b"], ["Nagad received", demo ? 2100 : nagadTotal, "n"]].map(([label, amount, letter]) => <div className="wallet-row" key={String(label)}><span className={`wallet-icon ${letter}`}>{letter}</span><span>{label}</span><strong>{money(Number(amount))}</strong></div>)}<div className="ask-pilot"><Sparkles size={17}/><strong>A question on your mind?</strong></div>{["আজকের বাকি হিসাব দেখাও", "গত সপ্তাহের চেয়ে লাভ কেমন?", "বিকাশের লেনদেন মিলিয়ে দাও"].map(p => <button className="question-button" key={p} onClick={() => ask(p)}>{p}<ArrowUpRight size={13}/></button>)}{answer && <p className="inline-answer" role="status">{answer}</p>}</section></div>
    {mobile && <div className="modal-backdrop" onClick={() => setMobile(false)}><div className="mobile-preview panel" role="dialog" aria-modal="true" aria-label="Mobile dashboard preview" onClick={e => e.stopPropagation()}><button autoFocus className="icon-button close-modal" onClick={() => setMobile(false)} aria-label="Close preview"><X/></button><Status>Mobile preview</Status><h2>Nusrat Boutique</h2><Metric label="Today's sales" value={money(demo ? 12500 : todaySales)} detail="Your business in your pocket"/><button className="button teal" onClick={() => { setMobile(false); openVoiceModal(); }}><Mic size={17}/>Record a transaction</button></div></div>}
  </div>;
}
