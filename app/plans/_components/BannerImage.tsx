"use client";

import { useMediaQuery } from "@mui/material";
import Image from "next/image";

function BannerImage() {
  const isLargeWindow = useMediaQuery("(min-width:768px)");

  return (
    <div className="mb-5 h-[184px] w-full xsm:h-[202px] md:mb-8 md:h-28">
      <Image
        width={320}
        height={184}
        className="h-full w-full rounded-xl object-cover"
        src={
          isLargeWindow
            ? "/plans-page-banner.jpg"
            : "/plans-page-banner-mini.jpg"
        }
        alt="banner"
        unoptimized
      />
    </div>
  );
}

export default BannerImage;
