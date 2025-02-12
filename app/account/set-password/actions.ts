"use server";

import { FormActionPreviousState } from "@/app/_types/globalTypes";
import {
  SetPasswordPayload,
  SetPasswordResponse,
} from "@/app/_types/userTypes";
import {
  apiRequest,
  handleServerActionError,
  removeUnrecognizedFields,
} from "@/app/_utils/helpers";
import { revalidatePath } from "next/cache";

export async function setPasswordRequest() {
  try {
    const res = await apiRequest({
      contentType: "application/json",
      method: "GET",
      url: "/user/setPasswordRequest",
      authorization: true,
    });

    if (res.status === 200) return res?.status as number;
  } catch (err) {
    return handleServerActionError(err);
  }
}

export async function setPasswordVerify(
  _prevState: FormActionPreviousState,
  formData: FormData,
) {
  try {
    const res = await apiRequest({
      contentType: "application/json",
      method: "POST",
      url: "/user/setPasswordVerify",
      authorization: true,
      data: formData,
    });

    if (res.status === 200) {
      return { status: "success" };
    }
  } catch (err) {
    return handleServerActionError<SetPasswordPayload>(err);
  }
}

export async function setPassword(
  _prevState: FormActionPreviousState,
  formData: FormData | undefined,
) {
  try {
    const payload = removeUnrecognizedFields(Object.fromEntries(formData!));

    const res = await apiRequest({
      contentType: "application/json",
      method: "PATCH",
      url: "/user/setPassword",
      authorization: true,
      data: payload,
    });

    if (res.status === 200) {
      revalidatePath("account", "layout");
      return { status: "success", message: "رمز عبور شما با موفقیت ثبت شد." };
    }
  } catch (err) {
    return handleServerActionError<
      SetPasswordResponse,
      { password: FormDataEntryValue }
    >(err, { password: formData?.get("password") || "" });
  }
}
