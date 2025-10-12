"use client"
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const projects = [
  { id: 1, title: "TTH MyVisitors1", description: "A visitor management system with Role-Based Access Control (RBAC).", image: "project-image.png", techStack: ["Node.js", "Express.js", "PostgreSQL", "Sequelize"] },
  { id: 2, title: "TTH MyVisitors2", description: "A visitor management system with Role-Based Access Control (RBAC).", image: "project-image.png", techStack: ["Node.js", "Express.js", "PostgreSQL", "Sequelize"] },
  { id: 3, title: "TTH MyVisitor3", description: "A visitor management system with Role-Based Access Control (RBAC).", image: "project-image.png", techStack: ["Node.js", "Express.js", "PostgreSQL", "Sequelize"] },
  { id: 4, title: "TTH MyVisitors4", description: "A visitor management system with Role-Based Access Control (RBAC).", image: "project-image.png", techStack: ["Node.js", "Express.js", "PostgreSQL", "Sequelize"] },
  { id: 5, title: "TTH MyVisitors5", description: "A visitor management system with Role-Based Access Control (RBAC).", image: "project-image.png", techStack: ["Node.js", "Express.js", "PostgreSQL", "Sequelize"] },
  { id: 6, title: "TTH MyVisitor6", description: "A visitor management system with Role-Based Access Control (RBAC).", image: "project-image.png", techStack: ["Node.js", "Express.js", "PostgreSQL", "Sequelize"] },
  { id: 7, title: "TTH MyVisitors7", description: "A visitor management system with Role-Based Access Control (RBAC).", image: "project-image.png", techStack: ["Node.js", "Express.js", "PostgreSQL", "Sequelize"] },
  { id: 8, title: "TTH MyVisitors8", description: "A visitor management system with Role-Based Access Control (RBAC).", image: "project-image.png", techStack: ["Node.js", "Express.js", "PostgreSQL", "Sequelize"] }
];

export default function Project() {
  return (
    <>
      <section className="flex flex-row justify-center items-center pt-10">
        <h1 className="text-3xl lg:text-4xl font-medium">My Portfolio Projects</h1>
      </section>

      <section className="flex flex-row justify-center items-center px-1 lg:px-10 pt-10">

        <button className="custom-prev">
          <ChevronLeft
            size={64}
            className="cursor-pointer hover:opacity-50 transition"
          />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          loop
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 25
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20
            }
          }}
          className="w-[70vw] lg:w-[80vw]"
        >
          {projects.map((project) => (
            <SwiperSlide
              key={project.id}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <Link
                href={`/project/${project.id}`}
                className="group flex flex-col items-center w-full aspect-[3/4] lg:aspect-[16/18] rounded-3xl bg-neutral-900 border border-neutral-700 overflow-hidden transition-all duration-300 hover:bg-neutral-800 hover:border-white hover:border-1"
              >
                <div className="relative w-full aspect-[16/9] overflow-hidden shadow-2xl shadow-neutral-800">
                  <Image
                    src={`/${project.image}`}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col gap-4 p-4">
                  <h3 className="text-center text-sm lg:text-md font-semibold">
                    {project.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-neutral-200">
                    {project.description}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, index) => (
                      <li
                        key={index}
                        className="rounded-lg bg-neutral-800 text-xs lg:text-sm text-bold p-2"
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
            className="cursor-pointer hover:opacity-50 transition"
          />
        </button>

      </section>
    </>
  );
}