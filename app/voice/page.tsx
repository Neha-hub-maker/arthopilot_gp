"use client";
import { Mic, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import VoiceExperience from "@/components/product/VoiceExperience";
import { PageHeading, money } from "@/components/product/Primitives";
export default function VoicePage() {
 const { transactions, todaySales, todayExpenses } = useApp();
 return <div className="product-page voice-page"><PageHeading eyebrow="HISHAB · YOUR AI BOOKKEEPER" title="Big things start with a conversation." description="No forms. No formulas. Just tell us what happened in your business." action={<span className="quiet-tag"><Mic size={14}/>Made for Bangla</span>}/><VoiceExperience/><div className="voice-ledger-footer"><div><span className="micro-label">YOUR WORDS ARE ADDING UP</span><h3>Today's recorded activity</h3></div><div><span>Sales</span><strong>{money(todaySales)}</strong></div><div><span>Expenses</span><strong>{money(todayExpenses)}</strong></div><div><span>All saved records</span><strong>{transactions.length}</strong></div></div><section className="panel voice-recent"><div className="panel-heading"><h2>Recent conversations, organized.</h2><span className="muted">Your latest entries</span></div>{transactions.slice(0,5).map(tx=><div className="transaction-row" key={tx.id}><span className="transaction-icon">{tx.type==="inflow"?<ArrowDownLeft size={18}/>:<ArrowUpRight size={18}/>}</span><div><strong>{tx.title}</strong><span>{tx.time} · {tx.voucherNo}</span></div><span>{tx.method}</span><strong>{money(tx.amount)}</strong></div>)}{!transactions.length&&<p className="empty-state">Your first conversation will appear here after you save it.</p>}</section></div>;
}
