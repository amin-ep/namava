"use client";

import { useSinglePlaylist } from "@/app/_contexts/SinglePlaylistContext";
import cls from "classnames";
import Image from "next/image";
import React, { useLayoutEffect } from "react";
import { useMovieArrays } from "../../_hooks/useMovieArrays";
import { useSelectMovie } from "../../_hooks/useSelectMovie";
import { IMovie } from "../../_types/movieTypes";
import MovieCard from "../MovieCard/MovieCard";
import MovieOverview from "../MovieOverview/MovieOverview";
import styles from "./MovieArraysWrapper.module.css";

type Props = {
  movies: IMovie[];
  deletable: boolean;
};

function MovieArraysWrapper({ movies, deletable }: Props) {
  const movieArrays = useMovieArrays(movies);
  const {
    isDeleting,
    addItemForDelete,
    selectedMoviesToDelete,
    removeItemForDelete,
  } = useSinglePlaylist();
  const [containerRef, selectedMovie, handleSelectMovie, reset] =
    useSelectMovie();

  const handleClickMovie = (movie: IMovie) => {
    if (isDeleting) {
      return;
    } else {
      handleSelectMovie(movie);
    }
  };

  const handleSelectMovieForDelete = (id: string) => {
    const isSelected = selectedMoviesToDelete?.some((el) => el == id);
    if (isSelected) {
      removeItemForDelete(id);
    } else {
      addItemForDelete(id);
    }
  };

  useLayoutEffect(() => {
    if (isDeleting) {
      reset();
    }
  }, [isDeleting, reset]);

  return (
    <div className="flex flex-col">
      {movieArrays.map((movieArr, i) => (
        <div key={movieArr[0].slug} className="flex flex-col">
          <div
            ref={containerRef as React.Ref<HTMLDivElement | null>}
            className={cls(
              "h-full w-full gap-2.5 px-5 xsm:gap-3 xsm:px-6 md:gap-3.5 md:px-8 xl:gap-4 xl:px-11 xl:pt-20",
              styles.container,
            )}
          >
            {movieArr.map((movie) => (
              <div className="relative" key={movie._id}>
                {deletable && isDeleting && (
                  <div
                    className={cls(
                      "absolute inset-0 bottom-5 z-20 flex cursor-pointer items-center justify-center xsm:bottom-20 xl:bottom-[88px]",
                      selectedMoviesToDelete?.some((el) => el == movie._id) &&
                        "bg-black/35",
                    )}
                    {...(deletable && {
                      onClick: () => handleSelectMovieForDelete(movie._id),
                    })}
                  >
                    {selectedMoviesToDelete?.some((el) => el == movie._id) && (
                      <Image
                        src="/icons/mark-success-green.svg"
                        alt="selected"
                        width={24}
                        height={24}
                        className="aspect-square w-6 md:w-8 xl:w-10"
                      />
                    )}
                  </div>
                )}
                <MovieCard
                  movie={movie}
                  onClick={() => handleClickMovie(movie)}
                  selectedMovie={selectedMovie}
                />
              </div>
            ))}
          </div>
          {selectedMovie &&
            movieArrays.at(i)?.includes(selectedMovie as IMovie) && (
              <MovieOverview movie={selectedMovie as IMovie} />
            )}
        </div>
      ))}
    </div>
  );
}

export default MovieArraysWrapper;
