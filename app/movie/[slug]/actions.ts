"use server";

import {
  ICreateCommentPayload,
  ICreateCommentResponse,
} from "@/app/_types/commentTypes";
import { apiRequest, handleServerActionError } from "@/app/api";
import { revalidatePath } from "next/cache";

export async function createComment(
  payload: ICreateCommentPayload,
  slug: string,
) {
  try {
    const res = await apiRequest<ICreateCommentResponse>({
      contentType: "application/json",
      method: "POST",
      url: "/comment",
      data: payload,
      authorization: true,
    });

    if (res.data.status === "success") {
      revalidatePath(`/movie/${slug}`);
      return res.data.status;
    }
  } catch (err) {
    return handleServerActionError(err);
  }
}
