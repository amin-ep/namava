"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useCallback, useLayoutEffect, useState } from "react";
import { toggleReaction } from "../_lib/actions";
import { IReaction, ToggleReactionPayload } from "../_types/reactionTypes";
import { User } from "../_types/userTypes";
import { getMe } from "../api/userApi";

type ReactionState = null | IReaction["value"];

export function useReaction(movieId?: string, commentId?: string) {
  const [reactionValue, setReactionValue] = useState<ReactionState>(null);

  const queryClient = useQueryClient();

  const pathname = usePathname();

  const handlePayload = useCallback(
    (value: IReaction["value"]) => {
      const payload: ToggleReactionPayload = { value };
      if (commentId) {
        payload.comment = commentId;
      } else if (movieId) {
        payload.movie = movieId;
      }

      return payload;
    },
    [commentId, movieId],
  );

  const handleLike = useCallback(async () => {
    const payload = handlePayload("like");

    await toggleReaction(payload, pathname);
    setReactionValue("like");
    queryClient.invalidateQueries({
      queryKey: ["currentUser"],
    });
  }, [handlePayload, pathname, queryClient]);

  const handleDislike = useCallback(async () => {
    const payload = handlePayload("dislike");

    await toggleReaction(payload, pathname);
    setReactionValue("dislike");
    queryClient.invalidateQueries({
      queryKey: ["currentUser"],
    });
  }, [handlePayload, pathname, queryClient]);

  const { data } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getMe,
  });

  useLayoutEffect(() => {
    if (data) {
      let userHasReacted: null | IReaction | undefined = null;
      if (movieId !== undefined) {
        userHasReacted = (data as User).reactedFields.find(
          (reaction) => reaction.movie == movieId,
        );
      } else if (commentId) {
        userHasReacted = (data as User).reactedFields.find(
          (reaction) => reaction.comment == commentId,
        );
      }
      if (userHasReacted) {
        setReactionValue(userHasReacted.value);
      } else {
        setReactionValue(null);
      }
    }
  }, [data, movieId, commentId]);

  return { handleLike, handleDislike, reactionValue };
}
