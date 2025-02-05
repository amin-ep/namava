"use server";

import { ApiError } from "@/app/_types/globalTypes";
import { ChangePasswordResponse } from "@/app/_types/userTypes";
import {
  handleServerActionError,
  removeUnrecognizedFields,
} from "@/app/_utils/helpers";
import axios, { AxiosResponse } from "axios";
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

    if (!token) {
      return {
        status: "error",
        message: "خطای احراز هویت! لطفا دوباره وارد شوید.",
        values: {
          password: (String(formData.get("password")) as string) || "",
          currentPassword:
            (String(formData.get("currentPassword")) as string) || "",
        },
      };
    }

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

    if (res?.status === 200) {
      return { status: "success" };
    }
  } catch (err) {
    return handleServerActionError<
      ChangePasswordResponse,
      { currentPassword: string; password: string }
    >(err, {
      password: (String(formData.get("password")) as string) || "",
      currentPassword:
        (String(formData.get("currentPassword")) as string) || "",
    });
  }
}
