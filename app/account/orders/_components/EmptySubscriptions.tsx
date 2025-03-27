import LinkButton from "@/app/_components/LinkButton";
import React from "react";

function EmptySubscriptions() {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-6 md:h-[308px] md:gap-8 xl:gap-10">
      <p className="text-center text-xs md:text-sm xl:text-base">
        لیست سفارش های شما خالی است.
      </p>
      <LinkButton color="primary" variation="link" href="/plans">
        خرید اشتراک
      </LinkButton>
    </div>
  );
}

export default EmptySubscriptions;
