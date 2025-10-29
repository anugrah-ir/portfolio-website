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
    <div className="flex w-full flex-col items-start gap-8 px-10 pt-10 lg:px-32">
      <header
        id="overview"
        className="flex w-full flex-col gap-4 lg:flex-row lg:justify-between lg:gap-0"
      >
        <h1 className="text-2xl font-medium lg:text-4xl">{project.title}</h1>
        <div className="flex flex-row items-center gap-5 lg:gap-3">
          <Link
            href={project.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row items-center justify-center gap-3 rounded-xl border border-neutral-500 px-3 py-2 hover:border-white hover:bg-neutral-800"
          >
            <Image src="/github.png" width={20} height={20} alt="GitHub logo" />
            <span className="lg:text-md text-xs font-light">
              Github Repository
            </span>
            <ArrowUpRight size={20} />
          </Link>
          <Link
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row items-center justify-center gap-3 rounded-xl bg-neutral-100 px-3 py-2 hover:bg-neutral-400"
          >
            <span className="lg:text-md text-xs font-normal text-black">
              Check it out!
            </span>
            <ArrowUpRight size={20} color="black" />
          </Link>
        </div>
      </header>

      <section>
        <p className="text-md text-neutral-300 lg:text-xl">
          {project.description}
        </p>
      </section>

      <section id="tech-stack" className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-3">
          <Cpu className="h-6 w-6 lg:h-8 lg:w-8" />
          <h2 className="text-lg font-medium lg:text-2xl">Tech Stack</h2>
        </div>
        <ul className="flex flex-row flex-wrap gap-2">
          {project.techStack.map((tech, index) => (
            <li
              key={index}
              className="rounded-lg border border-neutral-500 bg-neutral-800 p-2 text-xs font-medium lg:text-sm"
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
