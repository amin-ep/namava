"use client";

import { useEffect, useRef, useState } from "react";
import { IMovie } from "../_types/movieTypes";
import { useRouter } from "next/navigation";

export const useSelectMovie: () => [
  React.Ref<HTMLElement | null>,
  IMovie | null,
  (movie: IMovie) => void,
  () => void,
] = () => {
  const [selectedMovie, setSelectedMovie] = useState<null | IMovie>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const pageWidth = useRef<number>(0);
  const router = useRouter();

  useEffect(() => {
    function handlePageWidth() {
      pageWidth.current = window.innerWidth;
      if (pageWidth.current < 768) {
        setSelectedMovie(null);
      }
    }
    window.addEventListener("scroll", handlePageWidth);
    handlePageWidth();
    return () => window.removeEventListener("scroll", handlePageWidth);
  }, []);

  const handleSelectMovie = (movie: IMovie) => {
    if (pageWidth.current > 767) {
      if (selectedMovie?._id === movie._id) {
        setSelectedMovie(null);
      } else {
        setSelectedMovie(movie);
        containerRef.current?.nextElementSibling?.scrollIntoView({
          behavior: "smooth",
        });
      }
    } else {
      router.push(`/movie/${movie.slug}`);
    }
  };

  const reset = () => {
    setSelectedMovie(null);
  };

  return [containerRef, selectedMovie, handleSelectMovie, reset];
};
