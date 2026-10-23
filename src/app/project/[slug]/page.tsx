import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Cpu } from "lucide-react";
import Slider from "@/components/Slider";
import KeyFeatures from "@/components/KeyFeatures";
import siteData from "@/data/siteData.json";

interface Project {
  title: string;
  slug: string;
  description: string;
  githubRepo: string;
  liveDemo: string;
  images: string[];
  techStack: string[];
  keyFeatures: {
    feature: string;
    description: string;
  }[];
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Project({ params }: PageProps) {
  const { slug } = await params;
  const project = siteData.projects.find((p) => p.slug === slug);
  if (!project) {
    return <h1>Project not found</h1>;
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-12 lg:px-8">
      <header
        id="overview"
        className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          {project.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <Link
            href={project.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/80 px-3 py-2 text-xs font-medium text-neutral-200 transition hover:border-neutral-400 hover:bg-neutral-800 sm:text-sm"
          >
            <Image src="/github.png" width={18} height={18} alt="GitHub logo" />
            <span>GitHub</span>
            <ArrowUpRight size={16} />
          </Link>
          <Link
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row items-center justify-center gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200 sm:text-sm"
          >
            <span>Live Demo</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </header>

      <section className="w-full">
        <p className="text-sm leading-relaxed text-neutral-300 sm:text-base lg:text-lg">
          {project.description}
        </p>
      </section>

      <section id="tech-stack" className="flex w-full flex-col gap-3">
        <div className="flex flex-row items-center gap-2.5 sm:gap-3">
          <Cpu className="h-5 w-5 text-neutral-300 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
          <h2 className="text-base font-semibold sm:text-xl lg:text-2xl">
            Tech Stack
          </h2>
        </div>
        <ul className="flex flex-row flex-wrap gap-2">
          {project.techStack.map((tech, index) => (
            <li
              key={index}
              className="rounded-lg border border-neutral-700/60 bg-neutral-800/80 px-2.5 py-1 text-xs font-medium text-neutral-200 sm:text-sm"
            >
              {tech}
            </li>
          ))}
        </ul>
      </section>

      <Slider images={project.images} title={project.title} />

      <KeyFeatures keyFeatures={project.keyFeatures} />
    </div>
  );
}
