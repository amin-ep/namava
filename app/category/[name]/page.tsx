import { Params } from "next/dist/server/request/params";
import React from "react";
import { getMoviesByGenre } from "@/app/api/movieApi";
import SliderBanner from "@/app/_components/SliderBanner/SliderBanner";
import { IMovie } from "@/app/_types/movieTypes";
import { findPersianCategoryName } from "@/app/_utils/helpers";
import MovieSlider from "@/app/_components/MovieSlider/MovieSlider";
import SliderWrapper from "./_components/SliderWrapper";
import PageContainer from "@/app/_components/PageContainer";

type Props = { params: Params };

async function page({ params }: Props) {
  const { name } = await params;

  const categoryName = findPersianCategoryName(name as string);
  if (categoryName) {
    const movies = await getMoviesByGenre(categoryName);

    return (
      <PageContainer topPadding={false}>
        <SliderBanner data={(movies as IMovie[]).slice(0, 5)} />
        <MovieSlider
          heading={`فیلم های ${categoryName}`}
          movies={movies as IMovie[]}
        />
        <SliderWrapper categoryName={name as string} />
      </PageContainer>
    );
  }
}

export default page;
