"use server";

import { LoginResponse } from "@/app/_types/authTypes";
import { FormActionPreviousState } from "@/app/_types/globalTypes";
import {
  apiRequest,
  handleServerActionError,
  removeUnrecognizedFields,
} from "@/app/_utils/helpers";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function login(
  _prevState: FormActionPreviousState,
  formData: FormData,
) {
  try {
    const payload = removeUnrecognizedFields(Object.fromEntries(formData));
    payload.oneTimePassword = false;
    const res = await apiRequest<LoginResponse, { [k: string]: string }>({
      method: "POST",
      url: "/auth/login",
      contentType: "application/json",
      data: payload,
    });

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
    return handleServerActionError<
      LoginResponse,
      { email: FormDataEntryValue; password: FormDataEntryValue }
    >(err, {
      email: formData.get("email") || "",
      password: formData.get("password") || "",
    });
  }
}
