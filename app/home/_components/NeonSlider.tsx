"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import "swiper/css";
import NeonCard from "./NeonCard";
import SliderButton from "@/app/_components/SliderButton";
import { useState } from "react";

const slides: { href: string; imagePath: string }[] = [
  { href: "/collection/pardis", imagePath: "/pardis-namava-poster.jpg" },
  { href: "/collection/most-viewed", imagePath: "/most-viewed-poster.jpg" },
  { href: "/category/exclusive-dubs", imagePath: "/namava-dubbed-poster.jpg" },
  {
    href: "/collection/golden-globe",
    imagePath: "/golden-globe-awards-poster.jpg",
  },
  {
    href: "/collection/oscar",
    imagePath: "/the-oscars-poster.jpg",
  },
];

function NeonSlider() {
  const [sliderIsHovered, setSliderIsHovered] = useState(false);
  return (
    <div
      className="mb-8 md:mb-11 xl:mb-12"
      onMouseEnter={() => setSliderIsHovered(true)}
      onMouseLeave={() => setSliderIsHovered(false)}
    >
      <Swiper
        spaceBetween={10}
        grid={{
          rows: 1,
        }}
        slidesPerView={1}
        slidesPerGroup={1}
        centeredSlides={false}
        breakpoints={{
          500: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 12,
          },
          800: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1280: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        modules={[Grid, Navigation]}
        className="!relative !px-5 xsm:!px-6 md:!px-8 xl:!px-11"
      >
        <SliderButton
          parentIsEntered={sliderIsHovered}
          target="prev"
          className="bottom-0"
        />
        {slides.map((slide) => (
          <SwiperSlide key={slide.href}>
            <NeonCard href={slide.href} imagePath={slide.imagePath} />
          </SwiperSlide>
        ))}
        <SliderButton
          parentIsEntered={sliderIsHovered}
          target="next"
          className="bottom-0"
        />
      </Swiper>
    </div>
  );
}

export default NeonSlider;
