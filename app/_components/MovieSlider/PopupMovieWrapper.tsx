import { IMovie } from "@/app/_types/movieTypes";
import cls from "classnames";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import MovieCard from "../MovieCard/MovieCard";
import MovieOverview from "./MovieOverview";
import styles from "./PopupMovieWrapper.module.css";
import { useSelectMovie } from "@/app/_hooks/useSelectMovie";

type Props = { movies: IMovie[]; heading: string };

function PopupMovieWrapper({ movies, heading }: Props) {
  const [movieArrays, setMovieArrays] = useState<IMovie[][]>([]);
  const [containerRef, selectedMovie, handleSelectMovie] = useSelectMovie();

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

  return createPortal(
    <div className={"flex flex-col gap-4 bg-gray-800 pt-[60px]"}>
      <h3 className="px-5 text-base leading-[1.75] text-white xsm:px-6 xsm:text-lg md:px-8 md:text-base xl:px-11 xl:text-lg">
        {heading}
      </h3>
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
                <MovieCard
                  movie={movie}
                  onClick={() => handleSelectMovie(movie)}
                  selectedMovie={selectedMovie}
                  key={movie._id}
                />
              ))}
            </div>
            {selectedMovie &&
              movieArrays.at(i)?.includes(selectedMovie as IMovie) && (
                <MovieOverview movie={selectedMovie as IMovie} />
              )}
          </div>
        ))}
      </div>
    </div>,
    document.getElementById("popup") as HTMLDivElement,
  );
}

export default PopupMovieWrapper;
