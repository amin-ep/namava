"use server";

import { LoginResponse } from "@/app/_types/authTypes";
import { ApiError, FormActionPreviousState } from "@/app/_types/globalTypes";
import { removeUnrecognizedFields } from "@/app/_utils/helpers";
import axios, { AxiosError, AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function login(
  _prevState: FormActionPreviousState,
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
      const expires = Date.now() + 90 * 24 * 60 * 60 * 1000;
      (await cookies()).set({
        name: process.env.JWT_SECRET_KEY as string,
        value: res?.data.token,
        expires: expires,
      });
      revalidatePath("/");
      return { status: "success" };
    }
  } catch (err) {
    const error = err as AxiosError<ApiError, LoginResponse>;
    return {
      status: "error",
      message:
        error?.response?.data.message ||
        "مشکلی در ارسال درخواست پیش آمد. لطفا بعدا تلاش کنید.",
      values: {
        email: formData.get("email"),
        password: formData.get("password"),
      },
    };
  }
}
