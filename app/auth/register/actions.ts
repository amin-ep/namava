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
    const payload = removeUnrecognizedFields(Object.fromEntries(formData));
    const res: AxiosResponse<RegisterResponseData, ApiError> = await axios.post(
      `${process.env.API_BASE_URL}/auth/signup`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (res?.data?.status === "success") return { status: "success" };
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

export async function verifyEmail(
  _prevState: FormActionPreviousState,
  formData: FormData,
) {
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
    console.log(res?.status);
    if (res?.data?.status === "success") {
      (await cookies()).set({
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
