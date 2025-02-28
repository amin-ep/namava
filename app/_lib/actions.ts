"use server";

import {
  IToggleReactionResponse,
  ToggleReactionPayload,
} from "../_types/reactionTypes";
import { apiRequest, handleServerActionError } from "../api";

export async function toggleReactionMovie(data: ToggleReactionPayload) {
  try {
    await apiRequest<IToggleReactionResponse, ToggleReactionPayload>({
      method: "POST",
      url: "/reaction",
      contentType: "application/json",
      authorization: true,
      data: data,
    });
  } catch (err) {
    return handleServerActionError(err);
  }
}
