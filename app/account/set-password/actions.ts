"use server";

import { ApiError, FormActionPreviousState } from "@/app/_types/globalTypes";
import {
  SetPasswordPayload,
  SetPasswordResponse,
} from "@/app/_types/userTypes";
import { removeUnrecognizedFields } from "@/app/_utils/helpers";
import axios, { AxiosError, AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function setPasswordRequest() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(process.env.JWT_SECRET_KEY as string)?.value;
    const res = await axios.get(
      `${process.env.API_BASE_URL}/user/setPasswordRequest`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status === 200) return res?.status as number;
  } catch (err) {
    const error = err as AxiosError<ApiError>;

    if (error) {
      return (
        error?.response?.data.message ||
        "مشکلی در ارسال درخواست پیش آمد. لطفا بعدا تلاش کنید."
      );
    }
  }
}

export async function setPasswordVerify(
  _prevState: FormActionPreviousState,
  formData: FormData,
) {
  try {
    const token = (await cookies()).get(
      process.env.JWT_SECRET_KEY as string,
    )?.value;

    const res: AxiosResponse<SetPasswordPayload, ApiError> = await axios.post(
      `${process.env.API_BASE_URL}/user/setPasswordVerify`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status === 200) {
      return { status: "success" };
    }
  } catch (err) {
    const error = err as AxiosError<ApiError, SetPasswordPayload>;

    if (error) {
      return {
        status: "error",
        message:
          error?.response?.data.message ||
          "مشکلی در ارسال درخواست پیش آمد. لطفا بعدا تلاش کنید.",
      };
    }
  }
}

export async function setPassword(
  _prevState: FormActionPreviousState,
  formData: FormData | undefined,
) {
  try {
    const payload = removeUnrecognizedFields(Object.fromEntries(formData!));
    const token = (await cookies()).get(
      process.env.JWT_SECRET_KEY as string,
    )?.value;

    const res: AxiosResponse<SetPasswordResponse, ApiError> = await axios.patch(
      `${process.env.API_BASE_URL}/user/setPassword`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status === 200) {
      revalidatePath("account", "layout");
      return { status: "success", message: "رمز عبور شما با موفقیت ثبت شد." };
    }
  } catch (err) {
    const error = err as AxiosError<ApiError, SetPasswordResponse>;

    if (error) {
      return {
        status: "error",
        message:
          error?.response?.data.message ||
          "مشکلی در ارسال درخواست پیش آمد. لطفا بعدا تلاش کنید.",
        values: {
          password: formData?.get("password"),
        },
      };
    }
  }
}
