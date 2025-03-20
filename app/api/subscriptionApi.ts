import { apiRequest, handleServerActionError } from ".";
import { IGetMySubscriptionResponse } from "../_types/subscriptionTypes";

export async function getMySubscription() {
  try {
    const res = await apiRequest<IGetMySubscriptionResponse>({
      contentType: "application/json",
      method: "GET",
      url: "/subscription/mySubs",
      authorization: true,
    });

    if (res.status === 200) {
      return res.data.data;
    }
  } catch (err) {
    return handleServerActionError(err);
  }
}
