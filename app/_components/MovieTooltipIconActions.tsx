"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import cls from "classnames";
import { useEffect, useState } from "react";
import {
  BsFillHandThumbsUpFill,
  BsHandThumbsDown,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
} from "react-icons/bs";
import { toggleReactionMovie } from "../_lib/actions";
import { IReaction } from "../_types/reactionTypes";
import { User } from "../_types/userTypes";
import { getMe } from "../api/userApi";
import TooltipIconButton from "./TooltipIconButton/TooltipIconButton";
import { HiPlus } from "react-icons/hi2";

type Props = {
  movieId: string;
  extraStyles?: string;
};

type ReactionState = null | IReaction["value"];

function MovieTooltipIconActions({ movieId, extraStyles }: Props) {
  const [reactionValue, setReactionValue] = useState<ReactionState>(null);

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getMe,
  });

  useEffect(() => {
    if (data) {
      const userHasReactedMovie = (data as User).reactedMovies.find(
        (reaction) => reaction.movie == movieId,
      );
      if (userHasReactedMovie) {
        setReactionValue(userHasReactedMovie.value);
        queryClient.invalidateQueries({
          queryKey: ["currentUser"],
        });
      } else {
        setReactionValue(null);
      }
    }
  }, [setReactionValue, data, movieId, queryClient]);

  const handleReactionLike = async () => {
    await toggleReactionMovie({ movie: movieId, value: "like" });
    setReactionValue("like");
    queryClient.invalidateQueries({
      queryKey: ["currentUser"],
    });
  };

  const handleReactionDislike = async () => {
    await toggleReactionMovie({ movie: movieId, value: "dislike" });
    setReactionValue("dislike");
    queryClient.invalidateQueries({
      queryKey: ["currentUser"],
    });
  };
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
      <TooltipIconButton onClick={handleReactionLike} tooltipTitle="دوست داشتم">
        {reactionValue === "like" ? (
          <BsFillHandThumbsUpFill />
        ) : (
          <BsHandThumbsUp />
        )}
      </TooltipIconButton>
      <TooltipIconButton
        onClick={handleReactionDislike}
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
