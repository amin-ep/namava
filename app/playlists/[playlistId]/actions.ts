"use server";

import { IDeleteItemFromListResponse } from "@/app/_types/playlistTypes";
import { apiRequest, handleServerActionError } from "@/app/api";
import { revalidatePath } from "next/cache";

export async function deleteItemFromList(listId: string, data: string[]) {
  try {
    const res = await apiRequest<IDeleteItemFromListResponse>({
      url: `/list/deleteMovie/${listId}`,
      contentType: "application/json",
      method: "DELETE",
      authorization: true,
      data: { deletedItems: data },
    });

    if (res.status === 204) {
      revalidatePath(`/playlists/${listId}`);
      return { status: "success", message: "" };
    }
  } catch (err) {
    return handleServerActionError(err);
  }
}
