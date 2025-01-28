"use server";

import { ApiError } from "@/app/_types/globalTypes";
import { ChangePasswordResponse } from "@/app/_types/userTypes";
import { removeUnrecognizedFields } from "@/app/_utils/helpers";
import axios, { AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";

export async function changePassword(
  _prevState: null | { status: string; message: string } | undefined,
  formData: FormData,
) {
  try {
    const payload = removeUnrecognizedFields(Object.fromEntries(formData));

    const token = (await cookies()).get(
      process.env.JWT_SECRET_KEY as string,
    )?.value;

    const res: AxiosResponse<ChangePasswordResponse, ApiError> =
      await axios.patch(
        `${process.env.API_BASE_URL}/user/updatePassword`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

    if (res.status === 200) return { status: "success", message: "success" };
  } catch (err) {
    const error = err as AxiosError<ApiError, ChangePasswordResponse>;

    if (error) {
      return {
        status: "error",
        message:
          error?.response?.data.message ||
          "مشکلی در ارسال درخواست پیش آمد. لطفا بعدا تلاش کنید.",
        values: {
          password: formData?.get("password"),
          currentPassword: formData?.get("currentPassword"),
        },
      };
    }
  }
}
