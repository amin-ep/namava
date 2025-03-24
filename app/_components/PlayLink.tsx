"use client";

import { IoPlay } from "react-icons/io5";
import LinkButton from "./LinkButton";
import { useHasSubscription } from "../_hooks/useHasSubscription";

type Props = { isFree: boolean; movieId: string };

function PlayLink({ isFree, movieId }: Props) {
  const [hasSubscription] = useHasSubscription();

  return (
    <LinkButton
      extraStyles="font-semibold flex items-center gap-2"
      variation="link"
      color="white"
      href={
        hasSubscription
          ? `/play/${movieId}`
          : isFree
            ? `/play/${movieId}`
            : "/plans"
      }
    >
      <IoPlay size={20} />
      {hasSubscription ? "پخش فیلم" : isFree ? "پخش رایگان" : "خرید اشتراک"}
    </LinkButton>
  );
}

export default PlayLink;
