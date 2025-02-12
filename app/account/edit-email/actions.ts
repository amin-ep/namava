"use server";

import {
  OtpUpdateEmailVerifyResponse,
  UpdateEmailRequestResponse,
  UpdateEmailResponse,
} from "@/app/_types/editEmail";
import { FormActionPreviousState } from "@/app/_types/globalTypes";
import { VerifyMePayload, VerifyMeResponse } from "@/app/_types/userTypes";
import {
  apiRequest,
  handleServerActionError,
  removeUnrecognizedFields,
} from "@/app/_utils/helpers";
import { cookies } from "next/headers";

export async function verifyMe(
  _prevState: FormActionPreviousState,
  formData: FormData | undefined,
) {
  try {
    const res = await apiRequest<VerifyMeResponse>({
      method: "POST",
      contentType: "application/json",
      url: "/user/verifyMe",
      data: formData,
      authorization: true,
    });

    if (res?.status === 200) {
      return { status: "success" };
    }
  } catch (err) {
    return handleServerActionError<
      VerifyMeResponse,
      { password: FormDataEntryValue }
    >(err, { password: formData?.get("password") || "" });
  }
}

export async function updateEmailRequest(
  _prevState?: FormActionPreviousState,
  formData?: FormData,
) {
  try {
    const cookieStore = await cookies();
    let payload: null | { [k: string]: string } = null;

    const storedEmail = cookieStore.get("EDIT_EMAIL_EMAIL")?.value;
    if (storedEmail) {
      payload = { email: storedEmail };
    } else {
      payload = removeUnrecognizedFields(
        Object.fromEntries(formData as FormData),
      );
    }

    const res = await apiRequest<UpdateEmailRequestResponse>({
      method: "POST",
      contentType: "application/json",
      url: "/user/updateEmailRequest",
      authorization: true,
      data: payload,
    });

    if (res?.status === 200) {
      const expires = Date.now() + 1 * 60 * 60 * 1000;

      cookieStore.set({
        name: "EDIT_EMAIL_EMAIL",
        value: formData?.get("email") as string,
        expires,
      });
      return { status: "success" };
    }
  } catch (err) {
    return handleServerActionError<
      UpdateEmailRequestResponse,
      { email: string }
    >(err, { email: formData?.get("email") as string });
  }
}

export async function otpUpdateEmail(
  _prevState: FormActionPreviousState,
  formData: FormData,
) {
  try {
    const res = await apiRequest({
      method: "POST",
      contentType: "application/json",
      url: "/user/otpUpdateEmail",
      authorization: true,
      data: formData,
    });
    if (res?.status === 200) {
      return { status: "success" };
    }
  } catch (err) {
    return handleServerActionError<VerifyMePayload>(err);
  }
}

export async function updateEmail(
  _prevState: FormActionPreviousState,
  formData: FormData,
) {
  try {
    const res = await apiRequest({
      method: "PATCH",
      contentType: "application/json",
      url: "/user/updateEmail",
      authorization: true,
      data: formData,
    });

    if (res?.status === 200) {
      return { status: "success", message: "تغییرات ثبت شد", statusCode: 200 };
    }
  } catch (err) {
    return handleServerActionError<UpdateEmailResponse>(err, undefined, 403);
  }
}

export async function otpUpdateEmailRequest() {
  try {
    const res = await apiRequest({
      contentType: "application/json",
      authorization: true,
      method: "POST",
      url: "/user/otpUpdateEmail",
      data: {},
    });
    return res?.status;
  } catch (err) {
    return handleServerActionError<UpdateEmailResponse>(err);
  }
}

export async function otpUpdateEmailVerify(
  _prevState: FormActionPreviousState,
  formData: FormData,
) {
  try {
    const res = await apiRequest({
      contentType: "application/json",
      method: "POST",
      url: "/user/otpUpdateEmail",
      authorization: true,
      data: formData,
    });

    if (res.status === 200) {
      return { status: "success" };
    }
  } catch (err) {
    return handleServerActionError<OtpUpdateEmailVerifyResponse>(err);
  }
}
