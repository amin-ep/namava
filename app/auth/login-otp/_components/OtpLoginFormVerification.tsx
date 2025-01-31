"use client";

import FormLayout from "@/app/_components/FormLayout";
import SixDigitsNumberInput from "@/app/_components/SixDigitsNumberInput";
import { useFormAction } from "@/app/_hooks/useFormAction";
import { OTPLoginVerificationPayload } from "@/app/_types/authTypes";
import { otpVerifyLogin } from "@/app/auth/login-otp/actions";
import { ActionDispatch } from "react";
import { useForm } from "react-hook-form";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { OTPLoginActionTypes } from "./OtpLoginForm";

function OtpLoginFormVerification({
  email,
  dispatch,
}: {
  email: string;
  dispatch: ActionDispatch<[action: OTPLoginActionTypes]>;
}) {
  const {
    register,
    formState: { isValid },
    setValue,
    reset,
  } = useForm<OTPLoginVerificationPayload>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: email,
    },
  });

  const { action, isPending } = useFormAction({
    formAction: otpVerifyLogin,
    resetOnError: reset,
    onSuccessRouterHref: "/",
    shouldNotifyOnError: true,
  });

  return (
    <FormLayout
      action={action}
      description={`کد تایید به ایمیل ${email} ارسال شد.لطفا کد را وارد کنید.`}
      heading="ورود"
      icon={<BsBoxArrowInLeft className="text-sky-400" size={19} />}
      headerLink={{ title: "ثبت نام", href: "/auth/register" }}
    >
      <FormLayout.Control
        name="verificationNumber"
        register={register}
        validation={{
          required: true,
          validate: (val) => val.length === 6,
        }}
        type="hidden"
      />
      <input type="hidden" {...register("email")} />
      <SixDigitsNumberInput setValue={setValue} />
      <FormLayout.Submit
        disabled={!isValid}
        label="تایید"
        pendingStatus={isPending}
      />
      <FormLayout.Footer>
        <button
          type="button"
          className="text-primary"
          onClick={() => {
            dispatch({ type: "clear" });
          }}
        >
          ایمیل را اشتباه وارد کرده اید؟
        </button>
      </FormLayout.Footer>
    </FormLayout>
  );
}

export default OtpLoginFormVerification;
