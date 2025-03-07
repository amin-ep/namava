"use server";

import { revalidatePath } from "next/cache";
import { FormActionPreviousState } from "../_types/globalTypes";
import {
  IAddMovieToListResponse,
  ICreatePlaylistPayload,
  ICreatePlaylistResponse,
} from "../_types/playlistTypes";
import { removeUnrecognizedFields } from "../_utils/helpers";
import { apiRequest, handleServerActionError } from "../api";

export async function createPlaylist(
  _prevState: FormActionPreviousState,
  formData: FormData,
) {
  try {
    const payload = removeUnrecognizedFields(Object.fromEntries(formData));
    if (payload.movies) payload.movies = [payload.movies];
    const res = await apiRequest<ICreatePlaylistResponse>({
      url: "/list",
      contentType: "application/json",
      method: "POST",
      authorization: true,
      data: payload,
    });

    if (res?.data.status === "success") {
      revalidatePath("/playlists");
      return { status: "success", message: "لیست جدید با موفقیت ایجاد شد." };
    }
  } catch (err) {
    return handleServerActionError<
      ICreatePlaylistPayload,
      { title: FormDataEntryValue }
    >(err, { title: formData.get("title") || "" });
  }
}

export async function deletePlaylistById(id: string) {
  try {
    const res = await apiRequest({
      method: "DELETE",
      contentType: "application/json",
      url: `/list/${id}`,
      authorization: true,
    });

    if (res.status === 204) {
      revalidatePath("/playlist");
      return { status: "success" };
    }
  } catch (err) {
    return handleServerActionError(err);
  }
}

export async function editPlaylistTitle(newTitle: string, id: string) {
  try {
    const res = await apiRequest({
      method: "PATCH",
      contentType: "application/json",
      url: `/list/${id}`,
      data: { title: newTitle },
      authorization: true,
    });

    if (res.status === 200) {
      revalidatePath("/playlists");
      return {
        status: "success",
        message: "نام لیست با موفقیت ویرایش شد.",
      };
    }
  } catch (err) {
    return handleServerActionError(err, { title: newTitle });
  }
}

export async function addSingleMovieToList(listId: string, movieId: string) {
  try {
    const res = await apiRequest<IAddMovieToListResponse>({
      method: "PATCH",
      url: `/list/addMovie/${listId}`,
      contentType: "application/json",
      authorization: true,
      data: { movies: [movieId] },
    });
    if (res?.status === 200) {
      return {
        status: "success",
        message: `به لیست ${res.data.data.document.title} اضافه شد.`,
      };
    }
  } catch (err) {
    return handleServerActionError(err);
  }
}
