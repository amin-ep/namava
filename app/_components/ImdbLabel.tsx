import Image from "next/image";
import React from "react";

type Props = { rate: number | string };

function ImdbLabel({ rate }: Props) {
  return (
    <div className="flex items-center gap-1">
      <Image alt="imdb" src="/icons/imdb-white.svg" width={31} height={11} />
      <span>{rate}</span>
    </div>
  );
}

export default ImdbLabel;
