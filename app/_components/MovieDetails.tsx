import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IMovie } from "../_types/movieTypes";
import { FILE_BASE_URL } from "../_utils/constants";
import FreeStatusLabel from "./FreeStatusLabel/FreeStatusLabel";
import MovieStats from "./MovieStats/MovieStats";

type Props = { movie: IMovie };

function MovieDetails({ movie }: Props) {
  return (
    <React.Fragment>
      <div className="flex items-center justify-center xsm:justify-start">
        <Link href={`/movie/${movie.slug}`}>
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
      <MovieStats movie={movie} />
    </React.Fragment>
  );
}

export default MovieDetails;
