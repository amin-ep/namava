"use server";

import { revalidatePath } from "next/cache";
import {
  IToggleReactionResponse,
  ToggleReactionPayload,
} from "../_types/reactionTypes";
import { apiRequest, handleServerActionError } from "../api";

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
