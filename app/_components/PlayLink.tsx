"use client";

import { IoPlay } from "react-icons/io5";
import LinkButton from "./LinkButton";

type Props = { isFree: boolean; movieId: string };

function PlayLink({ isFree, movieId }: Props) {
  return (
    <LinkButton
      extraStyles="font-semibold flex items-center gap-2"
      variation="link"
      color="white"
      href={isFree ? `/play/${movieId}` : "/plans"}
    >
      <IoPlay size={20} />
      {isFree ? "پخش رایگان" : "خرید اشتراک"}
    </LinkButton>
  );
}

export default PlayLink;
