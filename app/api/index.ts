"use server";

import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

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
  params?: { [k: string]: string };
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

export async function handleServerActionError<T, S = undefined>(
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
