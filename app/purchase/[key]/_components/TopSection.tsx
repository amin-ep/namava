import Logo from "@/app/_components/Logo";
import React from "react";

function TopSection() {
  return (
    <section className="relative mb-7 flex h-[60px] flex-row items-center justify-center bg-white px-4 py-2.5 text-center xsm:mb-6 md:h-20 md:px-7 md:py-[18px] xl:mb-8">
      <div className="absolute right-4 md:right-7">
        <Logo color="primary" />
      </div>

      <h1 className="text-center text-sm font-normal text-gray-900 xsm:text-xl md:text-2xl xl:text-xl">
        تکمیل خرید
      </h1>
    </section>
  );
}

export default TopSection;
