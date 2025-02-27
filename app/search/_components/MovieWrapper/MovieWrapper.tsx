"use client";

import MovieCard from "@/app/_components/MovieCard/MovieCard";
import { useSearch } from "@/app/_contexts/SearchContext";
import { IMovie } from "@/app/_types/movieTypes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";

type AlertProps = { imageSrc: string; imageAlt: string; message: string };

function MovieWrapper() {
  const [moviesArrIsEmpty, setMoviesArrIsEmpty] = useState(false);
  const { movies, hasFiltered } = useSearch();
  const router = useRouter();

  useLayoutEffect(() => {
    if (movies && movies.length === 0) {
      setMoviesArrIsEmpty(true);
    } else {
      setMoviesArrIsEmpty(false);
    }
  }, [movies]);

  const alertProps: AlertProps = {
    imageAlt:
      !hasFiltered && moviesArrIsEmpty
        ? "search-movies"
        : hasFiltered && moviesArrIsEmpty
          ? "no-movies"
          : "",
    imageSrc:
      !hasFiltered && moviesArrIsEmpty
        ? "search-movie.svg"
        : hasFiltered && moviesArrIsEmpty
          ? "search-movie-notfound.svg"
          : "",
    message:
      !hasFiltered && moviesArrIsEmpty
        ? "عنوان فیلم، سریال یا بازیگر مورد نظر خود را جستجو کنید و یا از طریق فیلتر‌های موجود، فیلم و سریال مورد علاقه خود را پیدا کنید."
        : hasFiltered && moviesArrIsEmpty
          ? "موردی یافت نشد"
          : "",
  };

  const handleMovieClick = (slug: IMovie["slug"]) => {
    router.push(`/movie/${slug}`);
  };

  return (
    <>
      {moviesArrIsEmpty && <Alert {...alertProps} />}
      {movies && movies.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-2.5 xsm:grid-cols-4 xsm:gap-3 md:grid-cols-3 md:gap-3.5 lg:grid-cols-4 xl:grid-cols-5 xl:gap-4">
          {(movies as IMovie[]).map((movie) => (
            <MovieCard
              movie={movie}
              key={movie._id}
              onClick={() => handleMovieClick(movie.slug)}
            />
          ))}
        </div>
      )}
    </>
  );
}

function Alert({ imageSrc, imageAlt, message }: AlertProps) {
  return (
    <div className="mx-auto my-20 h-44 w-72 md:my-32 md:w-96">
      <div className="my-auto flex flex-col items-center">
        <Image
          src={`/icons/${imageSrc}`}
          alt={imageAlt}
          width={100}
          height={100}
          className="w-[100px] md:w-36"
        />
        <p className="text-center text-xs leading-5 text-gray-400 md:text-sm md:leading-6">
          {message}
        </p>
      </div>
    </div>
  );
}

export default MovieWrapper;
