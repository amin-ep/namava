"use server";

import {
  OtpUpdateEmailVerifyResponse,
  UpdateEmailRequestResponse,
  UpdateEmailResponse,
} from "@/app/_types/editEmail";
import { ApiError, FormActionPreviousState } from "@/app/_types/globalTypes";
import { VerifyMePayload, VerifyMeResponse } from "@/app/_types/userTypes";
import axios, { AxiosError, AxiosResponse } from "axios";
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
    const error = err as AxiosError<ApiError, VerifyMeResponse>;

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

export async function updateEmailRequest(
  _prevState: FormActionPreviousState,
  formData: FormData,
) {
  try {
    const token = (await cookies()).get(
      process.env.JWT_SECRET_KEY as string,
    )?.value;
    const res: AxiosResponse<UpdateEmailRequestResponse, ApiError> =
      await axios.post(
        `${process.env.API_BASE_URL}/user/updateEmailRequest`,
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
    const error = err as AxiosError<ApiError, UpdateEmailRequestResponse>;

    if (error) {
      return {
        status: "error",
        message:
          error?.response?.data.message ||
          "مشکلی در ارسال درخواست پیش آمد. لطفا بعدا تلاش کنید.",
        values: {
          email: formData?.get("email") as string,
        },
      };
    }
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
    const error = err as AxiosError<ApiError, VerifyMePayload>;

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
    const error = err as AxiosError<ApiError, UpdateEmailResponse>;

    if (error) {
      if (error.status === 403) {
        return {
          status: "error",
          statusCode: 403,
          message: error?.response?.data.message as string,
        };
      }
      return {
        status: "error",
        message:
          error?.response?.data.message ||
          "مشکلی در ارسال درخواست پیش آمد. لطفا بعدا تلاش کنید.",
      };
    }
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
    const error = err as AxiosError<ApiError, VerifyMePayload>;

    if (error) {
      return (
        error?.response?.data.message ||
        "مشکلی در ارسال درخواست پیش آمد. لطفا بعدا تلاش کنید."
      );
    }
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
    const error = err as AxiosError<ApiError, OtpUpdateEmailVerifyResponse>;

    console.log(error.response?.data.message);

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
