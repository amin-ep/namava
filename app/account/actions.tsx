"use server";

import axios, { AxiosError } from "axios";
import { User } from "../_types/UserTypes";
import { getMe } from "../api/userApi";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function updateMe(formData: FormData) {
  try {
    const currentUser: User = await getMe();
    const entryValues: { [key: string]: FormDataEntryValue | undefined } =
      Object.fromEntries(formData);

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
    const token = (await cookies()).get(
      process.env.JWT_SECRET_KEY as string,
    )?.value;

    const res = await axios.patch(
      `${process.env.API_BASE_URL}/user/updateMe`,
      entryValues,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.status === 200) {
      revalidatePath("/account", "layout");
      redirect("/account");
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message);
      return (
        error.response?.data?.message ||
        "خطایی حین ثبت نام ایجاد شد. لطفا دوباره تلاش کنید."
      );
    }
  }
}
