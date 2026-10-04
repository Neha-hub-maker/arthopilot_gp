import type { Transaction } from "@/context/AppContext";
export const demoSales = [8400, 10600, 9200, 11800, 10200, 14800, 12500];
export const demoExpenses = [3400, 4200, 3800, 5200, 4100, 5700, 5200];
export const demoLabels = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
export const demoTransactions: Transaction[] = [
  { id: "demo-1", title: "Cotton saree · in-store sale", category: "Clothing", amount: 2500, type: "inflow", method: "bKash", time: "02:42 PM", voucherNo: "DEMO-001", isAiParsed: true },
  { id: "demo-2", title: "Fabric & supplies", category: "Inventory", amount: 3200, type: "outflow", method: "Cash", time: "01:15 PM", voucherNo: "DEMO-002", isAiParsed: true },
  { id: "demo-3", title: "Handwoven kurti · online order", category: "Clothing", amount: 1800, type: "inflow", method: "Nagad", time: "12:38 PM", voucherNo: "DEMO-003", isAiParsed: true },
];
