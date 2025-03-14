"use client";

import { useApp } from "@/app/_contexts/AppContext";
import Image from "next/image";

function BannerImage() {
  const { bannerImageUrl, activeTab } = useApp();
  return (
    <Image
      className="absolute -bottom-5 h-auto w-[372px] max-w-full border-0 md:bottom-[46px] md:left-0 md:w-[440px] xl:left-[15%]"
      src={bannerImageUrl}
      alt={activeTab}
      width={220}
      height={260}
      unoptimized
    />
  );
}

export default BannerImage;
