"use client";

import React, { useState } from "react";
import VideoControlButton from "./VideoControlButton";
import { IMovie } from "@/app/_types/movieTypes";
import { useRouter } from "next/navigation";
import VideoSpeedMenu from "./VideoSpeedMenu";

type Props = { movie: IMovie };

function VideoTopSection({ movie }: Props) {
  const [speedOptionsIsOpen, setSpeedOptionsIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="absolute left-0 right-0 top-0 z-10 flex h-[100px] items-center justify-between px-6 text-white lg:px-8">
      <VideoControlButton
        alt="back"
        iconPath="/icons/arrow-right-white.svg"
        onClick={() => router.back()}
      />
      {speedOptionsIsOpen && (
        <VideoSpeedMenu close={() => setSpeedOptionsIsOpen(false)} />
      )}
      <p className="text-xs leading-8 lg:text-base">{movie.name}</p>
      <VideoControlButton
        iconPath="/icons/dots-3-vertical-white.svg"
        alt="speed"
        onClick={() => setSpeedOptionsIsOpen(true)}
      />
    </div>
  );
}

export default VideoTopSection;
