import { apiRequest, handleServerActionError } from ".";
import { IGetActorByIdResponse } from "../_types/actorTypes";

export async function getActorById(id: string) {
  try {
    const res = await apiRequest<IGetActorByIdResponse>({
      contentType: "application/json",
      method: "GET",
      url: `/actor/${id}`,
    });

    if (res.status === 200) {
      return res?.data.data.actor;
    }
  } catch (err) {
    return handleServerActionError(err);
  }
}
