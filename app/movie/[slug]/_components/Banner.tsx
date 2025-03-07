import BuySubscriptionLink from "@/app/_components/BuySubscriptionLink";
import MovieBranding from "@/app/_components/MovieBranding";
import MovieStars from "@/app/_components/MovieStars";
import MovieStats from "@/app/_components/MovieStats/MovieStats";
import MovieTooltipIconActions from "@/app/_components/MovieTooltipIconActions/MovieTooltipIconActions";
import MovieTrailerAction from "@/app/_components/MovieTrailerAction/MovieTrailerAction";
import { IMovie } from "@/app/_types/movieTypes";
import { FILE_BASE_URL } from "@/app/_utils/constants";
import { cookies } from "next/headers";

type Props = { movie: IMovie };

async function Banner({ movie }: Props) {
  const authToken = (await cookies()).get(
    process.env.JWT_SECRET_KEY as string,
  )?.value;
  return (
    <div className="banner-container">
      <div
        className="banner-content"
        style={{
          backgroundImage: `url(${FILE_BASE_URL}/${movie.bannerImageUrl})`,
        }}
      >
        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-gray-950 to-black/30">
          <div className="absolute bottom-12 z-20 h-fit w-full px-5 xsm:bottom-[unset] xsm:right-0 xsm:top-[72px] xsm:max-w-full xsm:px-6 md:top-[100px] md:max-w-[75%] md:px-8 xl:top-[9.03125vw] xl:px-11">
            <div className="z-30 flex w-full flex-col items-center gap-4 text-center xsm:justify-start xsm:text-right md:items-start">
              <MovieBranding wrapperBreakpoint="medium" movie={movie} />
              <MovieStats movie={movie} />
              <div className="flex justify-center gap-4 md:justify-start">
                <BuySubscriptionLink />
                <MovieTrailerAction videoUrl={movie.videoUrl} />
                {authToken && (
                  <MovieTooltipIconActions
                    extraStyles="hidden md:flex"
                    movieId={movie._id}
                  />
                )}
              </div>
              <div className="mx-auto mb-4 mt-3 hidden max-w-[28.25rem] text-center text-xs leading-5 text-white xsm:block md:mx-0 md:mt-0 md:max-w-[499px] md:text-right xl:mb-[18px] xl:max-w-[554px] xl:text-sm">
                <p>{movie.description}</p>
              </div>
              <div className="flex items-center">
                {movie?.actors!.length > 0 && (
                  <MovieStars actors={movie?.actors} />
                )}
              </div>
              {authToken && (
                <MovieTooltipIconActions
                  extraStyles="md:hidden gap-4 justify-center"
                  movieId={movie._id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
