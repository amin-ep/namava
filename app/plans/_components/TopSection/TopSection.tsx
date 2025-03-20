import Logo from "@/app/_components/Logo";
import React from "react";
import StatusButton from "./StatusButton";

function TopSection() {
  return (
    <section className="flex h-[60px] items-center justify-between bg-white px-4 py-2.5 md:h-20 md:px-7 md:py-[18px]">
      <Logo color="primary" />
      <StatusButton />
    </section>
  );
}

export default TopSection;
