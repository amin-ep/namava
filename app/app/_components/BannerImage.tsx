"use client";

import { TabValue, useApp } from "@/app/_contexts/AppContext";
import Image from "next/image";

function BannerImage() {
  const { bannerImageUrl, activeTab } = useApp();

  const classesObj: { [k: TabValue]: string } = {
    "pc-laptop":
      "w-[372px] bottom-0 absolute max-w-full h-auto md:left-4 md:w-[440px] xl:left-[15%]",
    "android-tv":
      "absolute w-[372px] bottom-0 max-w-full h-auto md:left-4 md:w-[440px] xl:left-[15%]",
    ios: "absolute w-[220px] -bottom-9 max-w-full h-auto md:left-0 md:w-[280px] md:-bottom-20 xl:left-[15%]",
    android:
      "absolute w-[220px] -bottom-5 max-w-full h-auto md:left-0 md:w-[440px] md:-bottom-20 xl:left-[15%]",
  };

  return (
    <Image
      className={classesObj[activeTab]}
      src={bannerImageUrl}
      alt={activeTab}
      width={220}
      height={260}
      unoptimized
    />
  );
}

export default BannerImage;
