import { IMovie } from "@/app/_types/movieTypes";
import { FILE_BASE_URL } from "@/app/_utils/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import FreeStatusLabel from "../FreeStatusLabel/FreeStatusLabel";
import AgeLimitLabel from "../AgeLimitLabel/AgeLimitLabel";
import ImdbLabel from "../ImdbLabel";

type Props = { movie: IMovie };

export default function SliderBannerDetails({ movie }: Props) {
  return (
    <React.Fragment>
      <div className="flex items-center justify-center xsm:justify-start">
        <Link href="/">
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
      <div className="hidden items-center gap-6 text-sm text-white xl:flex">
        <AgeLimitLabel age={movie.ageLimit} />
        <span>{movie.releaseYear}</span>
        <span>{movie.duration} دقیقه</span>
        <ImdbLabel rate={movie.imdbRating as number} />
      </div>
    </React.Fragment>
  );
}
