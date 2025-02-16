import Image from "next/image";
import React from "react";
import { useSwiper } from "swiper/react";

type Direction = "right" | "left";

function SliderBannerButtons() {
  const swiper = useSwiper();

  const getImageInButton: (e: React.MouseEvent) => HTMLImageElement = (e) => {
    const event = e.target as HTMLButtonElement;
    const image = event.children[0] as HTMLImageElement;
    return image;
  };

  // Button Mouse Enter
  const handleButtonMouseEnter = (
    e: React.MouseEvent,
    direction: Direction,
  ) => {
    const imageChild = getImageInButton(e);
    if (imageChild) {
      imageChild.src = `${window.location.origin}/icons/chevron-${direction}-white.svg`;
    }
  };

  // Button Mouse leave
  const handleButtonMouseLeave = (
    e: React.MouseEvent,
    direction: Direction,
  ) => {
    const imageChild = getImageInButton(e);
    if (imageChild) {
      imageChild.src = `${window.location.origin}/icons/chevron-${direction}-gray.svg`;
    }
  };

  return (
    <div className="absolute bottom-[4.6875vw] left-0 z-10 hidden items-center gap-3 md:flex xl:bottom-[10vw]">
      <button
        onMouseEnter={(e) => handleButtonMouseEnter(e, "right")}
        onMouseLeave={(e) => handleButtonMouseLeave(e, "right")}
        className="flex aspect-square w-10 items-center justify-center rounded-full bg-white/25"
        onClick={() => swiper.slideNext()}
      >
        <Image
          alt="arrow"
          width={20}
          height={20}
          src="/icons/chevron-right-gray.svg"
        />
      </button>
      <button
        onMouseEnter={(e) => handleButtonMouseEnter(e, "left")}
        onMouseLeave={(e) => handleButtonMouseLeave(e, "left")}
        className="flex aspect-square w-10 items-center justify-center rounded-full bg-white/25"
        onClick={() => swiper.slidePrev()}
      >
        <Image
          alt="arrow"
          width={20}
          height={20}
          src="/icons/chevron-left-gray.svg"
        />
      </button>
      <button className="white/60 aspect-square w-10 rounded-full"></button>
    </div>
  );
}

export default SliderBannerButtons;
