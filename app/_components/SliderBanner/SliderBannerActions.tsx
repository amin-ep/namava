"use client";

import React from "react";
import BuySubscriptionLink from "../BuySubscriptionLink";
import MovieMoreInfoLink from "../MovieMoreInfoLink";
import MovieTrailerAction from "../MovieTrailerAction/MovieTrailerAction";
import { IMovie } from "@/app/_types/movieTypes";

type Props = { slug: IMovie["slug"]; videoUrl: string };

function SliderBannerActions({ slug, videoUrl }: Props) {
  return (
    <div className="flex justify-center gap-4 xsm:justify-start">
      <BuySubscriptionLink />
      <MovieTrailerAction videoUrl={videoUrl} />
      <MovieMoreInfoLink extraStyles="hidden md:flex" slug={slug} />
    </div>
  );
}

export default SliderBannerActions;
