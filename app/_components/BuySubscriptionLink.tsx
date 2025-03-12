"use client";

import { IoPlay } from "react-icons/io5";
import LinkButton from "./LinkButton";

function BuySubscriptionLink() {
  return (
    <LinkButton
      extraStyles="font-semibold flex items-center gap-2"
      variation="link"
      color="white"
      href="/plans"
    >
      <IoPlay size={20} />
      خرید اشتراک
    </LinkButton>
  );
}

export default BuySubscriptionLink;
