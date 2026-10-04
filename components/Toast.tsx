"use client";
import { Info } from "lucide-react";
import { useApp } from "@/context/AppContext";
export default function Toast() { const { toastMessage } = useApp(); return toastMessage ? <div className="product-toast" role="status" aria-live="polite"><Info size={18}/><span>{toastMessage}</span></div> : null; }
