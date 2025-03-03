"use client";

import React, { useState } from "react";
import { Swiper } from "swiper/react";
import SliderButton from "../SliderButton";
import { Grid, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

type Props = { children: React.ReactNode; dataType: "movies" | "actors" };

function GridSlider({ children, dataType }: Props) {
  const [sliderIsHovered, setSliderIsHovered] = useState(false);
  const paginationButtonClasses = `${dataType === "movies" ? "bottom-8 xsm:bottom-14 xl:bottom-16" : "bottom-0"}`;
  return (
    <div
      onMouseEnter={() => setSliderIsHovered(true)}
      onMouseLeave={() => setSliderIsHovered(false)}
    >
      <Swiper
        spaceBetween={10}
        grid={{
          fill: "row",
          rows: 1,
        }}
        slidesPerView={3}
        slidesPerGroup={3}
        breakpoints={{
          500: {
            slidesPerView: 4,
            spaceBetween: 12,
            slidesPerGroup: 4,
          },
          800: {
            slidesPerView: 5,
            spaceBetween: 14,
            slidesPerGroup: 5,
          },
          1280: {
            slidesPerView: 7,
            spaceBetween: 16,
            slidesPerGroup: 7,
          },
        }}
        modules={[Grid, Navigation]}
        className="relative !px-5 xsm:!px-6 md:!px-8 xl:!px-11"
      >
        <SliderButton
          parentIsEntered={sliderIsHovered}
          target="prev"
          className={paginationButtonClasses}
        />
        {children}
        <SliderButton
          parentIsEntered={sliderIsHovered}
          target="next"
          className={paginationButtonClasses}
        />
      </Swiper>
    </div>
  );
}

export default GridSlider;
