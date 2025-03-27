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

    if (res.status === 201) {
      const subscriptionExpiresAt = (monthsToExpire: number) => {
        let duration: Date | null = null;
        const currentTime = Date.now();
        const subscriptionExpiresAt: {
          duration: Date;
          months: number;
        }[] = [
          {
            duration: new Date(currentTime + 30 * 24 * 60 * 60 * 1000),
            months: 1,
          },
          {
            duration: new Date(currentTime + 90 * 24 * 60 * 60 * 1000),
            months: 3,
          },
          {
            duration: new Date(currentTime + 180 * 24 * 60 * 60 * 1000),
            months: 6,
          },
        ];

        duration =
          subscriptionExpiresAt.find((el) => el.months == monthsToExpire)
            ?.duration || null;

        if (duration == null) {
          throw new Error("Invalid expiresAt");
        } else {
          return duration;
        }
      };
      const expires = subscriptionExpiresAt(payload.months);
      (await cookies()).set({
        name: process.env.SUBSCRIPTION_KEY as string,
        value: res?.data.data.document._id,
        expires: expires,
      });
      revalidatePath("/");
      return { status: "success", data: res.data.data.document };
    }
  } catch (err) {
    return handleServerActionError(err);
  }
}
