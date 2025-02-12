"use server";

import { FormActionPreviousState } from "@/app/_types/globalTypes";
import {
  apiRequest,
  handleServerActionError,
  removeUnrecognizedFields,
} from "@/app/_utils/helpers";
import { cookies } from "next/headers";
import {
  RegisterResponseData,
  RegisterVerificationPayload,
  RegisterVerificationResponseData,
} from "../../_types/authTypes";
import { JWT_EXPIRATION_DATE } from "../../_utils/constants";

export default async function signup(
  _prevState: FormActionPreviousState,
  formData: FormData,
) {
  try {
    let payload: null | { [k: string]: string } = null;
    const cookieStore = await cookies();

    const signupEmail = cookieStore.get("SIGNUP-EMAIL")?.value;
    if (!signupEmail) {
      payload = removeUnrecognizedFields(Object.fromEntries(formData));
    } else {
      payload = { email: signupEmail as string };
    }

    const res = await apiRequest<RegisterResponseData>({
      method: "POST",
      url: "/auth/signup",
      data: payload,
      contentType: "application/json",
    });

    if (res?.data?.status === "success") {
      const expires = Date.now() + 90 * 24 * 60 * 60 * 1000;
      cookieStore.set({
        name: "SIGNUP-EMAIL",
        value: formData.get("email") as string,
        expires: expires,
      });
      return { status: "success" };
    }
  } catch (err) {
    return handleServerActionError<
      RegisterResponseData,
      { email: FormDataEntryValue }
    >(err, { email: formData?.get("email") || "" });
  }
}

export async function verifyEmail(
  _prevState: FormActionPreviousState,
  formData: FormData,
) {
  try {
    const res = await apiRequest<RegisterVerificationPayload>({
      contentType: "application/json",
      method: "POST",
      url: "/auth/verifyEmail",
      data: formData,
    });

    if (res?.data?.status === "success") {
      const cookieStore = await cookies();
      cookieStore.delete("SIGNUP-EMAIL");
      cookieStore.set({
        name: process.env.JWT_SECRET_KEY as string,
        value: res?.data.token,
        expires: JWT_EXPIRATION_DATE,
      });
      return { status: res?.data.status };
    }
  } catch (err) {
    return handleServerActionError<RegisterVerificationResponseData>(err);
  }
}
