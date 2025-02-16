"use client";

import Image from "next/image";
import LinkButton from "./LinkButton";
import { useState } from "react";

function BuySubscriptionLink() {
  const [hovered, setHovered] = useState(false);
  return (
    <LinkButton
      extraStyles="font-semibold flex items-center gap-2"
      variation="link"
      color="white"
      href="/plans"
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <Image
        src={`/icons/play-${hovered ? "white" : "dark"}.svg`}
        alt="play"
        width={13}
        height={13}
      />
      خرید اشتراک
    </LinkButton>
  );
}

export default BuySubscriptionLink;
