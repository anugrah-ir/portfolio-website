import type { Metadata } from "next";
import siteData from "@/data/siteData.json";

export const metadata: Metadata = {
  title: "About Me",
  description: siteData.author.bio,
};

export default function About() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 md:py-16">
      <h1 className="mb-8 text-center text-3xl font-bold tracking-tight sm:mb-12 sm:text-4xl">
        About Me
      </h1>

      {/* Profile & Skills Card */}
      <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 shadow-lg backdrop-blur-xs sm:p-8 md:p-10">
        <div className="flex flex-col gap-2 sm:gap-3">
          <div className="inline-flex w-fit items-center rounded-full border border-neutral-700/60 bg-neutral-800/80 px-3.5 py-1 text-xs font-medium text-neutral-300 sm:text-sm">
            {siteData.author.role}
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {siteData.author.name}
          </h2>
        </div>

        <p className="mt-4 text-base leading-relaxed text-neutral-300 sm:mt-6 sm:text-lg">
          {siteData.author.bio}
        </p>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-neutral-800/80" />

        {/* Skills section */}
        <div>
          <h3 className="mb-4 text-xl font-semibold sm:text-2xl">Tech Stack</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {siteData.author.techStack.map((tech, index) => (
              <span
                key={index}
                className="rounded-full border border-neutral-700/60 bg-neutral-800/80 px-3.5 py-1.5 text-xs text-neutral-200 transition-colors hover:border-neutral-500 sm:px-4 sm:py-2 sm:text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

