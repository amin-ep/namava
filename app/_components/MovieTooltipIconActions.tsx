"use client";

import cls from "classnames";
import {
  BsFillHandThumbsUpFill,
  BsHandThumbsDown,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
} from "react-icons/bs";
import { HiPlus } from "react-icons/hi2";
import { useReaction } from "../_hooks/useReaction";
import TooltipIconButton from "./TooltipIconButton/TooltipIconButton";

type Props = {
  movieId: string;
  extraStyles?: string;
};

function MovieTooltipIconActions({ movieId, extraStyles }: Props) {
  const { handleDislike, handleLike, reactionValue } = useReaction(movieId);

  return (
    <div className={cls("flex items-center justify-start gap-3", extraStyles)}>
      <TooltipIconButton
        onClick={() => {
          console.log("add to list");
        }}
        tooltipTitle="افزودن به لیست"
      >
        <HiPlus />
      </TooltipIconButton>
      <TooltipIconButton
        onClick={handleLike}
        disabled={reactionValue === "like"}
        tooltipTitle="دوست داشتم"
      >
        {reactionValue === "like" ? (
          <BsFillHandThumbsUpFill />
        ) : (
          <BsHandThumbsUp />
        )}
      </TooltipIconButton>
      <TooltipIconButton
        disabled={reactionValue === "dislike"}
        onClick={handleDislike}
        tooltipTitle="دوست نداشتم"
      >
        {reactionValue === "dislike" ? (
          <BsHandThumbsDownFill />
        ) : (
          <BsHandThumbsDown />
        )}
      </TooltipIconButton>
    </div>
  );
}

export default MovieTooltipIconActions;
