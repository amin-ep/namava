import { IMovie } from "@/app/_types/movieTypes";
import { createPortal } from "react-dom";
import MovieArraysWrapper from "../MovieArraysWrapper/MovieArraysWrapper";

type Props = { movies: IMovie[]; heading: string };

function PopupMovieWrapper({ movies, heading }: Props) {
  return createPortal(
    <div className={"flex flex-col gap-4 bg-gray-800 pt-[60px]"}>
      <h3 className="px-5 text-base leading-[1.75] text-white xsm:px-6 xsm:text-lg md:px-8 md:text-base xl:px-11 xl:text-lg">
        {heading}
      </h3>
      <MovieArraysWrapper movies={movies} deletable={false} />
    </div>,
    document.getElementById("popup") as HTMLDivElement,
  );
}

export default PopupMovieWrapper;
