"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LayoutDashboard, Mic, Network, ShieldCheck, TrendingUp, BadgeCheck, Users, Heart, ArrowUpRight, Menu, X, ChevronDown, Bell, PanelLeftClose } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { BrandMark } from "@/components/product/Primitives";

import { MotionToggle } from "@/components/product/Motion";

const navigation = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/voice", label: "Voice bookkeeper", icon: Mic, badge: "AI" },
  { href: "/agents", label: "AI ecosystem", icon: Network },
  { href: "/fraud", label: "Fraud protection", icon: ShieldCheck },
  { href: "/insights", label: "Business insights", icon: TrendingUp },
  { href: "/profile", label: "Credit readiness", icon: BadgeCheck },
  { href: "/mitra", label: "Artho Mitra", icon: Users },
  { href: "/impact", label: "Social impact", icon: Heart },
];
export default function Header() {
  const path = usePathname().replace(/\/$/, "") || "/";
  const { language, toggleLanguage, openVoiceModal, showToast } = useApp();
  const [open, setOpen] = useState(false);
  const banglaLabels: Record<string, string> = { "/dashboard": "ব্যবসার সারসংক্ষেপ", "/voice": "ভয়েস খাতা", "/agents": "এআই ইকোসিস্টেম", "/fraud": "প্রতারণা সুরক্ষা", "/insights": "ব্যবসার অন্তর্দৃষ্টি", "/profile": "ঋণ প্রস্তুতি", "/mitra": "অর্থ মিত্র", "/impact": "সামাজিক প্রভাব" };
  useEffect(() => { setOpen(false); }, [path]);
  const brand = <Link href="/" className="brand"><BrandMark/><span>ArthoPilot<span className="brand-period">.</span></span></Link>;
  if (path === "/") return <header className="marketing-header"><div className="marketing-nav">{brand}<nav className={open ? "landing-links open" : "landing-links"} aria-label="Main navigation"><Link href="/dashboard">Product</Link><Link href="/agents">Our AI agents</Link><Link href="/impact">Our mission</Link><Link href="/insights">Insights <ArrowUpRight size={12}/></Link><button className="mobile-only language-button" onClick={toggleLanguage}>{language === "bn" ? "Switch to English" : "বাংলায় দেখুন"}</button></nav><div className="nav-actions"><MotionToggle/><button className="language-button" onClick={toggleLanguage}>{language === "bn" ? "বাংলা / EN" : "EN / বাংলা"}</button><Link href="/dashboard" className="button navy">Open workspace <ArrowUpRight size={16}/></Link><button className="menu-toggle icon-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open ? <X/> : <Menu/>}</button></div></div></header>;
  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    {open && <button className="sidebar-scrim" onClick={() => setOpen(false)} aria-label="Close navigation"/>}
    <aside className={`sidebar ${open ? "open" : ""}`}><div className="sidebar-brand">{brand}<button className="mobile-only icon-button" onClick={() => setOpen(false)} aria-label="Close menu"><PanelLeftClose size={19}/></button></div>
      <Link href="/profile" className="business-switch"><span className="business-avatar">N</span><span><strong>Nusrat Boutique</strong><small>Fashion business</small></span><ChevronDown size={14}/></Link>
      <span className="sidebar-label">YOUR WORKSPACE</span>
      <nav aria-label="Workspace navigation">{navigation.map((item, i) => <Link key={item.href} href={item.href} aria-current={path === item.href ? "page" : undefined} className={`side-link ${path === item.href ? "active" : ""} ${i === 5 ? "nav-separator" : ""}`}><item.icon size={18}/><span>{language === "bn" ? banglaLabels[item.href] : item.label}</span>{item.badge && <small>{item.badge}</small>}</Link>)}</nav>
      <div className="sidebar-bottom"><div className="sidebar-voice"><span className="tiny-orb"/><h4>Your business. Your words.</h4><p>A little conversation.<br/>A lot more clarity.</p><button onClick={openVoiceModal}>Let's talk <Mic size={15}/></button></div><Link href="/profile" className="sidebar-user"><img src="/images/entrepreneur.png" alt="Nusrat's business profile"/><span><strong>Nusrat Jahan</strong><small>Entrepreneur · Dhaka</small></span><ChevronDown size={14}/></Link></div>
    </aside>
    <header className="workspace-topbar"><div className="breadcrumb"><button className="mobile-only icon-button" onClick={() => setOpen(!open)} aria-label="Open navigation"><Menu size={21}/></button><span>Workspace</span><span className="breadcrumb-slash">/</span><strong>{navigation.find(n => n.href === path)?.label || "ArthoPilot"}</strong></div><div className="topbar-actions"><MotionToggle/><span className="local-indicator"><i/>Local workspace</span><button className="language-button" onClick={toggleLanguage}>{language === "bn" ? "বাংলা" : "EN"}<ChevronDown size={12}/></button><button className="icon-button notification-button" aria-label="Notifications" onClick={() => showToast("You're all caught up. Your saved records are available in Overview.")}><Bell size={18}/></button><Link href="/profile" className="topbar-avatar" aria-label="Open profile">NJ</Link></div></header>
  </>;
}
