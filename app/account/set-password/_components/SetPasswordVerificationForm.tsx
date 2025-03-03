import FormLayout from "@/app/_components/FormLayout";
import SixDigitsNumberInput from "@/app/_components/SixDigitsNumberInput";
import { useFormAction } from "@/app/_hooks/useFormAction";
import React from "react";
import { useForm } from "react-hook-form";
import { MdLockReset } from "react-icons/md";
import { setPasswordRequest, setPasswordVerify } from "../actions";
import { useTimer, UseTimerFormAction } from "@/app/_hooks/useTimer";
import FormTimerButton from "@/app/_components/FormTimerButton";

function SetPasswordVerificationForm({
  setLevel,
  email,
}: {
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  email: string;
}) {
  const {
    register,
    setValue,
    formState: { isValid },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const { action, isPending } = useFormAction({
    formAction: setPasswordVerify,
    shouldNotifyOnError: true,
    onSuccess: () => setLevel(3),
  });

  const {
    finished,
    handleRestart: resendCode,
    isPending: isSendingCode,
    time,
  } = useTimer({
    finishesAt: 0,
    formAction: setPasswordRequest as UseTimerFormAction<object>,
    step: 60,
    variant: "decrease",
  });

  return (
    <FormLayout
      action={action}
      description={`کد تایید به ایمیل ${email} ارسال شد. لطفا کد را وارد کنید.`}
      heading="افزودن رمز عبور"
      icon={<MdLockReset className="text-primary-default" size={30} />}
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
        label="تایید"
        pendingStatus={isPending || isSendingCode}
      />
      <FormLayout.Footer>
        <FormTimerButton
          finished={finished}
          formAction={resendCode}
          time={time}
        />
      </FormLayout.Footer>
    </FormLayout>
  );
}

export default SetPasswordVerificationForm;
