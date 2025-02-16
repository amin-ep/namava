"use server";

import { ChangePasswordResponse } from "@/app/_types/userTypes";
import { removeUnrecognizedFields } from "@/app/_utils/helpers";
import { apiRequest, handleServerActionError } from "@/app/api";

export async function changePassword(
  _prevState: null | { status: string; message: string } | undefined,
  formData: FormData,
) {
  try {
    const payload = removeUnrecognizedFields(Object.fromEntries(formData));

    const res = await apiRequest<ChangePasswordResponse>({
      method: "PATCH",
      contentType: "application/json",
      url: "/user/updatePassword",
      authorization: true,
      data: payload,
    });

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
