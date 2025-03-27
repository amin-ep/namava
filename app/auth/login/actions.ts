"use server";

import { LoginResponse } from "@/app/_types/authTypes";
import { FormActionPreviousState } from "@/app/_types/globalTypes";
import { User } from "@/app/_types/userTypes";
import { removeUnrecognizedFields } from "@/app/_utils/helpers";

import { apiRequest, handleServerActionError } from "@/app/api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function login(
  _prevState: FormActionPreviousState,
  formData: FormData,
) {
  try {
    let userData: undefined | User;
    const payload = removeUnrecognizedFields(Object.fromEntries(formData));
    payload.oneTimePassword = false;

    const res = await apiRequest<LoginResponse, { [k: string]: string }>({
      method: "POST",
      url: "/auth/login",
      contentType: "application/json",
      data: payload,
    });

    if (res?.status === 200) {
      userData = res?.data.data as User;
      const expires = Date.now() + 90 * 24 * 60 * 60 * 1000;
      const cookieStore = await cookies();

      cookieStore.set({
        name: process.env.JWT_SECRET_KEY as string,
        value: res?.data.token,
        expires: expires,
      });

      if (userData.role === "user" && userData.subscriptions.length > 0) {
        const userActiveSubscription = userData.subscriptions.find(
          (sub) => new Date(sub.expiresAt).getTime() > Date.now(),
        );
        if (userActiveSubscription) {
          cookieStore.set({
            name: process.env.SUBSCRIPTION_KEY as string,
            value: userActiveSubscription?._id,
            expires: new Date(userActiveSubscription.expiresAt).getTime(),
          });
        }
      }

      revalidatePath("/");
      return { status: "success" };
    }
  } catch (err) {
    return handleServerActionError<
      LoginResponse,
      { email: FormDataEntryValue; password: FormDataEntryValue }
    >(err, {
      email: formData.get("email") || "",
      password: formData.get("password") || "",
    });
  }
}
