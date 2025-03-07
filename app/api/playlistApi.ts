import { apiRequest, handleServerActionError } from ".";
import {
  IGetCurrentUserPlaylist,
  IGetPlaylistByIdResponse,
} from "../_types/playlistTypes";

export async function getCurrentUserList() {
  try {
    const res = await apiRequest<IGetCurrentUserPlaylist>({
      method: "GET",
      url: "/list/myList",
      authorization: true,
      contentType: "application/json",
    });

    if (res?.data.status === "success") {
      return res.data.data;
    }
  } catch (err) {
    return handleServerActionError(err);
  }
}

export async function getPlaylistById(id: string) {
  try {
    const res = await apiRequest<IGetPlaylistByIdResponse>({
      method: "GET",
      contentType: "application/json",
      url: `/list/${id}`,
      authorization: true,
    });

    if (res.status === 200) return res?.data.data.document;
  } catch (err) {
    return handleServerActionError(err);
  }
}
