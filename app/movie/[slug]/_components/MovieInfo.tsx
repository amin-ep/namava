import { IMovie } from "@/app/_types/movieTypes";
import React from "react";

type Props = { movie: IMovie };

function MovieInfo({ movie }: Props) {
  return (
    <>
      <div className="mb-8 mt-6 text-white">
        <h2
          style={{ direction: "ltr" }}
          className="mb-6 text-right text-xs md:text-sm"
        >
          {(movie as IMovie).englishName}
        </h2>
        <h2 className="mb-3 text-base md:mb-4 xl:text-lg">
          درباره فیلم {(movie as IMovie).name}
        </h2>
        <p className="text-xs leading-7 text-gray-400 md:text-sm md:leading-7">
          {(movie as IMovie).about}
        </p>
      </div>
      <div>
        <h2 className="text-xs md:text-sm">
          دسته بندی:{" "}
          {movie.genres.map((genre, index) => (
            <span key={genre}>
              {genre}
              {index !== movie.genres.length - 1 && "، "}
            </span>
          ))}
        </h2>
      </div>
    </>
  );
}

export default MovieInfo;
