import { IMovie } from "@/app/_types/movieTypes";
import { FILE_BASE_URL } from "@/app/_utils/constants";
import { findCategoryHref } from "@/app/_utils/helpers";
import { Tooltip } from "@mui/material";
import cls from "classnames";
import Image from "next/image";
import Link from "next/link";
import { HiPlus } from "react-icons/hi";
import { SlDislike, SlLike } from "react-icons/sl";
import AgeLimitLabel from "../AgeLimitLabel/AgeLimitLabel";
import BuySubscriptionLink from "../BuySubscriptionLink";
import ImdbLabel from "../ImdbLabel";
import MovieMoreInfoLink from "../MovieMoreInfoLink";
import MovieStars from "../MovieStars";
import styles from "./MovieOverview.module.css";

type Props = { movie: IMovie };

function MovieOverview({ movie }: Props) {
  return (
    <div className="relative mt-4 hidden h-[375px] justify-end md:flex base:h-[420px] lg:h-[480px] xl:h-[520px]">
      <div className="w-3/4">
        <Image
          src={`${FILE_BASE_URL}/${movie.bannerImageUrl}`}
          alt={movie.name}
          width={100}
          height={300}
          unoptimized
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className={cls(
          "absolute inset-0 flex items-center justify-start px-8",
          styles.container,
        )}
      >
        <div className="max-w-[550px]">
          {/* Name */}
          <div className="table-cell align-middle">
            <div className="mb-[6px] text-lg xl:text-xl">
              <Link href={`/movie/${movie.slug}`} className="text-white">
                {movie.name}
              </Link>
            </div>

            {/* details */}
            <div className="mb-3 flex items-center justify-start gap-4 text-xs text-white xl:text-sm">
              <AgeLimitLabel age={movie.ageLimit} />
              <span>{movie.releaseYear}</span>
              <span>{movie.duration} دقیقه</span>
              <ImdbLabel rate={movie.imdbRating as number} />

              <div className="flex items-center gap-1">
                <Image
                  src="/icons/heart-fill-white.svg"
                  alt="امتیاز"
                  width={22}
                  height={22}
                />
                <span>55%</span>
              </div>
            </div>
            {/* Description */}
            <div className="mb-4 text-xs text-white xl:mb-[18px]">
              <Link href={`/movie/${movie.slug}`}>{movie.description}</Link>
            </div>
            {/* Actions */}
            <div className="mb-4 flex items-center justify-start gap-3 xl:mb-[18px] xl:gap-4">
              <BuySubscriptionLink />
              <IconButton tooltipTitle="افزودن به لیست">
                <HiPlus />
              </IconButton>
              <IconButton tooltipTitle="دوست داشتم">
                <SlLike />
              </IconButton>
              <IconButton tooltipTitle="دوست نداشتم">
                <SlDislike />
              </IconButton>
              <MovieMoreInfoLink href={`/movie/${movie.slug}`} />
            </div>
            <div>
              <MovieStars actors={movie.actors} />
              <CategoryList categories={movie.genres} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconButton({
  children,
  tooltipTitle,
}: {
  children: React.ReactNode;
  tooltipTitle: string;
}) {
  return (
    <Tooltip
      title={tooltipTitle}
      classes={{
        tooltip: styles.tooltip,
        arrow: styles["tooltip-arrow"],
      }}
      arrow
    >
      <button className="flex aspect-square w-[42px] items-center justify-center rounded-full bg-[rgba(255,255,255,0.2)] text-xl font-extrabold text-white hover:bg-[rgba(255,255,255,0.4)]">
        {children}
      </button>
    </Tooltip>
  );
}

function CategoryList({ categories }: { categories: IMovie["genres"] }) {
  return (
    <div className="hidden text-xs text-gray-400 xsm:flex">
      <span className="pl-1">دسته بندی:</span>
      {categories.map((category, index) => (
        <Link
          key={category}
          href={`/category/${findCategoryHref(category)}`}
          className="cursor-pointer"
        >
          {category}
          {index !== categories.length - 1 && <span className="px-2">-</span>}
        </Link>
      ))}
    </div>
  );
}

export default MovieOverview;
