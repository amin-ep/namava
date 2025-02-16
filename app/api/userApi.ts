"use server";

import { cookies } from "next/headers";
import { apiRequest, handleServerActionError } from ".";
import { GetUserResponseData } from "../_types/userTypes";

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
    return handleServerActionError(error);
  }
}
