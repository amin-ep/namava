import { ApiError } from "@/app/_types/globalTypes";
import axios, { AxiosError, AxiosResponse } from "axios";
import jalaali from "jalaali-js";
import { jalaaliMonths } from "./constants";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const jMonthIndex = (strMonth: string) => {
  return jalaaliMonths().findIndex((el) => el === strMonth);
};

export const numericJalaaliBirthDate = (date: string | Date) => {
  const georgianBirthDate = new Date(date);
  const birthYear = georgianBirthDate.getFullYear();
  const birthMonth = georgianBirthDate.getMonth();
  const birthDate = georgianBirthDate.getDate();

  const jalaaliBirthDateObject = jalaali.toJalaali(
    birthYear,
    birthMonth + 1,
    birthDate,
  );

  return `${jalaaliBirthDateObject.jy}/${jalaaliBirthDateObject.jm}/${jalaaliBirthDateObject.jd}`;
};

export const removeUnrecognizedFields = (
  payload: FormData | { [key: string]: FormDataEntryValue | undefined },
) => {
  const filteredPayload = Object.fromEntries(
    Object.entries(payload).filter(([key]) => !key.startsWith("$ACTION")),
  );
  return filteredPayload;
};

export async function apiRequest<T, S = never>({
  method,
  data,
  url,
  contentType,
  params,
  authorization = false,
}: {
  method: "POST" | "GET" | "PATCH" | "DELETE";
  data?: S | FieldValues;
  url: string;
  contentType: "multipart/form-data" | "application/json";
  params?: string;
  authorization?: boolean;
}) {
  let token: null | string = null;

  if (authorization) {
    token = (await cookies()).get(process.env.JWT_SECRET_KEY as string)
      ?.value as string;
  }

  if (authorization && !token) {
    throw new Error("خطای احراز هویت! لطفا دوباره وارد شوید.");
  }

  const res: AxiosResponse<T, ApiError> = await axios({
    method: method,
    baseURL: process.env.API_BASE_URL,
    url: url,
    params: params,
    headers: {
      "Content-Type": contentType,
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });

  return res;
}

export function handleServerActionError<T, S = undefined>(
  err: unknown,
  values?: S,
  statusCode?: number,
) {
  if (err) {
    const error = err as AxiosError<ApiError, T>;
    if (error) {
      return {
        status: "error",
        message: error?.response?.data?.message,
        statusCode: statusCode,
        values: values,
      };
    }
  }
}
