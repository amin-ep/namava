"use client";

import React from "react";
import BuySubscriptionLink from "../BuySubscriptionLink";
import LinkButton from "../LinkButton";
import MovieMoreInfoLink from "../MovieMoreInfoLink";

type Props = { infoHrefPath: string; onTrailerButtonClick: () => void };

function SliderBannerActions({ infoHrefPath, onTrailerButtonClick }: Props) {
  return (
    <div className="flex justify-center gap-4 xsm:justify-start">
      <BuySubscriptionLink />
      <LinkButton
        extraStyles="z-20"
        color="glassy"
        variation="button"
        onClick={onTrailerButtonClick}
        buttonType="button"
      >
        پیش نمایش
      </LinkButton>
      <MovieMoreInfoLink
        extraStyles="hidden md:flex"
        href={`/movie/${infoHrefPath}`}
      />
    </div>
  );
}

export default SliderBannerActions;
