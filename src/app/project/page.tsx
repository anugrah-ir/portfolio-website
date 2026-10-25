import type { Metadata } from "next";
import ProjectCarousel from "@/components/ProjectCarousel";
import siteData from "@/data/siteData.json";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore recent applications, systems, and software solutions created by Anugrah Ilhami Rizki.",
};

export default function Project() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-2 py-8 sm:px-4 sm:py-12">
      <section className="flex flex-col items-center justify-center px-4 pb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          My Portfolio Projects
        </h1>
        <p className="mt-2 text-sm text-neutral-400 sm:text-base">
          Explore recent applications, systems, and client solutions
        </p>
      </section>

      <ProjectCarousel projects={siteData.projects} />
    </div>
  );
}

