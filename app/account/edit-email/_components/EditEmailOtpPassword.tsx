"use client";

import FormLayout from "@/app/_components/FormLayout";
import SixDigitsNumberInput from "@/app/_components/SixDigitsNumberInput";
import { useActionState, useEffect } from "react";
import { otpUpdateEmailVerify } from "../actions";
import { useEditEmail } from "@/app/_contexts/EditEmailContext";
import { useForm } from "react-hook-form";
import { useToast } from "@/app/_hooks/useToast";
import { OtpUpdateEmailVerifyPayload } from "@/app/_types/editEmail";

function EditEmailOtpPassword() {
  const [result, formAction, isPending] = useActionState(
    otpUpdateEmailVerify,
    null,
  );
  const { userData, handleNextStep } = useEditEmail();

  const notify = useToast();

  const {
    register,
    formState: { isValid },
    setValue,
  } = useForm<OtpUpdateEmailVerifyPayload>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (result) {
      if (result?.status === "success") {
        handleNextStep();
      } else {
        notify("error", result?.message as string);
      }
    }
  }, [result, handleNextStep, notify]);
  return (
    <FormLayout
      action={formAction}
      description={`کد تایید به ایمیل ${userData?.email} ارسال شد. لطفا کد را وارد کنید. `}
    >
      <SixDigitsNumberInput setValue={setValue} />
      <input
        type="hidden"
        {...register("verificationNumber", {
          minLength: 6,
          maxLength: 6,
          required: true,
        })}
      />
      <FormLayout.Submit
        disabled={!isValid}
        pendingStatus={isPending}
        label="تایید"
      />
    </FormLayout>
  );
}

export default EditEmailOtpPassword;
