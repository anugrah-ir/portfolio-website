import type { Metadata } from "next";
import Image from "next/image";
import siteData from "@/data/siteData.json";

export const metadata: Metadata = {
  title: "About Me",
  description: siteData.author.bio,
};

export default function About() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 md:py-16">
      <h1 className="mb-8 text-center text-3xl font-bold sm:mb-12 sm:text-4xl">
        About Me
      </h1>

      <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:flex-row md:items-center">
        {/* Left column: Profile picture */}
        <div className="relative flex h-40 w-40 shrink-0 items-center justify-center overflow-hidden rounded-full sm:h-48 sm:w-48">
          <Image
            src="/profile-background.png"
            alt=""
            fill
            sizes="(max-width: 640px) 160px, 192px"
            preload
            className="rounded-full object-cover"
            aria-hidden="true"
          />
          <Image
            src="/me.png"
            alt="My profile picture"
            fill
            sizes="(max-width: 640px) 160px, 192px"
            preload
            className="rounded-full object-cover shadow-lg"
          />
        </div>

        {/* Right column: Intro text */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {siteData.author.name}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-300 sm:mt-4 sm:text-lg">
            {siteData.author.bio}
          </p>
        </div>
      </div>

      {/* Skills section */}
      <div className="mt-10 sm:mt-12 md:mt-16">
        <h3 className="mb-4 text-xl font-semibold sm:text-2xl">Tech Stack</h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {siteData.author.techStack.map((tech, index) => (
            <span
              key={index}
              className="rounded-full border border-neutral-700/60 bg-neutral-800/80 px-3.5 py-1.5 text-xs text-neutral-200 sm:px-4 sm:py-2 sm:text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

