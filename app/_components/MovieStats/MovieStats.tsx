import cls from "classnames";
import Image from "next/image";
import { IMovie } from "../../_types/movieTypes";
import ImdbLabel from "../ImdbLabel";
import styles from "./MovieStats.module.css";

type Props = { movie: IMovie; extraStyles?: string };

function MovieStats({ movie, extraStyles }: Props) {
  const ageLimitClassNames: { [k: number]: string } = {
    3: "lime",
    7: "white",
    12: "yellow",
    15: "clayBrown",
    18: "appleBlossom",
  };
  return (
    <div
      className={cls(
        extraStyles,
        "flex items-center gap-3 text-[11px] text-white xsm:gap-4 xsm:text-xs xl:gap-6 xl:text-sm",
      )}
    >
      <span
        className={cls(
          "flex h-6 w-9 items-center justify-center rounded-full text-center text-xs font-bold xl:text-sm",
          styles[ageLimitClassNames[movie.ageLimit]],
        )}
      >
        {movie.ageLimit}+
      </span>
      <span>{movie.releaseYear}</span>
      <span>{movie.duration} دقیقه</span>
      <ImdbLabel rate={movie.imdbRating as number} />
      {movie.reactionAverage && (
        <div className="flex items-center gap-1">
          <Image
            src="/icons/heart-fill-white.svg"
            alt="امتیاز"
            width={22}
            height={22}
          />
          <span>{movie.reactionAverage}%</span>
        </div>
      )}
    </div>
  );
}

export default MovieStats;
