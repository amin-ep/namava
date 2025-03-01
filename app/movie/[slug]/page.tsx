import { getMovieBySlug } from "@/app/api/movieApi";
import { Params } from "next/dist/server/request/params";
import React, { Suspense } from "react";
import Banner from "./_components/Banner";
import { IMovie } from "@/app/_types/movieTypes";
import MovieImages from "./_components/MovieImages";
import MovieInfo from "./_components/MovieInfo";
import ActorsSlider from "./_components/ActorsSlider";
import MovieSlider from "@/app/_components/MovieSlider/MovieSlider";

async function Page({ params }: { params: Params }) {
  const slug = (await params).slug;
  const movie = await getMovieBySlug(slug as string);
  return (
    <>
      {movie && (
        <div className="pb-36 text-white">
          <Suspense fallback={<p className="text-8xl">Loading...</p>}>
            <Banner movie={movie as IMovie} />
          </Suspense>
          <div className="mb-10 px-5 xsm:mb-8 xsm:px-6 md:mb-11 md:px-8 xl:mb-12 xl:px-11">
            <MovieImages movie={movie as IMovie} />
            <MovieInfo movie={movie as IMovie} />
          </div>
          <div className="mb-4 px-5 text-base xsm:px-6 xsm:text-lg md:px-8 md:text-base xl:px-11 xl:text-lg">
            <h3 className="font-bold">
              بازیگران فیلم {(movie as IMovie).name}
            </h3>
          </div>
          <div className="mb-16">
            <ActorsSlider actors={(movie as IMovie).actors} />
          </div>
          <MovieSlider
            disablePopup
            movies={(movie as IMovie).relatedMovies}
            heading={`بر اساس فیلم ${`"${(movie as IMovie).name}"`}`}
          />
        </div>
      )}
    </>
  );
}

export default Page;
