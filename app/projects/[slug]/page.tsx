import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "../../../components/project-detail";

const slugs = ["finance-bot", "work-report-bot", "kabisat", "geprek-ajo"];

const projectMetadata: Record<string, { title: string; description: string }> = {
  "finance-bot": { title: "Personal Finance Telegram Bot", description: "Telegram bot untuk mencatat pemasukan dan pengeluaran yang terhubung ke Google Sheets dan dashboard." },
  "work-report-bot": { title: "Work Activity & Sales Report Bot", description: "Bot Telegram untuk pencatatan aktivitas kerja, follow-up, dan laporan penjualan." },
  kabisat: { title: "KABISAT Alumni Website", description: "Website komunitas alumni dengan informasi organisasi, agenda, dan kegiatan." },
  "geprek-ajo": { title: "AJO Ayam Geprek Partnership Website", description: "Landing page kemitraan F&B dengan informasi paket usaha dan CTA WhatsApp." },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectMetadata[slug];
  return project ? { title: project.title, description: project.description } : {};
}

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slugs.includes(slug)) notFound();
  return <ProjectDetail slug={slug} />;
}
