"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface SliderProps {
  images: string[];
  title: string;
}

export default function Slider({ images, title }: SliderProps) {
  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        spaceBetween={24}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="w-full overflow-hidden rounded-xl border border-neutral-800 sm:rounded-2xl lg:rounded-3xl"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
              <Image
                src={image.startsWith("/") ? image : `/${image}`}
                fill={true}
                sizes="(max-width: 1024px) 100vw, 1024px"
                alt={`${title} screenshot ${index + 1}`}
                preload={index === 0}
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
