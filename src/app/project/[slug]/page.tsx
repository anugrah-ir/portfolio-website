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
    <div className="flex flex-col items-start gap-8 w-full px-10 lg:px-32 pt-10">
      <header
        id="overview"
        className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0 w-full"
      >
        <h1 className="text-2xl lg:text-4xl font-medium">{project.title}</h1>
        <div className="flex flex-row items-center gap-5 lg:gap-3">
          <Link
            href={project.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row justify-center items-center gap-3 px-3 py-2 rounded-xl border border-neutral-500 hover:bg-neutral-800 hover:border-white"
          >
            <Image src="/github.png" width={20} height={20} alt="GitHub logo" />
            <span className="text-xs lg:text-md font-light">
              Github Repository
            </span>
            <ArrowUpRight size={20} />
          </Link>
          <Link
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row justify-center items-center gap-3 px-3 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-400"
          >
            <span className="text-xs lg:text-md font-normal text-black">
              Check it out!
            </span>
            <ArrowUpRight size={20} color="black" />
          </Link>
        </div>
      </header>

      <section>
        <p className="text-md lg:text-xl text-neutral-300">
          {project.description}
        </p>
      </section>

      <section id="tech-stack" className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-3">
          <Cpu className="w-6 lg:w-8 h-6 lg:h-8" />
          <h2 className="text-lg lg:text-2xl font-medium">Tech Stack</h2>
        </div>
        <ul className="flex flex-row flex-wrap gap-2">
          {project.techStack.map((tech, index) => (
            <li
              key={index}
              className="rounded-lg bg-neutral-800 text-xs lg:text-sm font-medium p-2 border border-neutral-500"
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
              <div className="relative overflow-hidden aspect-video rounded-2xl lg:rounded-4xl border border-neutral-500">
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
          <Sparkles className="w-6 lg:w-8 h-6 lg:h-8" />
          <h2 className="text-lg lg:text-2xl font-medium">Key Features</h2>
        </div>
        <ul className="bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-xl w-full max-w-2xl">
          {project.keyFeatures.map((keyFeature, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <li
                key={index}
                className="border-b border-neutral-800 last:border-none overflow-hidden px-4"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center gap-5 py-3"
                >
                  <ChevronRight
                    className={`w-4 lg:w-6 h-4 lg:h-6 text-neutral-400 transform transition-transform duration-300 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm lg:text-md font-medium">
                      {keyFeature.feature}
                    </span>
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
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
