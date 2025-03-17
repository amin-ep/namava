"use client";

import { IMovie } from "@/app/_types/movieTypes";
import { FILE_BASE_URL } from "@/app/_utils/constants";
import cls from "classnames";
import { useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieBranding from "../MovieBranding";
import MovieStars from "../MovieStars";
import MovieStats from "../MovieStats/MovieStats";
import SliderBannerActions from "./SliderBannerActions";
import SliderBannerButtons from "./SliderBannerButtons";
import SliderBannerPagination from "./SliderBannerPagination";

export default function SliderBanner({ data }: { data: IMovie[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative">
      {!data && <p className="text-white">Loading...</p>}
      {data && data.length > 0 && (
        <>
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            effect="fade"
            allowTouchMove
            draggable={false}
            modules={[EffectFade, Navigation, Autoplay]}
            className={cls("banner-container", "relative mb-6 w-full")}
            autoplay={{
              delay: 6000,
            }}
            speed={1300}
            loop={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {data?.map((movie) => (
              <SwiperSlide
                key={movie?._id}
                style={{
                  backgroundImage: `url(${FILE_BASE_URL}/${movie?.bannerImageUrl})`,
                }}
                className={cls("banner-content")}
              >
                <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-gray-950 to-black/30">
                  <div className="absolute bottom-12 z-20 h-fit w-full px-5 xsm:bottom-[unset] xsm:right-0 xsm:top-[72px] xsm:max-w-full xsm:px-6 md:top-[100px] md:max-w-[75%] md:px-8 xl:top-[9.03125vw] xl:px-11">
                    <div className="z-30 flex w-full flex-col gap-4 text-center xsm:justify-start xsm:text-right">
                      <MovieBranding movie={movie} />
                      <MovieStats movie={movie} extraStyles="hidden xl:flex" />
                      <SliderBannerActions
                        slug={movie.slug}
                        videoUrl={movie.videoUrl}
                        isFree={movie.isFree}
                        movieId={movie._id}
                      />

                      {movie?.actors!.length > 0 && (
                        <MovieStars actors={movie?.actors} />
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <SliderBannerButtons />
          </Swiper>

          <SliderBannerPagination activeIndex={activeIndex} data={data} />
        </>
      )}
    </div>
  );
}
