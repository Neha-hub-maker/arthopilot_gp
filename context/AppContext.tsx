"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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
  addTransaction: (tx: Omit<Transaction, "id">) => void;
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
  const [language, setLanguage] = useState<"bn" | "en">("bn");
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [fraudIncident, setFraudIncident] = useState<FraudIncident>(initialFraud);
  const [mitraModalOpen, setMitraModalOpen] = useState(false);
  const [mitraRequestStatus, setMitraRequestStatus] = useState<"idle" | "submitted" | "confirmed">("idle");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "bn" ? "en" : "bn"));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addTransaction = (newTx: Omit<Transaction, "id">) => {
    const tx: Transaction = {
      ...newTx,
      id: `tx-${Date.now()}`,
    };
    setTransactions((prev) => [tx, ...prev]);
    showToast(
      language === "bn"
        ? `✅ হিসাব সফলভাবে সংরক্ষণ করা হয়েছে: ৳${tx.amount.toLocaleString()}`
        : `✅ Entry successfully saved: ৳${tx.amount.toLocaleString()}`
    );
  };

  // Computations
  const todaySales = transactions
    .filter((t) => t.type === "inflow")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const todayExpenses = transactions
    .filter((t) => t.type === "outflow")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netProfit = todaySales - todayExpenses;

  const cashDrawer = transactions
    .filter((t) => t.method === "Cash")
    .reduce((acc, curr) => (curr.type === "inflow" ? acc + curr.amount : acc - curr.amount), 4300);

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
        ? "🛡️ সতর্কতা কার্যকর: পার্সেল ডেলিভারি আটকে রাখা হয়েছে এবং ব্যাংককে অবহিত করা হয়েছে।"
        : "🛡️ Action taken: Delivery successfully frozen and reported to gateway security."
    );
  };

  const reportIncident = () => {
    setFraudIncident((prev) => ({
      ...prev,
      status: "reported",
    }));
    showToast(
      language === "bn"
        ? "🚨 জালিয়াতি রিপোর্ট বাংলাদেশ সাইবার পুলিশ ও বিকাশ সিকিউরিটিতে জমা দেওয়া হয়েছে।"
        : "🚨 Scammer shortcode blacklisted and report dispatched to Cyber Police."
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
