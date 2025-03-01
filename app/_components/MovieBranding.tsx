import Link from "next/link";
import React from "react";
import { FILE_BASE_URL } from "../_utils/constants";
import Image from "next/image";
import { IMovie } from "../_types/movieTypes";
import FreeStatusLabel from "./FreeStatusLabel/FreeStatusLabel";
import cls from "classnames";

type Props = { movie: IMovie; wrapperBreakpoint?: "medium" | "xSmall" };

function MovieBranding({ movie, wrapperBreakpoint = "xSmall" }: Props) {
  const breakPoint =
    wrapperBreakpoint === "xSmall"
      ? "xsm:justify-start"
      : wrapperBreakpoint === "medium"
        ? "md:justify-start"
        : "";

  return (
    <>
      <div className={cls("flex items-center justify-center", breakPoint)}>
        <Link href={`/movie/${movie.slug}`}>
          <Image
            src={`${FILE_BASE_URL}/${movie?.logoImageUrl}`}
            alt={movie.name}
            width={112}
            height={52}
            className="w-[35vw] xsm:w-[25vw] xl:w-[20vw]"
            unoptimized
          />
        </Link>
      </div>
      <div className={cls("flex flex-row justify-center gap-4", breakPoint)}>
        <h2 className="flex items-center text-sm text-white xsm:text-base md:text-lg xl:text-xl">
          <Link href={`/movie/${movie.slug}`}>{movie.name}</Link>
        </h2>
        {movie.isFree && <FreeStatusLabel />}
      </div>
    </>
  );
}

export default MovieBranding;
