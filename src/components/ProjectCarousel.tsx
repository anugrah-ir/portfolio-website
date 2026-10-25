"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface ProjectItem {
  title: string;
  slug: string;
  description: string;
  images: string[];
  techStack: string[];
}

interface ProjectCarouselProps {
  projects: ProjectItem[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  return (
    <section className="flex w-full items-center justify-center gap-1 sm:gap-3">
      <button
        type="button"
        aria-label="Previous project"
        className="custom-prev flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/90 text-neutral-300 shadow-md transition hover:scale-105 hover:border-neutral-500 hover:text-white sm:h-12 sm:w-12"
      >
        <ChevronLeft className="h-5 w-5 sm:h-7 sm:w-7" />
      </button>

      <div className="w-[calc(100vw-5.5rem)] sm:w-[calc(100vw-8rem)] max-w-6xl">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          loop
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="w-full py-4"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project.slug} className="h-auto">
              <Link
                href={`/project/${project.slug}`}
                className="group flex h-full min-h-[380px] w-full flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/90 shadow-lg transition-all duration-300 hover:border-neutral-600 hover:bg-neutral-800/80 sm:min-h-[420px] sm:rounded-3xl"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-800 shrink-0">
                  <Image
                    src={
                      project.images[0]?.startsWith("/")
                        ? project.images[0]
                        : `/${project.images[0]}`
                    }
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    preload={index === 0}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-3 p-4 sm:p-5">
                  <div>
                    <h2 className="text-base font-semibold text-white transition-colors group-hover:text-neutral-200 sm:text-lg">
                      {project.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-neutral-300 sm:text-sm">
                      {project.description}
                    </p>
                  </div>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-2 sm:gap-2">
                    {project.techStack.map((tech, techIdx) => (
                      <li
                        key={techIdx}
                        className="rounded-md border border-neutral-700/60 bg-neutral-800 px-2 py-1 text-xs font-medium text-neutral-300"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button
        type="button"
        aria-label="Next project"
        className="custom-next flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/90 text-neutral-300 shadow-md transition hover:scale-105 hover:border-neutral-500 hover:text-white sm:h-12 sm:w-12"
      >
        <ChevronRight className="h-5 w-5 sm:h-7 sm:w-7" />
      </button>
    </section>
  );
}
