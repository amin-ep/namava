"use server";

import {
  OTPLoginResponseData,
  OTPLoginVerificationResponseData,
} from "@/app/_types/authTypes";
import { ApiError, FormActionPreviousState } from "@/app/_types/globalTypes";
import { removeUnrecognizedFields } from "@/app/_utils/helpers";
import axios, { AxiosError, AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function otpLogin(
  _prevState: FormActionPreviousState,
  formData: FormData,
) {
  try {
    const entryValues = removeUnrecognizedFields(Object.fromEntries(formData));
    entryValues.oneTimePassword = true;
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
      return {
        status: res?.data.status as string,
        message: res?.data.message as string,
      };
    }
  } catch (err) {
    const error = err as AxiosError<ApiError, OTPLoginResponseData>;
    if (error) {
      return {
        status: "error",
        message: error?.response?.data.message,
        values: {
          email: formData.get("email"),
        },
      };
    }
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
      const expires = Date.now() + 90 * 24 * 60 * 60 * 1000;
      (await cookies()).set({
        name: process.env.JWT_SECRET_KEY as string,
        value: res?.data.token,
        expires: expires,
      });

      return { status: "success" };
    }
  } catch (err) {
    const error = err as AxiosError<ApiError, OTPLoginResponseData>;

    return {
      status: "error",
      message:
        error?.response?.data.message ||
        "مشکلی در ارسال درخواست پیش آمد. لطفا بعدا تلاش کنید.",
      values: {
        verificationNumber: formData.get("verificationNumber"),
      },
    };
  }
}

export async function logout() {
  try {
    (await cookies()).delete(process.env.JWT_SECRET_KEY as string);

    revalidatePath("/");
  } catch (err) {
    const error = err as AxiosError<ApiError, OTPLoginResponseData>;

    return {
      status: "error",
      message:
        error?.response?.data.message ||
        "مشکلی در ارسال درخواست پیش آمد. لطفا بعدا تلاش کنید.",
    };
  }
}
