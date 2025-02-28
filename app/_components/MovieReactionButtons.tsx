"use client";
import React, { useEffect, useState } from "react";
import TooltipIconButton from "./TooltipIconButton/TooltipIconButton";
import { IReaction } from "../_types/reactionTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe } from "../api/userApi";
import { User } from "../_types/userTypes";
import { toggleReactionMovie } from "../_lib/actions";
import {
  BsFillHandThumbsUpFill,
  BsHandThumbsDown,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
} from "react-icons/bs";

type Props = { movieId: string };

type ReactionState = null | IReaction["value"];

function MovieReactionButtons({ movieId }: Props) {
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
    <>
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
    </>
  );
}

export default MovieReactionButtons;
