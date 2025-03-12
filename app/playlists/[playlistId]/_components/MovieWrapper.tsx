"use client";

import MovieArraysWrapper from "@/app/_components/MovieArraysWrapper/MovieArraysWrapper";
import { useSinglePlaylist } from "@/app/_contexts/SinglePlaylistContext";
import { IMovie } from "@/app/_types/movieTypes";

type Props = { movies: IMovie[] };

function MovieWrapper({ movies }: Props) {
  const { sortBy } = useSinglePlaylist();

  return (
    <MovieArraysWrapper movies={movies as IMovie[]} deletable sortBy={sortBy} />
  );
}

export default MovieWrapper;
