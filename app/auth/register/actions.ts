"use server";

import axios, { AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";
import {
  RegisterPayload,
  RegisterResponseData,
  RegisterVerificationPayload,
  RegisterVerificationResponseData,
} from "../../_types/AuthTypes";
import { JWT_EXPIRATION_DATE } from "../../_utils/constants";

export default async function signup(payload: RegisterPayload) {
  try {
    const res: AxiosResponse<RegisterResponseData> = await axios.post(
      `${process.env.API_BASE_URL}/auth/signup`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return res?.statusText;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      return (
        error.response?.data?.message ||
        "خطایی حین ثبت نام ایجاد شد. لطفا دوباره تلاش کنید."
      );
    }
  }
}

export async function verifyEmail(payload: RegisterVerificationPayload) {
  try {
    const res: AxiosResponse<RegisterVerificationResponseData> =
      await axios.post(
        `${process.env.API_BASE_URL}/auth/verifyEmail`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

    if (res?.statusText === "OK") {
      (await cookies()).set({
        name: process.env.JWT_SECRET_KEY as string,
        value: res?.data.token,
        expires: JWT_EXPIRATION_DATE,
      });
      (await cookies()).delete(process.env.REGISTER_EMAIL_SECRET_KEY as string);
    }
    return res?.statusText;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message);
      return (
        error.response?.data?.message ||
        "خطایی حین ثبت نام ایجاد شد. لطفا دوباره تلاش کنید."
      );
    }
  }
}
