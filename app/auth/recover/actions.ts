"use server";

import {
  IForgetPasswordResponse,
  IForgetPasswordVerifyResponse,
  IResetPasswordResponse,
} from "@/app/_types/authTypes";
import { ApiError, FormActionPreviousState } from "@/app/_types/globalTypes";
import { JWT_EXPIRATION_DATE } from "@/app/_utils/constants";
import {
  handleServerActionError,
  removeUnrecognizedFields,
} from "@/app/_utils/helpers";
import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";

export async function forgetPassword(
  _prevState?: FormActionPreviousState,
  formData?: FormData,
) {
  try {
    let payload: null | { [k: string]: string } = null;
    const cookieStore = await cookies();

    const forgetPasswordEmail = cookieStore.get("FORGET-PASSWORD-EMAIL")?.value;
    if (!forgetPasswordEmail) {
      payload = removeUnrecognizedFields(
        Object.fromEntries(formData as FormData),
      );
    } else {
      payload = { email: forgetPasswordEmail as string };
    }
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
      const expires = Date.now() + 90 * 24 * 60 * 60 * 1000;

      cookieStore.set({
        name: "FORGET-PASSWORD-EMAIL",
        value: payload.email,
        expires,
      });
      return { status: "success" };
    }
  } catch (err) {
    return handleServerActionError<
      IForgetPasswordResponse,
      { email: FormDataEntryValue }
    >(err, { email: (formData as FormData).get("email") || "" });
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
    return handleServerActionError<
      IForgetPasswordVerifyResponse,
      { email: FormDataEntryValue }
    >(err, { email: formData.get("email") || "" });
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
    return handleServerActionError<
      IResetPasswordResponse,
      { password: string; resetId: string }
    >(err, {
      password: (String(formData.get("password")) as string) || "",
      resetId: (String(formData.get("resetId")) as string) || "",
    });
  }
}
