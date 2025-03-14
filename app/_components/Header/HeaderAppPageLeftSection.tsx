import React from "react";
import LinkButton from "../LinkButton";
import Link from "next/link";

function HeaderAppPageLeftSection() {
  return (
    <div className="flex items-center justify-end gap-3 xsm:gap-6 md:gap-5 lg:gap-6">
      <Link
        href="/plans"
        className="text-xs text-white hover:text-primary-light md:text-sm xl:text-base"
      >
        خرید اشتراک
      </Link>
      <LinkButton
        variation="link"
        color="glassy"
        href="/"
        extraStyles="md:text-sm md:h-12 xl:h-[52px] xl:w-[149px]"
      >
        ورود به نماوا
      </LinkButton>
    </div>
  );
}

export default HeaderAppPageLeftSection;
