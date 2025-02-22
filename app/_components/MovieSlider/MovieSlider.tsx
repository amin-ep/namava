"use client";

import { useSelectMovie } from "@/app/_hooks/useSelectMovie";
import { IMovie } from "@/app/_types/movieTypes";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { Grid, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../MovieCard/MovieCard";
import SliderButton from "../SliderButton";
import MovieOverview from "./MovieOverview";
import PopupMovieWrapper from "./PopupMovieWrapper";

type Props = { movies: IMovie[]; heading: string };

function MovieSlider({ movies, heading }: Props) {
  const [sliderIsHovered, setSliderIsHovered] = useState(false);
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const [containerRef, selectedMovie, handleSelectMovie] = useSelectMovie();

  const paginationButtonClasses = "bottom-8 xsm:bottom-14 xl:bottom-16";

  useEffect(() => {
    const main = document.getElementById("main");
    if (popupIsOpen) {
      main!.style.display = "none";
      function handlePopstateBack() {
        setPopupIsOpen(false);
      }

      window.addEventListener("popstate", handlePopstateBack);

      return () => window.removeEventListener("popstate", handlePopstateBack);
    } else {
      main!.style.display = "block";
    }
  }, [popupIsOpen]);

  const handleOpenPopup = () => {
    setPopupIsOpen(true);
    history.pushState(null, "", window.location.href);
  };

  return (
    <>
      <div
        className="flex flex-col gap-4"
        ref={containerRef as React.Ref<HTMLDivElement | null>}
        onMouseEnter={() => setSliderIsHovered(true)}
        onMouseLeave={() => setSliderIsHovered(false)}
      >
        <div>
          <button
            onClick={handleOpenPopup}
            className="flex items-center gap-2 px-5 leading-[1.75] text-white hover:text-primary-light xsm:px-6 md:gap-3 md:px-8 xl:px-11"
          >
            <h3 className="align-middle text-base font-semibold xl:text-lg">
              {heading}
            </h3>
            <FaChevronLeft className="align-middle text-sm xl:text-base" />
          </button>
        </div>
        <div>
          {movies.length > 0 && (
            <Swiper
              spaceBetween={10}
              grid={{
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
              {movies.map((movie) => (
                <SwiperSlide key={movie._id}>
                  <MovieCard
                    selectedMovie={selectedMovie as IMovie}
                    onClick={() => handleSelectMovie(movie)}
                    movie={movie}
                  />
                </SwiperSlide>
              ))}
              <SliderButton
                parentIsEntered={sliderIsHovered}
                target="next"
                className={paginationButtonClasses}
              />
            </Swiper>
          )}
        </div>
      </div>
      {selectedMovie && <MovieOverview movie={selectedMovie as IMovie} />}
      {popupIsOpen && <PopupMovieWrapper heading={heading} movies={movies} />}
    </>
  );
}

export default MovieSlider;
