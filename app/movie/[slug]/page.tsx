import { getMovieBySlug } from "@/app/api/movieApi";
import { Params } from "next/dist/server/request/params";
import React, { Suspense } from "react";
import Banner from "./_components/Banner";
import { IMovie } from "@/app/_types/movieTypes";
import MovieImages from "./_components/MovieImages";
import MovieInfo from "./_components/MovieInfo";
import ActorsSlider from "./_components/ActorsSlider";
import MovieSlider from "@/app/_components/MovieSlider/MovieSlider";
import Comments from "./_components/Comments";
import PageContainer from "@/app/_components/PageContainer";
import BannerLoader from "@/app/_components/BannerLoader";

export async function generateMetadata({ params }: { params: Params }) {
  const slug = (await params).slug;
  const movie = await getMovieBySlug(slug as string);

  return {
    title: `فیلم ${(movie as IMovie).englishName} - ${(movie as IMovie).name} را آنلاین دانلود و تماشا کنید | نماوا`,
  };
}

async function Page({ params }: { params: Params }) {
  const slug = (await params).slug;
  const movieData = await getMovieBySlug(slug as string);
  const movie = movieData as IMovie;
  return (
    <>
      {movie && (
        <PageContainer topPadding={false} extraStyles="text-white">
          <Suspense fallback={<BannerLoader />}>
            <Banner movie={movie} />
          </Suspense>
          <div className="mb-10 px-5 xsm:mb-8 xsm:px-6 md:mb-11 md:px-8 xl:mb-12 xl:px-11">
            <MovieImages movie={movie} />
            <MovieInfo movie={movie} />
          </div>
          {movie.actors && (
            <>
              <div className="mb-4 px-5 text-base xsm:px-6 xsm:text-lg md:px-8 md:text-base xl:px-11 xl:text-lg">
                <h3 className="font-bold">بازیگران فیلم {movie.name}</h3>
              </div>
              <div className="mb-16">
                <ActorsSlider actors={movie.actors} />
              </div>
            </>
          )}
          {movie.relatedMovies.length > 0 && (
            <MovieSlider
              disablePopup
              movies={movie.relatedMovies}
              heading={`بر اساس فیلم ${`"${movie.name}"`}`}
            />
          )}
          <Comments movieId={movie._id} />
        </PageContainer>
      )}
    </>
  );
}

export default Page;
