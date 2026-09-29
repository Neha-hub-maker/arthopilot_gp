import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VoiceModal from "@/components/VoiceModal";
import FloatingMic from "@/components/FloatingMic";
import Toast from "@/components/Toast";

export const metadata: Metadata = {
  title: "ArthoPilot - Bangla AI Financial Companion",
  description:
    "Empowering Bangladeshi small merchants & micro-entrepreneurs through voice bookkeeping, autonomous AI agents, fraud shield, and credit readiness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-canvas font-body-md text-on-surface antialiased selection:bg-vibrant-teal selection:text-white">
        <AppProvider>
          <Header />
          <main className="w-full pt-20 bg-bg-canvas min-h-screen">
            {children}
          </main>
          <Footer />
          <VoiceModal />
          <FloatingMic />
          <Toast />
        </AppProvider>
      </body>
    </html>
  );
}
