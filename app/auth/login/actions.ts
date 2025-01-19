"use server";

import { LoginResponse } from "@/app/_types/AuthTypes";
import { removeUnrecognizedFields } from "@/app/_utils/helpers";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";

export async function login(
  _prevState: { status: string; message: string } | null | undefined,
  formData: FormData,
) {
  try {
    const payload = removeUnrecognizedFields(Object.fromEntries(formData));
    payload.oneTimePassword = false;

    const res: AxiosResponse<LoginResponse, ApiError> = await axios.post(
      `${process.env.API_BASE_URL}/auth/login`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (res?.status === 200) {
      return { status: "success", message: "login" };
    }
  } catch (err) {
    const error = err as AxiosError<ApiError, LoginResponse>;

    return {
      status: "error",
      message:
        error?.response?.data.message ||
        "مشکلی در ارسال درخواست پیش آمد. لطفا بعدا تلاش کنید.",
    };
  }
}
