"use server";

import {
  OtpUpdateEmailVerifyResponse,
  UpdateEmailRequestResponse,
  UpdateEmailResponse,
} from "@/app/_types/editEmail";
import { ApiError, FormActionPreviousState } from "@/app/_types/globalTypes";
import { VerifyMePayload, VerifyMeResponse } from "@/app/_types/userTypes";
import {
  handleServerActionError,
  removeUnrecognizedFields,
} from "@/app/_utils/helpers";
import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";

export async function verifyMe(
  _prevState: FormActionPreviousState,
  formData: FormData | undefined,
) {
  try {
    const token = (await cookies()).get(
      process.env.JWT_SECRET_KEY as string,
    )?.value;
    const res: AxiosResponse<VerifyMeResponse, ApiError> = await axios.post(
      `${process.env.API_BASE_URL}/user/verifyMe`,
      formData,
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
    const token = cookieStore.get(process.env.JWT_SECRET_KEY as string)?.value;
    const res: AxiosResponse<UpdateEmailRequestResponse, ApiError> =
      await axios.post(
        `${process.env.API_BASE_URL}/user/updateEmailRequest`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

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
    const token = (await cookies()).get(
      process.env.JWT_SECRET_KEY as string,
    )?.value;
    const res: AxiosResponse<VerifyMePayload, ApiError> = await axios.post(
      `${process.env.API_BASE_URL}/user/otpUpdateEmail`,
      formData,
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
    return handleServerActionError<VerifyMePayload>(err);
  }
}

export async function updateEmail(
  _prevState: FormActionPreviousState,
  formData: FormData,
) {
  try {
    const token = (await cookies()).get(
      process.env.JWT_SECRET_KEY as string,
    )?.value;
    const res: AxiosResponse<UpdateEmailResponse, ApiError> = await axios.patch(
      `${process.env.API_BASE_URL}/user/updateEmail`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res?.status === 200) {
      return { status: "success", message: "تغییرات ثبت شد", statusCode: 200 };
    }
  } catch (err) {
    return handleServerActionError<UpdateEmailResponse>(err, undefined, 403);
  }
}

export async function otpUpdateEmailRequest() {
  try {
    const token = (await cookies()).get(
      process.env.JWT_SECRET_KEY as string,
    )?.value;
    const res = await axios.post(
      `${process.env.API_BASE_URL}/user/otpUpdateEmail`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

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
    const token = (await cookies()).get(
      process.env.JWT_SECRET_KEY as string,
    )?.value;
    const res: AxiosResponse<OtpUpdateEmailVerifyResponse, ApiError> =
      await axios.post(
        `${process.env.API_BASE_URL}/user/otpUpdateEmail`,
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
    return handleServerActionError<OtpUpdateEmailVerifyResponse>(err);
  }
}
