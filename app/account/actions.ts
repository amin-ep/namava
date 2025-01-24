"use server";

import axios, { AxiosError, AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { UpdateMeResponseData, User } from "../_types/UserTypes";
import { getMe } from "../api/userApi";
import { ApiError } from "../_types/GlobalTypes";
import { removeUnrecognizedFields } from "../_utils/helpers";

export async function updateMe(
  _prevState:
    | null
    | { status: string | "error" | "success"; message: string | undefined }
    | undefined,
  formData: FormData,
) {
  try {
    const currentUser: User = await getMe();
    const entryValues: { [key: string]: FormDataEntryValue | undefined } =
      Object.fromEntries(formData);
    console.log(entryValues);
    for (const [key] of Object.entries(entryValues)) {
      if (!entryValues[key]) {
        delete entryValues[key];
      }
    }
    for (const [key, value] of Object.entries(currentUser)) {
      if (entryValues[key] == value) {
        delete entryValues[key];
      }
    }

    const filteredEntryValues = removeUnrecognizedFields(entryValues);
    const token = (await cookies()).get(
      process.env.JWT_SECRET_KEY as string,
    )?.value;
    const res: AxiosResponse<UpdateMeResponseData> = await axios.patch(
      `${process.env.API_BASE_URL}/user/updateMe`,
      filteredEntryValues,
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
