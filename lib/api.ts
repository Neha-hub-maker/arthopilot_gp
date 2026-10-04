// Browser API client; the existing Next.js UI remains at the project root.
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

export interface ApiTransaction {
  id: string;
  type: "sale" | "expense";
  amount: number;
  category: string;
  method: "Cash" | "bKash" | "Nagad" | "Bank";
  description: string;
  created_at: string;
}

export interface AgentResponse {
  agent: "hishab" | "pahara" | "niyom" | "unnoti" | null;
  message: string;
  status: "ok" | "needs_clarification" | "no_sources";
  transaction: ApiTransaction | null;
  preview: Pick<ApiTransaction, "type" | "amount" | "category" | "method"> | null;
  risk_level: "Low" | "Medium" | "High" | null;
  reasons: string[];
  citations: { source: string; chunk: number; excerpt: string; score: number }[];
  insights?: {
    period_start: string; period_end: string; sales: number; expenses: number;
    net_cash_flow: number; previous_sales: number; sales_change_percent: number | null;
    transaction_count: number; suggestions: string[];
    daily: { date: string; sales: number; expenses: number }[];
  } | null;
  trace?: string[];
}

async function request<T>(path: string, body?: unknown): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45000);
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      method: body === undefined ? "GET" : "POST",
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`API request failed (${response.status})`);
    return await response.json() as T;
  } catch (error) {
    if (error instanceof TypeError || (error instanceof Error && error.name === "AbortError")) {
      throw new Error("ব্যাকএন্ডে সংযোগ হয়নি বা সময় শেষ হয়েছে। backend/start.ps1 চালু করে আবার চেষ্টা করুন।");
    }
    throw error;
  } finally { clearTimeout(timer); }
}

export const api = {
  chat: (message: string, options: { save?: boolean; request_id?: string; agent?: AgentResponse["agent"] } = {}) =>
    request<AgentResponse>("/chat", { message, ...options }),
  fraudCheck: (message: string) => request<AgentResponse>("/fraud-check", { message }),
  insights: () => request<AgentResponse>("/insights"),
  transactions: async () => {
    const all: ApiTransaction[] = [];
    let total = 0;
    do {
      const page = await request<{ transactions: ApiTransaction[]; total: number }>(`/transactions?limit=500&offset=${all.length}`);
      all.push(...page.transactions);
      total = page.total;
      if (!page.transactions.length) break;
    } while (all.length < total);
    return all;
  },
};

export const apiError = (error: unknown) => error instanceof Error ? error.message : "অনুরোধটি সম্পন্ন হয়নি। আবার চেষ্টা করুন।";

export const categoryLabel = (category: string) => ({
  clothing: "কাপড়", rent: "দোকান ভাড়া", utilities: "ইউটিলিটি বিল",
  delivery: "ডেলিভারি", groceries: "মুদিপণ্য", general: "সাধারণ",
}[category] || category);
