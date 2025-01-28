"use server";

import {
  UpdateMePayload,
  UpdateMeResponseData,
  User,
} from "@/app/_types/userTypes";
// import { removeUnrecognizedFields } from "@/app/_utils/helpers";
// import { getMe } from "@/app/api/userApi";
import axios, { AxiosError, AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";
import { ApiError } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

export async function updateMe(payload: UpdateMePayload) {
  try {
    // const currentUser: User = await getMe();
    // const entryValues: { [key: string]: FormDataEntryValue | undefined } =
    //   Object.fromEntries(formData);
    // for (const [key] of Object.entries(entryValues)) {
    //   if (!entryValues[key]) {
    //     delete entryValues[key];
    //   }
    // }
    // for (const [key, value] of Object.entries(currentUser)) {
    //   if (entryValues[key] == value) {
    //     delete entryValues[key];
    //   }
    // }

    // const filteredEntryValues = removeUnrecognizedFields(entryValues);
    const token = (await cookies()).get(
      process.env.JWT_SECRET_KEY as string,
    )?.value;
    const res: AxiosResponse<UpdateMeResponseData> = await axios.patch(
      `${process.env.API_BASE_URL}/user/updateMe`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res?.status === 200) {
      revalidatePath("/account", "layout");
      return {
        status: "success",
        message: "تغییرات با موفقیت ثبت شد.",
      };
    }
  } catch (err) {
    const error = err as AxiosError<ApiError, UpdateMeResponseData>;
    if (error) {
      return {
        status: "error",
        message: error?.response?.data.message,
      };
    }
  }
}
