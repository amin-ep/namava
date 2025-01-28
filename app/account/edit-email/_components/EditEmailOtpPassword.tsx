"use client";

import FormLayout from "@/app/_components/FormLayout";
import SixDigitsNumberInput from "@/app/_components/SixDigitsNumberInput";
import { useEditEmail } from "@/app/_contexts/EditEmailContext";
import { useFormAction } from "@/app/_hooks/useFormAction";
import { OtpUpdateEmailVerifyPayload } from "@/app/_types/editEmail";
import { useForm } from "react-hook-form";
import { otpUpdateEmailVerify } from "../actions";

function EditEmailOtpPassword() {
  const { userData, handleNextStep } = useEditEmail();

  const {
    register,
    formState: { isValid },
    setValue,
  } = useForm<OtpUpdateEmailVerifyPayload>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { action, isPending } = useFormAction({
    formAction: otpUpdateEmailVerify,
    shouldNotifyOnError: true,
    onSuccess: () => handleNextStep(),
  });
  return (
    <FormLayout
      action={action}
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
