import type { Metadata } from "next";
import "./globals.css";
import "./local-fonts.css";
import "./product.css";
import "./motion.css";
import { MotionProvider } from "@/components/product/Motion";
import { AppProvider } from "@/context/AppContext";
import Workspace from "@/components/product/Workspace";
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
    <html lang="en">
      <body className="bg-bg-canvas font-body-md text-on-surface antialiased selection:bg-vibrant-teal selection:text-white">
        <MotionProvider><AppProvider>
          <Workspace>{children}</Workspace>
          <VoiceModal />
          <FloatingMic />
          <Toast />
        </AppProvider></MotionProvider>
      </body>
    </html>
  );
}
