"use server";

import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { GetUserResponseData } from "../_types/userTypes";
import { apiRequest } from "../_utils/helpers";

export async function getMe() {
  try {
    const token = (await cookies()).get(
      process.env.JWT_SECRET_KEY as string,
    )?.value;

    if (!token) {
      return null;
    } else {
      const res = await apiRequest<GetUserResponseData, never>({
        contentType: "application/json",
        method: "GET",
        url: "/user/me",
        authorization: true,
      });

      if (res?.status === 200) {
        return res?.data.data.document;
      }
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return (
        error.response?.data?.message ||
        "خطایی حین ثبت نام ایجاد شد. لطفا دوباره تلاش کنید."
      );
    }
  }
}
