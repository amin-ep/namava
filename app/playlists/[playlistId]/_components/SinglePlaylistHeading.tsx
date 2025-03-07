"use client";

import { IPlaylist } from "@/app/_types/playlistTypes";
import React from "react";
import TooltipButton from "./TooltipButton";

type Props = { title: IPlaylist["title"]; playlistId: string; length: number };

function SinglePlaylistHeading({ length, playlistId, title }: Props) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
      <p className="align-middle text-base">
        <span>{title}</span>
        <span className="text-gray-400">({length})</span>
      </p>
      <div className="flex items-center justify-end gap-6">
        <TooltipButton
          onClick={() => console.log("tooltip")}
          img={{ alt: "فیلتر", src: "/icons/sort-amount-down-white.svg" }}
          tooltipTitle="جدیدترین به قدیمی ترین"
        />
        <TooltipButton
          onClick={() => console.log("tooltip")}
          img={{ alt: "تغییر نام", src: "/icons/pen-white.svg" }}
          tooltipTitle="تغییر نام"
        />
        <TooltipButton
          onClick={() => console.log("tooltip")}
          img={{ alt: "حذف", src: "/icons/trash-white.svg" }}
          tooltipTitle="حذف از لیست"
        />
      </div>
    </div>
  );
}

export default SinglePlaylistHeading;
