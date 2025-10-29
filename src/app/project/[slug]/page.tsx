"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ArrowUpRight, ChevronRight, Cpu, Sparkles } from "lucide-react";
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
  params: {
    slug: string;
  };
}

export default function Project({ params }: PageProps) {
  const { slug } = params;
  const project = siteData.projects.find((p) => p.slug === slug);
  if (!project) {
    return <h1>Project not found</h1>;
  }

  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

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

      <section className="w-full lg:w-4/5">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={32}
          loop={true}
          speed={2000}
          effect="fade"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={true}
        >
          {project.images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-neutral-500 lg:rounded-4xl">
                <Image
                  src={`/${image}`}
                  fill={true}
                  alt={`${project.title} screenshot ${index + 1}`}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section id="key-features" className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-3">
          <Sparkles className="h-6 w-6 lg:h-8 lg:w-8" />
          <h2 className="text-lg font-medium lg:text-2xl">Key Features</h2>
        </div>
        <ul className="w-full max-w-2xl rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-200">
          {project.keyFeatures.map((keyFeature, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <li
                key={index}
                className="overflow-hidden border-b border-neutral-800 px-4 last:border-none"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="flex w-full items-center gap-5 py-3"
                >
                  <ChevronRight
                    className={`h-4 w-4 transform text-neutral-400 transition-transform duration-300 lg:h-6 lg:w-6 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  />
                  <div className="flex items-center gap-2">
                    <span className="lg:text-md text-sm font-medium">
                      {keyFeature.feature}
                    </span>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-4 text-sm text-neutral-400">
                    {keyFeature.description}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
