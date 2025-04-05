"use server";

import { revalidatePath } from "next/cache";
import {
  IToggleReactionResponse,
  ToggleReactionPayload,
} from "../_types/reactionTypes";
import { apiRequest, handleServerActionError } from "../api";
import { IGetMoviesResponse } from "../_types/movieTypes";

export async function toggleReaction(
  data: ToggleReactionPayload,
  pathname: string,
) {
  try {
    const res = await apiRequest<
      IToggleReactionResponse,
      ToggleReactionPayload
    >({
      method: "POST",
      url: "/reaction",
      contentType: "application/json",
      authorization: true,
      data: data,
    });

    if (res.data.status === "success") {
      revalidatePath(pathname);
    }
  } catch (err) {
    return handleServerActionError(err);
  }
}

export async function generateRandomMovieId() {
  try {
    let randomMovieId: string = "";
    const response = await apiRequest<IGetMoviesResponse>({
      contentType: "application/json",
      method: "GET",
      url: "/movie",
    });

    if (response.data.status === "success") {
      const movies = response.data.data.docs;
      const randomIndex = Math.floor(Math.random() * (movies.length - 1) + 1);

      randomMovieId = movies[randomIndex]._id;
      return randomMovieId;
    }
  } catch (err) {
    return handleServerActionError(err);
  }
}
