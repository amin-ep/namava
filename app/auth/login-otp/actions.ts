"use server";

import {
  OTPLoginResponseData,
  OTPLoginVerificationResponseData,
} from "@/app/_types/authTypes";
import { FormActionPreviousState } from "@/app/_types/globalTypes";
import { ISubscription } from "@/app/_types/subscriptionTypes";
import { User } from "@/app/_types/userTypes";
import {
  removeUnrecognizedFields,
  subscriptionExpiresAt,
} from "@/app/_utils/helpers";
import { apiRequest, handleServerActionError } from "@/app/api";
import { getCurrentSubscription } from "@/app/api/subscriptionApi";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function otpLogin(
  _prevState?: FormActionPreviousState,
  formData?: FormData,
) {
  try {
    let entryValues: null | { [k: string]: string | boolean } = null;
    const otpLoginEmail = (await cookies()).get("otp-login-email")?.value;
    if (!otpLoginEmail) {
      entryValues = removeUnrecognizedFields(
        Object.fromEntries(formData as FormData),
      );
    } else {
      entryValues = { email: otpLoginEmail };
    }

    (entryValues as { [key: string]: string | boolean }).oneTimePassword = true;

    const res = await apiRequest<OTPLoginResponseData>({
      method: "POST",
      url: "/auth/login",
      contentType: "application/json",
      authorization: false,
      data: entryValues,
    });

    if (res?.status === 200) {
      const expires = Date.now() + 1 * 60 * 60 * 1000;
      (await cookies()).set({
        name: "otp-login-email",
        value: entryValues.email as string,
        expires,
      });

      return {
        status: res?.data.status as string,
        message: res?.data.message as string,
      };
    }
  } catch (err) {
    return handleServerActionError<
      OTPLoginResponseData,
      { email: FormDataEntryValue }
    >(err, { email: (formData as FormData).get("email") || "" });
  }
}

export async function otpVerifyLogin(
  _prevState: FormActionPreviousState,
  formData: FormData,
) {
  try {
    let userData: User | undefined;
    const payload = removeUnrecognizedFields(Object.fromEntries(formData));

    const res = await apiRequest<OTPLoginVerificationResponseData>({
      method: "POST",
      contentType: "application/json",
      data: payload,
      url: "/auth/loginVerify",
    });

    if (res?.statusText === "OK") {
      userData = res.data.data;
      const cookieStore = await cookies();
      cookieStore.delete("otp-login-email");
      const expires = Date.now() + 90 * 24 * 60 * 60 * 1000;
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

      return { status: "success" };
    }
  } catch (err) {
    return handleServerActionError<
      OTPLoginVerificationResponseData,
      { verificationNumber: FormDataEntryValue }
    >(err, { verificationNumber: formData.get("verificationNumber") || "" });
  }
}

export async function logout() {
  try {
    (await cookies()).delete(process.env.JWT_SECRET_KEY as string);
    (await cookies()).delete(process.env.SUBSCRIPTION_KEY as string);

    revalidatePath("/");
  } catch (err) {
    return handleServerActionError(err);
  }
}
