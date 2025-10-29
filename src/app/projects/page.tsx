"use client";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import siteData from "@/data/siteData.json";

export default function Project() {
  return (
    <>
      <section className="flex flex-row items-center justify-center pt-10">
        <h1 className="text-3xl font-medium lg:text-4xl">
          My Portfolio Projects
        </h1>
      </section>

      <section className="flex flex-row items-center justify-center px-1 pt-10 lg:px-10">
        <button className="custom-prev">
          <ChevronLeft
            size={64}
            className="cursor-pointer transition hover:opacity-50"
          />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          loop
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          className="w-[70vw] lg:w-[80vw]"
        >
          {siteData.projects.map((project, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                href={`/project/${project.slug}`}
                className="group flex aspect-[3/4] w-full flex-col items-center overflow-hidden rounded-3xl border border-neutral-700 bg-neutral-900 transition-all duration-300 hover:border-1 hover:border-white hover:bg-neutral-800 lg:aspect-[16/18]"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden shadow-2xl shadow-neutral-800">
                  <Image
                    src={`/${project.images[0]}`}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col gap-4 p-4">
                  <h3 className="lg:text-md text-center text-sm font-semibold">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-200 lg:text-sm">
                    {project.description}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, index) => (
                      <li
                        key={index}
                        className="text-bold rounded-lg bg-neutral-800 p-2 text-xs lg:text-sm"
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

        <button className="custom-next">
          <ChevronRight
            size={64}
            className="cursor-pointer transition hover:opacity-50"
          />
        </button>
      </section>
    </>
  );
}
