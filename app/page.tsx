"use client";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, CheckCheck, Mic, ShieldCheck, Sparkles, TrendingUp, Play, Globe2, Heart, MoveUpRight } from "lucide-react";
import { useRef } from "react";
import { useApp } from "@/context/AppContext";
import { agents, BrandMark, Eyebrow, Waveform, Chart } from "@/components/product/Primitives";

import { AnimatedNumber, AgentConnections, HeroMotion, useAmbientIndex } from "@/components/product/Motion";

export default function LandingPage() {
  const { openVoiceModal, language } = useApp();
  const heroRef = useRef<HTMLElement>(null);
  const activity = useAmbientIndex(3, heroRef, 10000);
  const events = ["আজকে ৫০০ টাকার বিক্রি হয়েছে", "কাপড় কিনতে ১,২০০ টাকা খরচ করেছি", "আজ বিকাশে ৮০০ টাকা বিক্রি করেছি"];
  return <div className="landing">
    <section className="hero-section" ref={heroRef}><div className="hero-grid-bg"/><div className="hero-inner"><div className="hero-copy">
      <Eyebrow>BIG AMBITIONS. A LITTLE AI HELP.</Eyebrow>
      <h1>{language === "bn" ? <>আপনার এআই সাথী<br/>ব্যবসার প্রতিটি<br/><span>সঠিক সিদ্ধান্তে।</span></> : <>Your AI partner<br/>for smarter<br/><span>business decisions.</span></>}</h1>
      <p>ArthoPilot helps small entrepreneurs manage finances, avoid fraud, and grow their businesses through simple Bangla conversations.</p>
      <div className="hero-ctas"><Link href="/dashboard" className="button teal large">Meet your business partner <ArrowUpRight size={18}/></Link><button className="button text-button" onClick={openVoiceModal}><span className="play-circle"><Play size={13} fill="currentColor"/></span>Hear it in Bangla</button></div>
      <div className="hero-proof"><div className="stacked-avatars"><img src="/images/entrepreneur.png" alt="A boutique entrepreneur"/><span>র</span><span>আ</span></div><div><strong>For the people building something.</strong><span>Bangla-first. Human at heart.</span></div></div>
    </div><HeroMotion>
      <div className="orbital-outline one"/><div className="orbital-outline two"/>
      <div className="hero-product"><div className="product-window-bar"><div className="window-dots"><i/><i/><i/></div><span><BrandMark small/>arthopilot / your workspace</span><span className="demo-window-label">PRODUCT PREVIEW</span></div>
      <div className="product-window-body"><div className="preview-greeting"><div><span>YOUR BUSINESS, AT A GLANCE</span><h3>Looking good, Nusrat <span className="greeting-dot">✦</span></h3></div><img src="/images/entrepreneur.png" alt="Nusrat"/></div>
      <div className="preview-metrics"><div><span>Today's sales</span><strong><AnimatedNumber value="৳12,500"/></strong><small>↗ 18.2% this week</small></div><div><span>Expenses</span><strong><AnimatedNumber value="৳5,200"/></strong><small className="muted">Everything in order</small></div><div><span>Profit</span><strong><AnimatedNumber value="৳7,300"/></strong><small>↗ A little more growth</small></div></div>
      <div className="preview-chart-header"><strong>A good week for your business</strong><span>Sales <i/></span></div><Chart sales={[4200, 7200, 6000, 10000, 8500, 13500, 12500]} labels={["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]}/>
      <div className="preview-insight"><Sparkles size={17}/><span>Your evening sales are growing.<br/><strong>Let's get you ready for Friday.</strong></span><ArrowUpRight size={16}/></div></div></div>
      <div className="floating-transaction" key={activity}><span className="transaction-tick"><CheckCheck size={20}/></span><div><small>HISHAB HAS IT COVERED</small><strong>{events[activity]}</strong><span>Transaction understood <i>✓</i></span></div><span className="live-dot"/></div>
      <div className="floating-assistant"><div className="mini-ai-orb"><Sparkles size={20}/></div><div><strong>A little less admin.</strong><span>A lot more possibility.</span></div><Waveform/></div>
      <span className="scene-caption"><ShieldCheck size={13}/> Your numbers stay yours. Always.</span>
    </HeroMotion></div>
    <div className="hero-bottom-strip"><span>SMALL BUSINESS.<br/><strong>EXTRAORDINARY POTENTIAL.</strong></span><div><Mic/>Speak naturally</div><div><ShieldCheck/>Decide confidently</div><div><TrendingUp/>Grow on your terms</div><span className="made-in"><span>●</span> Made for Bangladesh</span></div></section>
    <section className="landing-section agents-intro"><div className="section-heading"><div><Eyebrow>ONE COMPANION. FOUR SUPERPOWERS.</Eyebrow><h2>A whole team.<br/>In your corner.</h2></div><p>From the first sale of the day to your next big idea,<br/>there's an agent for that.</p></div><div className="landing-agent-network"><span><BrandMark small/>ArthoPilot AI Core</span><AgentConnections landing/></div><div className="agent-feature-grid">{agents.map((agent, index) => <Link href={agent.href} className={`agent-feature ${agent.color}`} key={agent.id}><span className="feature-index">0{index + 1} / {agent.bn}</span><agent.icon size={30} strokeWidth={1.4}/><h3>{agent.name}<ArrowUpRight size={18}/></h3><strong>{agent.role}</strong><p>{agent.description}</p></Link>)}</div></section>
    <section className="conversation-section"><div><Eyebrow>NO SPREADSHEETS. JUST YOU.</Eyebrow><h2>Your words.<br/>A clearer picture.</h2><p>Say it the way you would to a friend. ArthoPilot turns everyday Bangla into organized business records.</p><button className="button navy" onClick={openVoiceModal}>Try a conversation <Mic size={17}/></button></div><div className="conversation-demo"><span className="micro-label">A SMALL CONVERSATION, A BIG DIFFERENCE</span><div className="conversation-quote">“আজকে ৫০০ টাকার বিক্রি হয়েছে”</div><Waveform/><div className="conversation-result"><Check size={18}/><span>Sale understood</span><strong>৳500.00</strong><span className="status teal">Ready to save</span></div><span className="muted text-xs">Illustrative conversation · you confirm before saving</span></div></section>
    <section className="landing-section story-section"><div className="story-image"><img src="/images/entrepreneur.png" alt="A Bangladeshi woman managing her boutique from her home workspace"/><div className="story-caption"><span>EVERY BUSINESS HAS A STORY.</span><strong>Let's make the next chapter brighter.</strong></div></div><div className="story-copy"><Eyebrow>PROGRESS SHOULD INCLUDE EVERYONE.</Eyebrow><h2>Built for entrepreneurs who deserve access to financial guidance.</h2><p>The women turning their craft into a livelihood. The shopkeepers who know every customer by name. The dreamers starting something of their own.</p><p>You already have the ambition.<br/>We're here to help with the next step.</p><Link href="/impact" className="inline-link">Meet the mission behind ArthoPilot <ArrowUpRight size={17}/></Link><div className="story-values"><span><Heart size={16}/>Human-centered</span><span><Globe2 size={16}/>Bangladesh-born</span></div></div></section>
    <section className="closing-cta"><span className="closing-star">✦</span><Eyebrow>YOUR NEXT CHAPTER STARTS HERE.</Eyebrow><h2>Small business.<br/>Bigger possibilities.</h2><Link href="/dashboard" className="button teal large">Let's build your tomorrow <ArrowUpRight size={18}/></Link><p>আপনার ব্যবসা। আপনার ভাষা। আপনার অর্থপাইলট।</p></section>
  </div>;
}
