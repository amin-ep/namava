"use client";

import { useModal } from "@/app/_hooks/useModal";
import { IMovie } from "@/app/_types/movieTypes";
import { FILE_BASE_URL } from "@/app/_utils/constants";
import { useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieStars from "../MovieStars";
import TrailerModal from "../TrailerModal";
import SliderBannerActions from "./SliderBannerActions";
import SliderBannerButtons from "./SliderBannerButtons";
import SliderBannerDetails from "./SliderBannerDetails";
import SliderBannerPagination from "./SliderBannerPagination";
import styles from "./SliderBanner.module.css";
import cls from "classnames";

export default function SliderBanner({ data }: { data: IMovie[] }) {
  const [videoUrl, setVideoUrl] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const {
    close: closeTrailer,
    isOpen: trailerIsOpen,
    open: openTrailer,
  } = useModal();

  const handleShowTrailerModal = (videoUrl: IMovie["videoUrl"]) => {
    setVideoUrl(videoUrl);
    openTrailer();
  };

  return (
    <div className="relative">
      {data.length > 0 && (
        <>
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            effect="fade"
            allowTouchMove
            draggable={false}
            modules={[EffectFade, Navigation, Autoplay]}
            className={cls(styles.slider, "relative mb-6 w-full")}
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
                className={cls(
                  "absolute inset-0 z-[5] w-full bg-cover bg-center bg-no-repeat bg-origin-border p-0 before:absolute before:bottom-0 before:left-0 before:right-0 before:-z-10 before:h-24 before:bg-gradient-to-t before:from-gray-950 before:to-transparent xsm:pb-10",
                  styles.slide,
                )}
              >
                <div className="absolute bottom-12 z-20 h-fit w-full px-5 xsm:bottom-[unset] xsm:right-0 xsm:top-[72px] xsm:max-w-full xsm:px-6 md:top-[100px] md:max-w-[75%] md:px-8 xl:top-[9.03125vw] xl:px-11">
                  <div className="z-30 flex w-full flex-col gap-4 text-center xsm:justify-start xsm:text-right">
                    <SliderBannerDetails movie={movie} />
                    <SliderBannerActions
                      infoHrefPath={movie.slug}
                      onTrailerButtonClick={() =>
                        handleShowTrailerModal(movie.videoUrl)
                      }
                    />

                    {movie?.actors!.length > 0 && (
                      <MovieStars actors={movie?.actors} />
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <SliderBannerButtons />
          </Swiper>

          <SliderBannerPagination activeIndex={activeIndex} data={data} />
          <TrailerModal
            onClose={closeTrailer}
            open={trailerIsOpen}
            videoUrl={videoUrl}
          />
        </>
      )}
    </div>
  );
}
