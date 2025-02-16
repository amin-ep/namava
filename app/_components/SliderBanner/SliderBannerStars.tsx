import { IMovie } from "@/app/_types/movieTypes";
import Link from "next/link";
import React from "react";

type Props = { actors: IMovie["actors"] };

function SliderBannerStars({ actors }: Props) {
  return (
    <div className="hidden text-xs text-gray-300 xsm:flex">
      <span className="pl-1">ستارگان:</span>
      {actors
        ?.filter((el) => el?.isStar === true)
        .map((actor, index) => (
          <Link
            key={actor?.actorId?._id}
            href={`/actor/${actor.actorId._id}`}
            className="cursor-pointer"
          >
            {actor.actorId.name}
            {index !== actors.length - 1 && ","}
          </Link>
        ))}
    </div>
  );
}

export default SliderBannerStars;
