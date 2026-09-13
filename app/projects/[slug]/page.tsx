import { notFound } from "next/navigation";
import ProjectDetail from "../../../components/project-detail";

const slugs = ["finance-bot", "work-report-bot", "kabisat"];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slugs.includes(slug)) notFound();
  return <ProjectDetail slug={slug} />;
}
