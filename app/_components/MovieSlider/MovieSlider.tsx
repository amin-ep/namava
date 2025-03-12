"use client";

import { useSelectMovie } from "@/app/_hooks/useSelectMovie";
import { IMovie } from "@/app/_types/movieTypes";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { SwiperSlide } from "swiper/react";
import GridSlider from "../GridSlider/GridSlider";
import MovieCard from "../MovieCard/MovieCard";
import MovieOverview from "../MovieOverview/MovieOverview";
import PopupMovieWrapper from "./PopupMovieWrapper";

type Props = { movies: IMovie[]; heading: string; disablePopup?: boolean };

function MovieSlider({ movies, heading, disablePopup }: Props) {
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const [containerRef, selectedMovie, handleSelectMovie] = useSelectMovie();

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
      >
        <div>
          <button
            onClick={handleOpenPopup}
            className="flex items-center gap-2 px-5 leading-[1.75] text-white hover:text-primary-light xsm:px-6 md:gap-3 md:px-8 xl:px-11"
            {...(disablePopup && { disabled: disablePopup })}
          >
            <h3 className="align-middle text-base font-semibold xl:text-lg">
              {heading}
            </h3>
            <FaChevronLeft className="align-middle text-sm xl:text-base" />
          </button>
        </div>
        <div>
          {movies.length > 0 && (
            <GridSlider dataType="movies">
              {movies.map((movie) => (
                <SwiperSlide key={movie._id}>
                  {movie ? (
                    <MovieCard
                      selectedMovie={selectedMovie as IMovie}
                      onClick={() => handleSelectMovie(movie)}
                      movie={movie}
                    />
                  ) : (
                    <p className="text-white">Loading...</p>
                  )}
                </SwiperSlide>
              ))}
            </GridSlider>
          )}
        </div>
      </div>
      {selectedMovie && <MovieOverview movie={selectedMovie as IMovie} />}
      {popupIsOpen && <PopupMovieWrapper heading={heading} movies={movies} />}
    </>
  );
}

export default MovieSlider;
