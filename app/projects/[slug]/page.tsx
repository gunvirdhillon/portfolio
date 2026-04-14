import { notFound, redirect } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/projects";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function LegacyProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }
  redirect(`/?p=${encodeURIComponent(project.slug)}`);
}
