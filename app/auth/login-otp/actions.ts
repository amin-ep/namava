"use server";

import {
  OTPLoginPayload,
  OTPLoginResponseData,
  OTPLoginVerificationPayload,
  OTPLoginVerificationResponseData,
} from "@/app/_types/AuthTypes";
import axios, { AxiosError, AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function otpLogin(payload: OTPLoginPayload) {
  try {
    const res: AxiosResponse<OTPLoginResponseData> = await axios.post(
      `${process.env.API_BASE_URL}/auth/login`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

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

export async function otpVerifyLogin(payload: OTPLoginVerificationPayload) {
  try {
    console.log(payload);
    const res: AxiosResponse<OTPLoginVerificationResponseData> =
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

export async function logout() {
  try {
    (await cookies()).delete(process.env.JWT_SECRET_KEY as string);

    revalidatePath("/");
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
