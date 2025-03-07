"use client";

import { useEffect, useState } from "react";
import { IMovie } from "../_types/movieTypes";

export function useMovieArrays(movies: IMovie[]) {
  const [movieArrays, setMovieArrays] = useState<IMovie[][]>([]);

  useEffect(() => {
    function handleMovieArrays() {
      let rowColumns: number = 3;

      if (window.innerWidth < 500) {
        rowColumns = 3;
      } else if (window.innerWidth >= 500 && window.innerWidth < 768) {
        rowColumns = 4;
      } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        rowColumns = 5;
      } else if (window.innerWidth >= 1280) {
        rowColumns = 7;
      }

      const moviesArr = movies;
      const moviesGroupArray = new Array(
        Math.ceil(moviesArr.length / rowColumns),
      )
        .fill("")
        .map((_, i) => moviesArr.slice(i * rowColumns, (i + 1) * rowColumns));
      setMovieArrays(moviesGroupArray);
    }

    window.addEventListener("resize", handleMovieArrays);
    handleMovieArrays();
    return () => window.removeEventListener("resize", handleMovieArrays);
  }, [movieArrays.length, movies]);

  return movieArrays;
}
