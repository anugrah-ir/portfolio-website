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
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-neutral-500 lg:rounded-4xl">
                <Image
                  src={`/${image}`}
                  fill={true}
                  alt={`${title} screenshot ${index + 1}`}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
}