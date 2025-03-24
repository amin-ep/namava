"use server";

import {
  IPaySubscriptionPayload,
  IPaySubscriptionResponse,
} from "@/app/_types/subscriptionTypes";
import { apiRequest, handleServerActionError } from "@/app/api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function paySub(payload: IPaySubscriptionPayload) {
  try {
    const res = await apiRequest<IPaySubscriptionResponse>({
      contentType: "application/json",
      method: "POST",
      url: "/subscription",
      authorization: true,
      data: payload,
    });

    const currentTime = Date.now();

    const subscriptionExpiresAt: { [key: number]: Date } = {
      1: new Date(currentTime + 30 * 24 * 60 * 60 * 1000),
      3: new Date(currentTime + 90 * 24 * 60 * 60 * 1000),
      6: new Date(currentTime + 180 * 24 * 60 * 60 * 1000),
    };

    if (res.status === 201) {
      console.log(res.data);
      (await cookies()).set({
        name: process.env.SUBSCRIPTION_KEY as string,
        value: res?.data.data.document._id,
        expires: subscriptionExpiresAt[payload.months],
      });
      revalidatePath("/");
      return { status: "success", data: res.data.data.document };
    }
  } catch (err) {
    return handleServerActionError(err);
  }
}
