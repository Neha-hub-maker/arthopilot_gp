"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import { Pause, Play, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

const MotionContext = createContext({ enabled: false, reduced: true, paused: false, toggle: () => {} });
export const useMotion = () => useContext(MotionContext);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(true);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(preference.matches);
    const visibility = () => setVisible(!document.hidden);
    sync(); visibility();
    try { setPaused(sessionStorage.getItem("arthopilot-motion-paused") === "true"); } catch {}
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", visibility);
    return () => { preference.removeEventListener("change", sync); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  const toggle = () => setPaused(previous => {
    try { sessionStorage.setItem("arthopilot-motion-paused", String(!previous)); } catch {}
    return !previous;
  });
  return <MotionContext.Provider value={{ enabled: !reduced && !paused && visible, reduced, paused, toggle }}>
    <div className={`motion-root ${reduced || paused ? "motion-static" : ""} ${!visible ? "motion-suspended" : ""}`}>{children}</div>
  </MotionContext.Provider>;
}

export function MotionToggle() {
  const { paused, reduced, toggle } = useMotion();
  return <button className="icon-button motion-toggle" onClick={toggle} disabled={reduced} aria-pressed={paused || reduced} aria-label={reduced ? "Reduced motion enabled by your device" : paused ? "Resume ambient motion" : "Pause ambient motion"} title={reduced ? "Using your reduced-motion preference" : paused ? "Resume ambient motion" : "Pause ambient motion"}>{paused || reduced ? <Play size={13}/> : <Pause size={13}/>}</button>;
}

export function useInView<T extends HTMLElement>(once = false) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) { setInView(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting && once) observer.disconnect();
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);
  return { ref, inView };
}

// Enhance existing elements directly: no layout wrappers or hidden server content.
export function ScrollMotion() {
  const route = usePathname();
  const { reduced, paused } = useMotion();
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || !("IntersectionObserver" in window) || reduced || paused) return;
    const targets = main.querySelectorAll<HTMLElement>(".section-heading, .agent-feature, .conversation-section, .story-image, .story-copy > *, .closing-cta, .metrics-grid > *, .insight-metrics > *, .ai-insight, .voice-recent, .dashboard-bottom-grid > *, .agent-playground, .risk-explanation, .safety-principles > *, .insights-bottom > *");
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target as HTMLElement;
      element.dataset.reveal = "shown";
      reveal.unobserve(element);
    }), { threshold: 0.12, rootMargin: "0px 0px -20px 0px" });
    targets.forEach((element, i) => {
      if (element.dataset.reveal === "shown") return;
      element.style.setProperty("--reveal-delay", `${Math.min(i % 4 * 65, 195)}ms`);
      element.dataset.reveal = "pending";
      reveal.observe(element);
    });
    const zones = main.querySelectorAll<HTMLElement>(".hero-product-scene, .ecosystem-map, .landing-agent-network, .voice-experience, .waveform");
    const ambient = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle("motion-offscreen", !entry.isIntersecting)));
    zones.forEach(zone => ambient.observe(zone));
    return () => {
      reveal.disconnect(); ambient.disconnect();
      targets.forEach(element => { element.dataset.reveal = "shown"; });
      zones.forEach(zone => zone.classList.remove("motion-offscreen"));
    };
  }, [route, reduced, paused]);
  return null;
}

export function AnimatedNumber({ value }: { value: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(true);
  const visual = useRef<HTMLSpanElement>(null);
  const current = useRef(0);
  const { enabled } = useMotion();
  useEffect(() => {
    const element = visual.current;
    if (!element) return;
    const match = value.match(/-?\d[\d,]*(?:\.\d+)?/);
    const amount = match ? Number(match[0].replaceAll(",", "")) : NaN;
    if (!enabled || !inView || !Number.isFinite(amount)) {
      element.textContent = value;
      if (!enabled && inView) current.current = amount;
      return;
    }
    const from = Number.isFinite(current.current) ? current.current : 0;
    const start = performance.now();
    let frame = 0;
    const render = (now: number) => {
      const progress = Math.min((now - start) / 850, 1);
      current.current = from + (amount - from) * (1 - (1 - progress) ** 3);
      element.textContent = progress === 1 ? value : value.replace(match![0], Math.round(current.current).toLocaleString("en-BD"));
      if (progress < 1) frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, [value, enabled, inView]);
  return <span ref={ref} className="animated-number"><span className="number-reserve">{value}</span><span ref={visual} className="number-display" aria-hidden="true">{value}</span></span>;
}

export function useAmbientIndex(count: number, ref: RefObject<HTMLElement>, interval = 10000) {
  const { enabled } = useMotion();
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) { setInView(true); return; }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
  useEffect(() => {
    if (!enabled || !inView || count < 2) return;
    const timer = setInterval(() => setIndex(previous => (previous + 1) % count), interval);
    return () => clearInterval(timer);
  }, [enabled, inView, count, interval]);
  return index % Math.max(count, 1);
}

export function HeroMotion({ children }: { children: ReactNode }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const { enabled } = useMotion();
  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled || !inView || !matchMedia("(hover: hover) and (pointer: fine) and (min-width: 701px)").matches) return;
    let frame = 0, x = 0;
    const render = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--hero-x", `${x}px`);
      element.style.setProperty("--hero-y", `${Math.max(-8, Math.min(8, (innerHeight / 2 - rect.top - rect.height / 2) * .025))}px`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
    const move = (event: PointerEvent) => { x = (event.clientX / innerWidth - .5) * 5; schedule(); };
    const reset = () => { x = 0; schedule(); };
    window.addEventListener("scroll", schedule, { passive: true });
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", reset);
    schedule();
    return () => {
      cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule);
      element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", reset);
      element.style.removeProperty("--hero-x"); element.style.removeProperty("--hero-y");
    };
  }, [enabled, inView, ref]);
  return <div ref={ref} className="hero-product-scene">{children}</div>;
}

export function CompanionGreeting({ growth }: { growth?: number | null }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [greeting, setGreeting] = useState("Welcome back, Nusrat 👋");
  useEffect(() => {
    const hour = Number(new Intl.DateTimeFormat("en", { timeZone: "Asia/Dhaka", hour: "numeric", hourCycle: "h23" }).format(new Date()));
    setGreeting(`Good ${hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening"}, Nusrat 👋`);
  }, []);
  const messages = [greeting, "Need help recording today's business update?", growth != null && growth > 0 ? `Your recorded weekly sales are up ${growth}%.` : "A little update today. A clearer picture tomorrow."];
  const index = useAmbientIndex(messages.length, ref, 12000);
  return <span className="companion-greeting" ref={ref}><Sparkles size={13}/><span key={messages[index]}>{messages[index]}</span></span>;
}

export function AgentConnections({ landing = false }: { landing?: boolean }) {
  const paths = landing ? ["M500 12 C500 65 125 30 125 90", "M500 12 C500 65 375 30 375 90", "M500 12 C500 65 625 30 625 90", "M500 12 C500 65 875 30 875 90"] : ["M350 250 C350 110 175 180 135 125", "M350 250 C350 110 520 180 565 125", "M350 250 C350 390 175 320 135 390", "M350 250 C350 390 520 320 565 390"];
  return <svg className={landing ? "landing-connections" : "ecosystem-connections"} viewBox={landing ? "0 0 1000 90" : "0 0 700 500"} preserveAspectRatio="none" aria-hidden="true">{paths.map((d, i) => <g key={d}><path className="network-track" d={d}/><path className="network-signal" d={d} pathLength="1" style={{ animationDelay: `${i * -2}s` }}/></g>)}</svg>;
}
