"use server";

import axios, { AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { GetUserResponseData } from "../_types/userTypes";

export async function getMe() {
  try {
    const token = (await cookies()).get(
      process.env.JWT_SECRET_KEY as string,
    )?.value;

    if (!token) {
      return null;
    } else {
      const res: AxiosResponse<GetUserResponseData> = await axios.get(
        `${process.env.API_BASE_URL}/user/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

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
