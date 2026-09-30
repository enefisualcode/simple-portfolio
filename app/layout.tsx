import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "../components/language-provider";
import { VisitorCount } from "../components/visitor-count";

export const metadata: Metadata = {
  title: {
    default: "Nabil Falah | AI Automation & Web Solutions",
    template: "%s | Nabil Falah",
  },
  description: "Portfolio Nabil Falah: AI automation, Telegram bots, web dashboards, and practical digital solutions.",
  keywords: ["Nabil Falah", "AI automation", "Telegram bot", "web dashboard", "website developer", "digital solutions"],
  authors: [{ name: "Nabil Falah" }],
  creator: "Nabil Falah",
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Nabil Falah | AI Automation & Web Solutions",
    description: "AI automation, Telegram bots, web dashboards, and practical digital solutions.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary",
    title: "Nabil Falah | AI Automation & Web Solutions",
    description: "AI automation, Telegram bots, web dashboards, and practical digital solutions.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body><LanguageProvider>{children}</LanguageProvider><VisitorCount /></body></html>;
}
