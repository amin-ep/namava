"use server";

import { ApiError, FormActionPreviousState } from "@/app/_types/globalTypes";
import { removeUnrecognizedFields } from "@/app/_utils/helpers";
import axios, { AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";
import {
  RegisterResponseData,
  RegisterVerificationResponseData,
} from "../../_types/authTypes";
import { JWT_EXPIRATION_DATE } from "../../_utils/constants";

export default async function signup(
  _prevState: FormActionPreviousState,
  formData: FormData,
) {
  try {
    let payload: null | { [k: string]: string } = null;
    const cookieStore = await cookies();

    const signupEmail = cookieStore.get("SIGNUP-EMAIL")?.value;
    if (!signupEmail) {
      payload = removeUnrecognizedFields(Object.fromEntries(formData));
    } else {
      payload = { email: signupEmail as string };
    }
    const res: AxiosResponse<RegisterResponseData, ApiError> = await axios.post(
      `${process.env.API_BASE_URL}/auth/signup`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (res?.data?.status === "success") {
      const expires = Date.now() + 90 * 24 * 60 * 60 * 1000;
      cookieStore.set({
        name: "SIGNUP-EMAIL",
        value: formData.get("email") as string,
        expires: expires,
      });
      return { status: "success" };
    }
  } catch (err) {
    const error = err as AxiosError<ApiError, RegisterResponseData>;

    return {
      status: "error",
      message:
        error?.response?.data.message ||
        "مشکلی در ارسال درخواست پیش آمد. لطفا بعدا تلاش کنید.",
      values: {
        email: formData?.get("email"),
      },
    };
  }
}

export async function verifyEmail(
  _prevState: FormActionPreviousState,
  formData: FormData,
) {
  console.log(formData);
  try {
    const res: AxiosResponse<RegisterVerificationResponseData> =
      await axios.post(
        `${process.env.API_BASE_URL}/auth/verifyEmail`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    if (res?.data?.status === "success") {
      const cookieStore = await cookies();
      cookieStore.delete("SIGNUP-EMAIL");
      cookieStore.set({
        name: process.env.JWT_SECRET_KEY as string,
        value: res?.data.token,
        expires: JWT_EXPIRATION_DATE,
      });
      return { status: res?.data.status };
    }
  } catch (err) {
    const error = err as AxiosError<ApiError, RegisterResponseData>;

    return {
      status: "error",
      message:
        error?.response?.data.message ||
        "مشکلی در ارسال درخواست پیش آمد. لطفا بعدا تلاش کنید.",
    };
  }
}
