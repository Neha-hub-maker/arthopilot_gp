"use client";

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { api, apiError, ApiTransaction, categoryLabel } from "@/lib/api";

export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: "inflow" | "outflow";
  method: "bKash" | "Nagad" | "Cash" | "Bank";
  time: string;
  voucherNo: string;
  isAiParsed?: boolean;
  dialect?: string;
  note?: string;
  fraudRisk?: "safe" | "low" | "high";
  createdAt?: string;
}

export interface FraudIncident {
  id: string;
  title: string;
  channel: string;
  sender: string;
  claimedAmount: number;
  trxId: string;
  time: string;
  riskScore: number;
  status: "active_alert" | "frozen" | "reported" | "dismissed";
  anomalyDetails: string[];
}

interface AppContextType {
  language: "bn" | "en";
  setLanguage: (lang: "bn" | "en") => void;
  toggleLanguage: () => void;
  transactions: Transaction[];
  addTransaction: (message: string, requestId: string) => Promise<boolean>;
  todaySales: number;
  todayExpenses: number;
  netProfit: number;
  cashDrawer: number;
  bKashTotal: number;
  nagadTotal: number;
  // Voice Modal
  isVoiceModalOpen: boolean;
  openVoiceModal: () => void;
  closeVoiceModal: () => void;
  // Fraud
  fraudIncident: FraudIncident;
  freezeIncident: () => void;
  reportIncident: () => void;
  dismissIncident: () => void;
  // Mitra
  mitraModalOpen: boolean;
  openMitraModal: () => void;
  closeMitraModal: () => void;
  mitraRequestStatus: "idle" | "submitted" | "confirmed";
  submitMitraRequest: (data: any) => void;
  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const initialTransactions: Transaction[] = [
  {
    id: "tx-1",
    title: "জামদানি শাড়ি বিক্রি (নগদ)",
    category: "পণ্য বিক্রি",
    amount: 500,
    type: "inflow",
    method: "Cash",
    time: "১০:৪৩ পূর্বাহ্ন",
    voucherNo: "AP-৮৯৪",
    isAiParsed: true,
    dialect: "প্রমিত বাংলা",
    fraudRisk: "safe",
  },
  {
    id: "tx-2",
    title: "কাতান শাড়ি ও ওড়না সেট",
    category: "পণ্য বিক্রি",
    amount: 6100,
    type: "inflow",
    method: "bKash",
    time: "০৯:১৫ পূর্বাহ্ন",
    voucherNo: "AP-৮৯৩",
    isAiParsed: true,
    dialect: "প্রমিত বাংলা",
    fraudRisk: "safe",
  },
  {
    id: "tx-3",
    title: "হাতে বোনা সুতি থ্রি-পিস",
    category: "পণ্য বিক্রি",
    amount: 2100,
    type: "inflow",
    method: "Nagad",
    time: "০৮:৪০ পূর্বাহ্ন",
    voucherNo: "AP-৮৯২",
    isAiParsed: false,
    dialect: "প্রমিত বাংলা",
    fraudRisk: "safe",
  },
  {
    id: "tx-4",
    title: "ক্যাশ কাউন্টার সাধারণ বিক্রি",
    category: "পণ্য বিক্রি",
    amount: 3800,
    type: "inflow",
    method: "Cash",
    time: "০৮:০০ পূর্বাহ্ন",
    voucherNo: "AP-৮৯১",
    isAiParsed: true,
    dialect: "চাটগাঁইয়া",
    fraudRisk: "safe",
  },
  {
    id: "tx-5",
    title: "কাপড় ও সুতা ক্রয় (ইসলামপুর পাইকারি)",
    category: "কাঁচামাল খরচ",
    amount: 3400,
    type: "outflow",
    method: "Cash",
    time: "১১:০০ পূর্বাহ্ন",
    voucherNo: "EXP-৪১২",
    isAiParsed: true,
    dialect: "প্রমিত বাংলা",
  },
  {
    id: "tx-6",
    title: "রেডএক্স ডেলিভারি চার্জ (৩ পার্সেল)",
    category: "ডেলিভারি",
    amount: 520,
    type: "outflow",
    method: "bKash",
    time: "১২:১৫ অপরাহ্ন",
    voucherNo: "EXP-৪১৩",
    isAiParsed: false,
  },
  {
    id: "tx-7",
    title: "দোকানের বিদ্যুৎ বিল পরিশোধ",
    category: "ইউটিলিটি বিল",
    amount: 1280,
    type: "outflow",
    method: "bKash",
    time: "০১:২০ অপরাহ্ন",
    voucherNo: "EXP-৪১৪",
    isAiParsed: true,
    dialect: "প্রমিত বাংলা",
  },
];

const initialFraud: FraudIncident = {
  id: "SEC-98421",
  title: "শাড়ির অর্ডারের জন্য ভুয়া এসএমএস পেমেন্ট",
  channel: "bKash Spoofed SMS",
  sender: "bKash-Merchant (ভুয়া আইডি)",
  claimedAmount: 3500,
  trxId: "9X82LA712Q",
  time: "১৪:২৮ অপরাহ্ন (২ মিনিট আগে)",
  riskScore: 94,
  status: "active_alert",
  anomalyDetails: [
    "অননুমোদিত গেটওয়ে শর্টকোড থেকে প্রেরিত বার্তা",
    "ফন্ট সাইজ ও স্পেসিং mismatch (অফিশিয়াল bKash ফরম্যাট নয়)",
    "বিকাশ কোর লেজারে TrxID: 9X82LA712Q এর কোনো রেকর্ড মেলেনি",
    "ক্রিপ্টোগ্রাফিক ডিজিটাল ভেরিফিকেশন কোড অনুপস্থিত",
  ],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<"bn" | "en">("en");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const pendingSaves = useRef(new Set<string>());
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [fraudIncident, setFraudIncident] = useState<FraudIncident>(initialFraud);
  const [mitraModalOpen, setMitraModalOpen] = useState(false);
  const [mitraRequestStatus, setMitraRequestStatus] = useState<"idle" | "submitted" | "confirmed">("idle");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => { document.documentElement.lang = language; }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "bn" ? "en" : "bn"));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const toTransaction = (tx: ApiTransaction): Transaction => ({
    id: tx.id, title: tx.description, category: categoryLabel(tx.category),
    amount: tx.amount, type: tx.type === "sale" ? "inflow" : "outflow",
    method: tx.method, createdAt: tx.created_at,
    time: new Date(tx.created_at).toLocaleTimeString("bn-BD", { timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit" }),
    voucherNo: `AP-${tx.id.slice(0, 8)}`, isAiParsed: true,
  });

  useEffect(() => {
    let active = true;
    api.transactions().then((rows) => {
      if (active) setTransactions((previous) => {
        const merged = new Map(rows.map((tx) => [tx.id, toTransaction(tx)]));
        previous.forEach((tx) => merged.set(tx.id, tx));
        return Array.from(merged.values()).sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
      });
    }).catch((error) => { if (active) showToast(apiError(error)); });
    return () => { active = false; };
  }, []);

  const addTransaction = async (message: string, requestId: string) => {
    if (pendingSaves.current.has(requestId)) return false;
    pendingSaves.current.add(requestId);
    try {
      const result = await api.chat(message, { save: true, request_id: requestId });
      showToast(result.message);
      if (!result.transaction) return false;
      const tx = toTransaction(result.transaction);
      setTransactions((previous) => [tx, ...previous.filter((item) => item.id !== tx.id)]);
      return true;
    } catch (error) {
      showToast(apiError(error));
      return false;
    } finally { pendingSaves.current.delete(requestId); }
  };

  // Computations
  const todayKey = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });
  const todayTransactions = transactions.filter((tx) => tx.createdAt?.slice(0, 10) === todayKey);
  const todaySales = todayTransactions
    .filter((t) => t.type === "inflow")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const todayExpenses = todayTransactions
    .filter((t) => t.type === "outflow")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netProfit = todaySales - todayExpenses;

  const cashDrawer = transactions
    .filter((t) => t.method === "Cash")
    .reduce((acc, curr) => (curr.type === "inflow" ? acc + curr.amount : acc - curr.amount), 0);

  const bKashTotal = transactions
    .filter((t) => t.method === "bKash" && t.type === "inflow")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const nagadTotal = transactions
    .filter((t) => t.method === "Nagad" && t.type === "inflow")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const freezeIncident = () => {
    setFraudIncident((prev) => ({
      ...prev,
      status: "frozen",
    }));
    showToast(
      language === "bn"
        ? "ডেমো: লেনদেন স্থগিত হিসেবে চিহ্নিত। কোনো ব্যাংক বা পেমেন্ট সেবায় পরিবর্তন করা হয়নি।"
        : "Demo: transaction marked on hold. No bank or payment service was contacted."
    );
  };

  const reportIncident = () => {
    setFraudIncident((prev) => ({
      ...prev,
      status: "reported",
    }));
    showToast(
      language === "bn"
        ? "ডেমো: ঘটনাটি রিপোর্ট হিসেবে চিহ্নিত। পুলিশ বা বিকাশে কোনো রিপোর্ট পাঠানো হয়নি।"
        : "Demo: incident marked as reported. No report was sent to police or bKash."
    );
  };

  const dismissIncident = () => {
    setFraudIncident((prev) => ({
      ...prev,
      status: "dismissed",
    }));
    showToast(language === "bn" ? "অ্যালার্ট প্রত্যাহার করা হয়েছে।" : "Alert dismissed.");
  };

  const submitMitraRequest = (data: any) => {
    setMitraRequestStatus("confirmed");
    setMitraModalOpen(false);
    showToast(
      language === "bn"
        ? "✅ অর্থ মিত্র পরিদর্শন সফলভাবে শিডিউল করা হয়েছে! কামরুল হাসান ২৪ ঘণ্টার মধ্যে যোগাযোগ করবেন।"
        : "✅ Artho Mitra physical verification scheduled! Officer Kamrul Hasan will visit within 24 hours."
    );
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        transactions,
        addTransaction,
        todaySales,
        todayExpenses,
        netProfit,
        cashDrawer,
        bKashTotal,
        nagadTotal,
        isVoiceModalOpen,
        openVoiceModal: () => setIsVoiceModalOpen(true),
        closeVoiceModal: () => setIsVoiceModalOpen(false),
        fraudIncident,
        freezeIncident,
        reportIncident,
        dismissIncident,
        mitraModalOpen,
        openMitraModal: () => setMitraModalOpen(true),
        closeMitraModal: () => setMitraModalOpen(false),
        mitraRequestStatus,
        submitMitraRequest,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
