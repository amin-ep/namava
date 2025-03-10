"use client";

import MovieArraysWrapper from "@/app/_components/MovieArraysWrapper/MovieArraysWrapper";
import { useSinglePlaylist } from "@/app/_contexts/SinglePlaylistContext";
import { IMovie } from "@/app/_types/movieTypes";
import { useLayoutEffect, useState } from "react";

type Props = { movies: IMovie[] };

function MovieWrapper({ movies }: Props) {
  const [moviesData, setMoviesData] = useState<IMovie[]>([]);
  const { sortBy } = useSinglePlaylist();

  useLayoutEffect(() => {
    if (sortBy === "newest") {
      const data = movies.sort((a, b) => b.releaseYear - a.releaseYear);
      setMoviesData(data);
    } else if (sortBy === "oldest") {
      const data = movies.sort((a, b) => b.releaseYear + a.releaseYear);
      setMoviesData(data);
    }
  }, [movies, sortBy]);

  return (
    <>
      <MovieArraysWrapper movies={moviesData as IMovie[]} deletable />
    </>
  );
}

export default MovieWrapper;
