"use server";

import { UpdateMePayload, UpdateMeResponseData } from "@/app/_types/userTypes";
import { handleServerActionError } from "@/app/_utils/helpers";
// import { removeUnrecognizedFields } from "@/app/_utils/helpers";
// import { getMe } from "@/app/api/userApi";
import axios, { AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";
import { ApiError } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

export async function updateMe(payload: UpdateMePayload) {
  try {
    const token = (await cookies()).get(
      process.env.JWT_SECRET_KEY as string,
    )?.value;
    const res: AxiosResponse<UpdateMeResponseData, ApiError> =
      await axios.patch(`${process.env.API_BASE_URL}/user/updateMe`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

    if (res?.status === 200) {
      revalidatePath("/account", "layout");
      return {
        status: "success",
        message: "تغییرات با موفقیت ثبت شد.",
      };
    }
  } catch (err) {
    return handleServerActionError<UpdateMeResponseData>(err);
  }
}
