import { IMovie } from "@/app/_types/movieTypes";
import React from "react";
import cls from "classnames";

interface IProps {
  activeIndex: number;
  data: IMovie[];
}

function SliderBannerPagination({ data, activeIndex }: IProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center gap-2 md:hidden">
      {data.map((_, index) => (
        <span
          key={index}
          className={cls(
            "z-20 aspect-square w-2 rounded-full",
            activeIndex === index ? "bg-white" : "bg-white/40",
          )}
        ></span>
      ))}
    </div>
  );
}

export default SliderBannerPagination;
