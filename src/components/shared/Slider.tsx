"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SlideItem {
  image: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  href?: string;
}

interface SliderProps {
  slides: SlideItem[],
  spaceBetween?: number;
  slidesPerView?: number;
  imageOnly?: boolean;
}

export default function Slider({slides, spaceBetween = 50, slidesPerView = 3, imageOnly = false,}: SliderProps) {

  const arrowStyles = [
    "[--swiper-navigation-color:var(--primary)]",
    // circle
    "[&_.swiper-button-prev]:size-10! [&_.swiper-button-next]:size-10!",
    "[&_.swiper-button-prev]:rounded-full [&_.swiper-button-next]:rounded-full",
    "[&_.swiper-button-prev]:bg-white! [&_.swiper-button-next]:bg-white!",
    "[&_.swiper-button-prev]:shadow-md [&_.swiper-button-next]:shadow-md",
    // re-center, since Swiper's margin-top assumes its own size
    "[&_.swiper-button-prev]:mt-0! [&_.swiper-button-next]:mt-0!",
    "[&_.swiper-button-prev]:-translate-y-1/2 [&_.swiper-button-next]:-translate-y-1/2",
    // chevron size inside the circle
    "[&_.swiper-button-prev>svg]:size-4! [&_.swiper-button-next>svg]:size-4!",
    "[--swiper-navigation-sides-offset:10px]"
  ].join(" ");

  return (
    <Swiper
      className={`${arrowStyles} ${imageOnly ? "[&_.swiper-button-prev]:hidden [&_.swiper-button-next]:hidden" : ""}`}
      modules={[Navigation, Pagination]}
      loop={slides.length > 1}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      // give the slider navifation a margin
      navigation={!imageOnly}
      pagination={{ clickable: true, bulletActiveClass: `${imageOnly ? "bg-primary!" : "bg-white!"} opacity-100! w-5! rounded-2xl!`}}
      scrollbar={{ draggable: true }}
    >


      {slides.map((slide, index) => (
        <SwiperSlide key={`${slide.image}-${index}`}>
          <div className={`relative w-full ${imageOnly ? "aspect-square bg-gray-50" : "h-[320px] sm:h-[420px] lg:h-[520px]"}`}>
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={!imageOnly && index === 0}
              sizes="100vw"
              className={imageOnly ? "object-contain" : "object-cover"}
            />
            {!imageOnly && <>
            {/* dark tint */}
            <div className="absolute inset-0 bg-black/60" />
            {/* slide text */}
            <div className="absolute inset-0 flex flex-col items-start justify-center gap-3 px-12 text-white sm:px-16">
              <h2 className="max-w-3xl text-2xl font-bold leading-tight sm:text-4xl">{slide.title}</h2>
              {slide.subtitle && <p className="max-w-md text-sm sm:text-lg">{slide.subtitle}</p>}
              {slide.buttonText && (
                <a
                  href={slide.href ?? "#"}
                  className="mt-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white sm:px-6 sm:py-2 sm:text-base"
                >
                  {slide.buttonText}
                </a>
              )}
            </div>
            </>}
          </div>
        </SwiperSlide>
))}
    </Swiper>
  );
}
