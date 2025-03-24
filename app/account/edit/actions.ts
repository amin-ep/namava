"use server";

import { UpdateMePayload, UpdateMeResponseData } from "@/app/_types/userTypes";
import { apiRequest, handleServerActionError } from "@/app/api";
import { revalidatePath } from "next/cache";

export async function updateMe(payload: UpdateMePayload) {
  try {
    const res = await apiRequest<UpdateMeResponseData>({
      method: "PATCH",
      url: "/user/updateMe",
      contentType: "application/json",
      data: payload,
      authorization: true,
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
