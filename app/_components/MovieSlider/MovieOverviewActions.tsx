"use client";

import BuySubscriptionLink from "../BuySubscriptionLink";
import MovieMoreInfoLink from "../MovieMoreInfoLink";
import MovieReactionButtons from "../MovieReactionButtons";

type Props = { slug: string; movieId: string };

function MovieOverviewActions({ slug, movieId }: Props) {
  return (
    <div className="mb-4 flex items-center justify-start gap-3 xl:mb-[18px] xl:gap-4">
      <BuySubscriptionLink />
      {/* <TooltipIconButton tooltipTitle="افزودن به لیست">
        <HiPlus />
      </TooltipIconButton> */}
      <MovieReactionButtons movieId={movieId} />
      <MovieMoreInfoLink href={`/movie/${slug}`} />
    </div>
  );
}

export default MovieOverviewActions;
