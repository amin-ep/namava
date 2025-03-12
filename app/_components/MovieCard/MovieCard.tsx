"use client";

import { IMovie } from "@/app/_types/movieTypes";
import { FILE_BASE_URL } from "@/app/_utils/constants";
import { Skeleton, useMediaQuery } from "@mui/material";
import cls from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./MovieCard.module.css";
import FreeStatusLabel from "../FreeStatusLabel/FreeStatusLabel";

type Props = {
  movie: IMovie;
  onClick: () => void;
  selectedMovie?: IMovie | null;
};

function MovieCard({ movie, onClick, selectedMovie }: Props) {
  const [movieIsSelected, setMovieIsSelected] = useState(false);
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  useEffect(() => {
    if (selectedMovie?._id === movie._id) {
      setMovieIsSelected(true);
    } else {
      setMovieIsSelected(false);
    }
  }, [movie._id, selectedMovie]);

  function handleImageOnLoad() {
    setImageIsLoaded(true);
  }

  return (
    <button
      className={cls(
        "relative after:absolute after:bottom-0 after:right-1/4 after:h-1 after:w-1/2 after:rounded-md after:bg-gray-400 after:transition after:duration-700 xsm:pb-14 xl:pb-16",
        styles.button,
        movieIsSelected ? "after:opacity-100" : "after:opacity-0",
      )}
      onClick={onClick}
    >
      <div
        className={cls(
          "flex flex-col gap-1 transition duration-700 xsm:gap-2",
          movieIsSelected ? "translate-y-4" : "",
        )}
      >
        <div className="relative">
          {!imageIsLoaded && <MuiSkeleton imageIsLoaded={imageIsLoaded} />}
          {movie.isFree && (
            <FreeStatusLabel extraStyles="absolute top-2 right-2 md:top-3 md:right-3 xl:top-4 xl:right-4" />
          )}
          {imageIsLoaded && <Details movie={movie} />}
          <Image
            src={`${FILE_BASE_URL}/${movie.posterUrl}`}
            alt={movie.name}
            width={86}
            height={127}
            className={cls(
              "w-full rounded-[3px] md:rounded-[4px] xl:rounded-md",
              !imageIsLoaded ? "opacity-0" : "opacity-100",
            )}
            unoptimized
            onLoad={handleImageOnLoad}
          />
        </div>
        <p className="text-right text-[10px] font-normal leading-[1.7] text-white md:text-xs">
          {movie.name}
        </p>
      </div>
    </button>
  );
}

function Details({ movie }: { movie: IMovie }) {
  const rowStyles = "flex items-center gap-1";
  return (
    <div
      className={cls(
        "absolute inset-0 z-10 flex flex-col items-start justify-end gap-2.5 whitespace-nowrap rounded-[3px] px-2 pb-5 align-middle text-sm text-white xl:rounded-md",
        styles.details,
      )}
    >
      <p>فیلم - {movie.releaseYear}</p>
      {movie.reactionAverage && (
        <div className={rowStyles}>
          <Image
            src="/icons/heart-fill-white.svg"
            alt="امتیاز"
            width={22}
            height={22}
          />
          <span>{movie.reactionAverage}%</span>
        </div>
      )}
      {movie.imdbRating && (
        <div className={rowStyles}>
          <Image
            src="/icons/imdb-white.svg"
            alt="imdb"
            width={31}
            height={11}
          />
          <span>{movie.imdbRating}</span>
        </div>
      )}
    </div>
  );
}

function MuiSkeleton({ imageIsLoaded }: { imageIsLoaded: boolean }) {
  return (
    <div
      className={cls(
        "absolute inset-0 block h-full w-full",
        // imageIsLoaded ? "hidden" : "",
      )}
    >
      <Skeleton
        animation="wave"
        width={86}
        height={127}
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "GrayText",
          margin: 0,
          padding: 0,
        }}
        classes={{
          root: styles.skeleton,
          heightAuto: styles["skeleton-height-auto"],
          circular: styles["skeleton-circular"],
          fitContent: styles["skeleton-fit-content"],
        }}
      />
    </div>
  );
}

export default MovieCard;
