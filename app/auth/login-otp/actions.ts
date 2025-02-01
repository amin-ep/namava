"use server";

import {
  OTPLoginResponseData,
  OTPLoginVerificationResponseData,
} from "@/app/_types/authTypes";
import { ApiError, FormActionPreviousState } from "@/app/_types/globalTypes";
import {
  handleServerActionError,
  removeUnrecognizedFields,
} from "@/app/_utils/helpers";
import axios, { AxiosResponse } from "axios";
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

    const res: AxiosResponse<OTPLoginResponseData, ApiError> = await axios.post(
      `${process.env.API_BASE_URL}/auth/login`,
      entryValues,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

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
    const payload = removeUnrecognizedFields(Object.fromEntries(formData));
    const res: AxiosResponse<OTPLoginVerificationResponseData, ApiError> =
      await axios.post(
        `${process.env.API_BASE_URL}/auth/loginVerify`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

    if (res?.statusText === "OK") {
      const cookieStore = await cookies();
      cookieStore.delete("otp-login-email");
      const expires = Date.now() + 90 * 24 * 60 * 60 * 1000;
      cookieStore.set({
        name: process.env.JWT_SECRET_KEY as string,
        value: res?.data.token,
        expires: expires,
      });

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

    revalidatePath("/");
  } catch (err) {
    return handleServerActionError(err);
  }
}
