"use client";

import { useModal } from "@/app/_hooks/useModal";
import { IMovie } from "@/app/_types/movieTypes";
import { FILE_BASE_URL } from "@/app/_utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AgeLimitLabel from "../AgeLimitLabel/AgeLimitLabel";
import BuySubscriptionLink from "../BuySubscriptionLink";
import FreeStatusLabel from "../FreeStatusLabel/FreeStatusLabel";
import LinkButton from "../LinkButton";
import MovieMoreInfoLink from "../MovieMoreInfoLink";
import MovieStars from "../MovieStars";
import TrailerModal from "../TrailerModal";
import SliderBannerButtons from "./SliderBannerButtons";
import SliderBannerPagination from "./SliderBannerPagination";
import ImdbLabel from "../ImdbLabel";

function SliderBanner({ data }: { data: IMovie[] }) {
  const [videoUrl, setVideoUrl] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const {
    close: closeTrailer,
    isOpen: trailerIsOpen,
    open: openTrailer,
  } = useModal();

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
            className="relative mb-6 min-h-[135vw] w-full xsm:min-h-[77.34375vw] md:min-h-[58.59375vw] base:min-h-[51.5625vw] lg:min-h-[44.53125vw]"
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
                className="relative z-[5] min-h-[135vw] w-full bg-cover bg-center bg-no-repeat bg-origin-border p-0 before:absolute before:bottom-0 before:left-0 before:right-0 before:-z-10 before:h-24 before:bg-gradient-to-t before:from-gray-950 before:to-transparent xsm:min-h-[50vw] xsm:pb-10"
              >
                <div className="absolute bottom-12 z-20 h-fit w-full px-5 xsm:bottom-[unset] xsm:right-0 xsm:top-[72px] xsm:max-w-full xsm:px-6 md:top-[100px] md:max-w-[75%] md:px-8 xl:top-[9.03125vw] xl:px-11">
                  <div className="z-30 flex w-full flex-col gap-4 text-center xsm:justify-start xsm:text-right">
                    <div className="flex items-center justify-center xsm:justify-start">
                      <Link href="/">
                        <Image
                          src={`${FILE_BASE_URL}/${movie?.logoImageUrl}`}
                          alt={movie.name}
                          width={112}
                          height={52}
                          className="w-28 xsm:w-36 sm:w-40 md:w-44"
                          unoptimized
                        />
                      </Link>
                    </div>
                    <div className="flex flex-row justify-center gap-4 xsm:justify-start">
                      <h2 className="text-sm text-white xsm:text-base md:text-lg xl:text-xl">
                        <Link href={`/movie/${movie.slug}`}>{movie.name}</Link>
                      </h2>
                      {movie.isFree && <FreeStatusLabel />}
                    </div>
                    <div className="hidden items-center gap-6 text-sm text-white xl:flex">
                      <AgeLimitLabel age={movie.ageLimit} />
                      <span>{movie.releaseYear}</span>
                      <span>{movie.duration} دقیقه</span>
                      <ImdbLabel rate={movie.imdbRating as number} />
                    </div>
                    <div className="flex justify-center gap-4 xsm:justify-start">
                      <BuySubscriptionLink />
                      <LinkButton
                        extraStyles="z-20"
                        color="glassy"
                        variation="button"
                        onClick={() => {
                          setVideoUrl(movie.videoUrl);
                          openTrailer();
                        }}
                        buttonType="button"
                      >
                        پیش نمایش
                      </LinkButton>
                      <MovieMoreInfoLink
                        extraStyles="hidden md:flex"
                        href={`/movie/${movie.slug}`}
                      />
                    </div>
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

export default SliderBanner;
