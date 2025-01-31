"use server";

import {
  IForgetPasswordResponse,
  IForgetPasswordVerifyResponse,
  IResetPasswordResponse,
} from "@/app/_types/authTypes";
import { ApiError, FormActionPreviousState } from "@/app/_types/globalTypes";
import { JWT_EXPIRATION_DATE } from "@/app/_utils/constants";
import { removeUnrecognizedFields } from "@/app/_utils/helpers";
import axios, { AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";

export async function forgetPassword(
  _prevState: FormActionPreviousState,
  formData: FormData,
) {
  try {
    const payload = removeUnrecognizedFields(Object.fromEntries(formData));
    const res = await axios.post(
      `${process.env.API_BASE_URL}/auth/forgetPassword`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (res.status === 200) {
      return { status: "success" };
    }
  } catch (err) {
    const error = err as AxiosError<ApiError, IForgetPasswordResponse>;

    if (error) {
      return {
        status: "error",
        message:
          error?.response?.data.message ||
          "مشکلی در ارسال درخواست پیش آمد. لطفا بعدا تلاش کنید.",
        values: {
          email: formData.get("email"),
        },
      };
    }
  }
}

export async function forgetPasswordVerify(
  _prevState: FormActionPreviousState,
  formData: FormData,
) {
  try {
    const payload = removeUnrecognizedFields(Object.fromEntries(formData));
    const res: AxiosResponse<IForgetPasswordVerifyResponse, ApiError> =
      await axios.post(
        `${process.env.API_BASE_URL}/auth/forgetPasswordVerify`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

    if (res.status === 200) {
      return { status: "success", message: res?.data.resetId };
    }
  } catch (err) {
    const error = err as AxiosError<ApiError, IForgetPasswordVerifyResponse>;

    if (error) {
      return {
        status: "error",
        message:
          error?.response?.data.message ||
          "مشکلی در ارسال درخواست پیش آمد. لطفا بعدا تلاش کنید.",
        values: {
          email: formData.get("email"),
        },
      };
    }
  }
}

export async function resetPassword(
  _prevState: FormActionPreviousState,
  formData: FormData,
) {
  try {
    const payload = removeUnrecognizedFields(Object.fromEntries(formData));
    const res: AxiosResponse<IResetPasswordResponse, ApiError> =
      await axios.patch(
        `${process.env.API_BASE_URL}/auth/resetPassword`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

    if (res.status === 200) {
      (await cookies()).set({
        name: process.env.JWT_SECRET_KEY as string,
        value: res?.data.token,
        expires: JWT_EXPIRATION_DATE,
      });
      return { status: "success" };
    }
  } catch (err) {
    const error = err as AxiosError<ApiError, IForgetPasswordVerifyResponse>;

    return {
      status: "error",
      message:
        error?.response?.data.message ||
        "مشکلی در ارسال درخواست پیش آمد. لطفا بعدا تلاش کنید.",
      values: {
        password: (String(formData.get("password")) as string) || "",
        resetId: (String(formData.get("resetId")) as string) || "",
      },
    };
  }
}
