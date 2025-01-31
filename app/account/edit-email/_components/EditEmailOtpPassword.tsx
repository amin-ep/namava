"use client";

import FormLayout from "@/app/_components/FormLayout";
import SixDigitsNumberInput from "@/app/_components/SixDigitsNumberInput";
import { useEditEmail } from "@/app/_contexts/EditEmailContext";
import { useFormAction } from "@/app/_hooks/useFormAction";
import { OtpUpdateEmailVerifyPayload } from "@/app/_types/editEmail";
import { useForm } from "react-hook-form";
import { otpUpdateEmailRequest, otpUpdateEmailVerify } from "../actions";
import { useTimer, UseTimerFormAction } from "@/app/_hooks/useTimer";
import FormTimerButton from "@/app/_components/FormTimerButton";

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

  const {
    finished,
    handleRestart: resendCode,
    isPending: isSendingCode,
    time,
  } = useTimer({
    finishesAt: 0,
    formAction: otpUpdateEmailRequest as
      | Promise<string | number | undefined>
      | UseTimerFormAction<unknown>,
    step: 60,
    variant: "decrease",
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
        pendingStatus={isPending || isSendingCode}
        label="تایید"
      />
      <FormLayout.Footer>
        <FormTimerButton
          formAction={resendCode}
          time={time}
          finished={finished}
        />
      </FormLayout.Footer>
    </FormLayout>
  );
}

export default EditEmailOtpPassword;
