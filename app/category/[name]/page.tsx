import { Params } from "next/dist/server/request/params";
import React from "react";
import { getMoviesByGenre } from "@/app/api/movieApi";
import SliderBanner from "@/app/_components/SliderBanner/SliderBanner";
import { IMovie } from "@/app/_types/movieTypes";
import { findPersianCategoryName } from "@/app/_utils/helpers";

type Props = { params: Params };

async function page({ params }: Props) {
  const { name } = params;

  const categoryName = findPersianCategoryName(name as string);
  if (categoryName) {
    const movies = await getMoviesByGenre(categoryName);

    return (
      <div>
        <SliderBanner data={movies as IMovie[]} />
      </div>
    );
  }
}

export default page;
