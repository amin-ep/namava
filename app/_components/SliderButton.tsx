"use client";

import cls from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";

type Props = {
  target: "next" | "prev";
  className?: string;
  parentIsEntered: boolean;
};

function SliderButton({ target, className, parentIsEntered }: Props) {
  const [disabledButtonTarget, setDisabledButtonTarget] = useState<
    null | string
  >(null);

  const swiper = useSwiper();

  const handleClick = () => {
    switch (target) {
      case "next":
        swiper.slideNext();
        break;
      case "prev":
        swiper.slidePrev();
        break;
      default:
        throw new Error("Unknown target");
    }
  };

  useEffect(() => {
    const handleDisable = () => {
      if (swiper.isEnd) {
        setDisabledButtonTarget("next");
      } else if (swiper.isBeginning) {
        setDisabledButtonTarget("prev");
      } else if (swiper.isLocked) {
        setDisabledButtonTarget("both");
      } else if (!swiper.isEnd && !swiper.isBeginning) {
        setDisabledButtonTarget(null);
      }
    };
    swiper.on("slideChange", handleDisable);
    handleDisable();
  }, [swiper]);

  return (
    <button
      onClick={handleClick}
      className={cls(
        `${target === "next" ? "left" : "right"}-0 ${target === "next" ? "bg-gradient-to-l" : target === "prev" ? "bg-gradient-to-r" : ""}`,
        "absolute top-0 z-10 flex w-[30px] items-center justify-center from-transparent to-gray-950 text-white transition duration-700",
        (target === disabledButtonTarget || disabledButtonTarget === "both") &&
          "hidden",
        className,
        parentIsEntered ? "opacity-100" : "opacity-0",
      )}
    >
      <Image
        src={`/icons/chevron-${target === "next" ? "left" : "right"}-white.svg`}
        alt="chevron"
        width={9}
        height={13}
        className="w-6"
      />
    </button>
  );
}

export default SliderButton;
