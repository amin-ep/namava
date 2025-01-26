"use client";

import FormLayout from "@/app/_components/FormLayout";
import SixDigitsNumberInput from "@/app/_components/SixDigitsNumberInput";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateEmail } from "../actions";
import { useEditEmail } from "@/app/_contexts/EditEmailContext";
import { useToast } from "@/app/_hooks/useToast";
import { UpdateEmailPayload } from "@/app/_types/UserTypes";

function EditEmailConfirmForm() {
  const [result, formAction, isPending] = useActionState(updateEmail, null);

  const { handleResult, handleNextStep, userData } = useEditEmail();

  const notify = useToast();

  const {
    register,
    formState: { isValid },
    setValue,
  } = useForm<UpdateEmailPayload>();

  useEffect(() => {
    if (userData) setValue("email", userData?.candidateEmail as string);
  }, [userData, setValue]);

  useEffect(() => {
    if (result) {
      if (result.statusCode === 200) {
        handleResult("success", result.message as string);
        handleNextStep();
      } else if (result.status === "error" && result.statusCode !== 403) {
        notify("error", result.message);
      } else if (result.status === "error" && result.statusCode === 403) {
        handleResult("error", result.message);
        handleNextStep();
      }
    }
  }, [result, handleResult, handleNextStep, notify]);

  return (
    <FormLayout
      action={formAction as (payload?: FormData | undefined) => void}
      description={`کد تایید به ایمیل ${userData?.candidateEmail ?? ""} ارسال شد. لطفا کد را وارد کنید.`}
    >
      <SixDigitsNumberInput setValue={setValue} />
      <input
        type="hidden"
        {...register("verificationNumber", {
          required: true,
          minLength: 6,
          maxLength: 6,
        })}
      />
      <input type="hidden" {...register("email")} />
      <FormLayout.Submit
        disabled={!isValid}
        label="تایید"
        pendingStatus={isPending}
      />
    </FormLayout>
  );
}

export default EditEmailConfirmForm;
