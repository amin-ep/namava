"use client";

import React from "react";
import PlayLink from "../PlayLink";
import MovieMoreInfoLink from "../MovieMoreInfoLink";
import MovieTrailerAction from "../MovieTrailerAction/MovieTrailerAction";
import { IMovie } from "@/app/_types/movieTypes";

type Props = {
  slug: IMovie["slug"];
  videoUrl: string;
  movieId: string;
  isFree: boolean;
};

function SliderBannerActions({ slug, videoUrl, isFree, movieId }: Props) {
  return (
    <div className="flex justify-center gap-4 xsm:justify-start">
      <PlayLink isFree={isFree} movieId={movieId} />
      <MovieTrailerAction videoUrl={videoUrl} />
      <MovieMoreInfoLink extraStyles="hidden md:flex" slug={slug} />
    </div>
  );
}

export default SliderBannerActions;
