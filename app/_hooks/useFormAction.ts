"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { DefaultValues, UseFormReset } from "react-hook-form";
import { FieldValues, FormActionPreviousState } from "../_types/globalTypes";
import { useToast } from "./useToast";

export function useFormAction<S extends FieldValues, T>({
  formAction,
  shouldNotifyOnError,
  shouldNotifyOnSuccess,
  onSuccess,
  onError,
  onSuccessRouterHref,
  resetOnError,
}: {
  formAction: (
    _prevState: FormActionPreviousState,
    formData: FormData,
  ) => Promise<
    | null
    | {
        status: string;
        message?: undefined | string;
        values?: undefined | T;
        statusCode?: number | undefined;
      }
    | undefined
  >;
  shouldNotifyOnError: boolean;
  onError?: () => void;
  onSuccess?: () => void;
  onSuccessRouterHref?: string;
  resetOnError?: UseFormReset<S>;
  shouldNotifyOnSuccess?: boolean;
}) {
  const [result, action, isPending] = useActionState(formAction, null);
  const router = useRouter();
  const notify = useToast();

  useEffect(() => {
    if (result && result?.status === "success") {
      if (shouldNotifyOnSuccess) {
        notify("success", result?.message as string);
      }
      if (onSuccess) {
        onSuccess();
      }
      if (onSuccessRouterHref) {
        router.push(onSuccessRouterHref);
      }
    }
  }, [result, onSuccess, onSuccessRouterHref, router]);

  useEffect(() => {
    if (result && result?.status === "error") {
      if (shouldNotifyOnError) {
        notify("error", result?.message as string);
      }

      if (onError) {
        onError();
      }

      if (resetOnError) {
        resetOnError(result?.values as S | DefaultValues<S> | undefined);
      }
    }
  }, [result, shouldNotifyOnError, onError, resetOnError]);

  return { isPending, action };
}
