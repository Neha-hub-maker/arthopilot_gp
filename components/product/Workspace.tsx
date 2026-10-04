"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { ReactNode } from "react";
import { ScrollMotion } from "./Motion";
export default function Workspace({ children }: { children: ReactNode }) {
  const path = usePathname();
  const landing = path === "/";
  return <div className={landing ? "marketing-site" : "workspace"}><ScrollMotion/><Header/><main id="main-content" className={landing ? "marketing-main" : "workspace-main"}>{children}</main>{landing && <Footer/>}</div>;
}
