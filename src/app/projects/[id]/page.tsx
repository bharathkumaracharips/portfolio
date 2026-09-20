import { notFound } from "next/navigation";
import { getProjectDocById } from "@/data/projectDocs";
import { workCategoriesData } from "@/data/work-categories";
import { ProjectDocumentationView } from "@/components/projects/ProjectDocumentationView";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const allProjects = workCategoriesData.flatMap((c) => c.projects);
  return allProjects.map((p) => ({ id: p.id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectDocById(id);
  if (!project) return { title: "Project Not Found | Bharath Kumar Achari" };

  return {
    title: `${project.name} | Technical Architecture & Sequence Flow`,
    description: `${project.subtitle} — Protocol architecture, state machine invariants, sequence diagrams, and benchmarks by Bharath Kumar Achari.`,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = getProjectDocById(id);

  if (!project) {
    notFound();
  }

  const allProjects = workCategoriesData.flatMap((c) =>
    c.projects.map((p) => ({ id: p.id, name: p.name }))
  );

  return <ProjectDocumentationView project={project} allProjects={allProjects} />;
}
