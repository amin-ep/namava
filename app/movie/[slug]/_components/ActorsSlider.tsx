"use client";

import GridSlider from "@/app/_components/GridSlider/GridSlider";
import { IMovie } from "@/app/_types/movieTypes";
import { FILE_BASE_URL } from "@/app/_utils/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SwiperSlide } from "swiper/react";

type Props = { actors: IMovie["actors"] };

function ActorsSlider({ actors }: Props) {
  return (
    <div>
      {actors!.length > 0 && (
        <GridSlider dataType="actors">
          {actors?.map((actor, i) => (
            <SwiperSlide key={i}>
              <Link
                href={`/actor/${actor.actorId._id}`}
                className="flex flex-col items-center gap-3 xl:gap-4"
              >
                <Image
                  src={`${FILE_BASE_URL}/${actor.actorId.imageUrl}`}
                  alt={actor.actorId.name}
                  width={86}
                  height={86}
                  className="aspect-square w-full rounded-full object-cover"
                  unoptimized
                />
                <h3 className="text-xs leading-[1.75] text-white xl:text-sm xl:leading-6">
                  {actor.actorId.name}
                </h3>
              </Link>
            </SwiperSlide>
          ))}
        </GridSlider>
      )}
    </div>
  );
}

export default ActorsSlider;
