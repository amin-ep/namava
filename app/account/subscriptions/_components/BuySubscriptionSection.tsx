import LinkButton from "@/app/_components/LinkButton";
import React from "react";

function BuySubscriptionSection() {
  return (
    <>
      <p className="text-center text-xs md:text-sm xl:text-base">
        شما در حال حاضر اشتراک فعالی ندارید.
      </p>
      <LinkButton color="primary" variation="link" href="/plans">
        خرید اشتراک
      </LinkButton>
    </>
  );
}

export default BuySubscriptionSection;
