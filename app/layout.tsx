import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Nabil Falah — AI, Automation & Digital Solutions", description: "Portfolio Nabil Falah. Exploring AI, automation, Telegram bots, dashboards, and simple digital solutions.", openGraph: { title: "Nabil Falah — AI, Automation & Digital Solutions", description: "Portfolio Nabil Falah. Exploring AI, automation, Telegram bots, dashboards, and simple digital solutions.", type: "website" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="id"><body>{children}</body></html>; }
