import { cookies } from "next/headers";
import { apiRequest, handleServerActionError } from ".";
import {
  IGetCurrentSubscriptionResponse,
  IGetMySubscriptionResponse,
} from "../_types/subscriptionTypes";

export async function getMySubscriptions() {
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

export async function getCurrentSubscription() {
  try {
    const id = (await cookies()).get(
      process.env.SUBSCRIPTION_KEY as string,
    )?.value;

    const res = await apiRequest<IGetCurrentSubscriptionResponse>({
      contentType: "application/json",
      method: "GET",
      url: `/subscription/${id}`,
      authorization: true,
    });

    if (res.status === 200) {
      return res.data.data.document;
    }
  } catch (err) {
    return handleServerActionError(err);
  }
}
