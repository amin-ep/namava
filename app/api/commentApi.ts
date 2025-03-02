import { apiRequest, handleServerActionError } from ".";
import { IGetCommentResponse } from "../_types/commentTypes";

export async function getMovieComments(movieId: string) {
  try {
    const res = await apiRequest<IGetCommentResponse>({
      contentType: "application/json",
      method: "GET",
      url: `/movie/${movieId}/comment`,
      authorization: false,
    });

    if (res?.data.status === "success") {
      return res.data.data.docs;
    }
  } catch (err) {
    return handleServerActionError(err);
  }
}
