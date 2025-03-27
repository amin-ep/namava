"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  IGetMySubscriptionResponse,
  ISubscription,
} from "../_types/subscriptionTypes";
import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL, JWT_SECRET_KEY } from "../_utils/constants";
import { ApiError } from "next/dist/server/api-utils";

const getMySubscriptions: () => Promise<
  string | ISubscription[] | undefined
> = async () => {
  try {
    const token = Cookies.get(JWT_SECRET_KEY);
    const res: AxiosResponse<IGetMySubscriptionResponse> = await axios.get(
      `${API_BASE_URL}/subscription/mySubs`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    return (
      error.response?.data.message ||
      "مشکلی در ارسال درخواست پیش آمد لطفا دوباره تلاش کنید"
    );
  }
};

export const useHasSubscription = () => {
  const [hasSubscription, setHasSubscription] = useState(false);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["subscription"],
    queryFn: getMySubscriptions,
  });

  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        const subscriptions = data as ISubscription[];
        if (subscriptions.length > 0) {
          const currentTime = Date.now();

          for (let i = 0; i < subscriptions.length; i++) {
            const userHasActiveSub =
              new Date(subscriptions[i].expiresAt as Date).getTime() >
              currentTime;
            if (userHasActiveSub) {
              setHasSubscription(userHasActiveSub);
              break;
            } else {
              setHasSubscription(false);
            }
          }
        } else {
          setHasSubscription(false);
        }
      }
    }
  }, [data, isLoading, isSuccess]);

  return [hasSubscription];
};
