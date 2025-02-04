"use client";

import FormLayout from "@/app/_components/FormLayout";
import { useFormAction } from "@/app/_hooks/useFormAction";
import { OTPLoginPayload } from "@/app/_types/authTypes";
import { otpLogin } from "@/app/auth/login-otp/actions";
import { ActionDispatch } from "react";
import { useForm } from "react-hook-form";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { OTPLoginActionTypes } from "./OtpLoginForm";

function OtpLoginFormEmail({
  dispatch,
}: {
  dispatch: ActionDispatch<[action: OTPLoginActionTypes]>;
}) {
  // const [result, formAction, isPending] = useActionState(otpLogin, null);
  const {
    register,
    formState: { isValid },
    getValues,
    reset,
  } = useForm<OTPLoginPayload>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      oneTimePassword: true,
    },
  });

  const handleFormSuccess = () => {
    dispatch({ type: "sent", payload: getValues()?.email });
  };

  const { action, isPending } = useFormAction({
    formAction: otpLogin,
    shouldNotifyOnError: true,
    onSuccess: handleFormSuccess,
    resetOnError: reset,
  });

  return (
    <FormLayout
      action={action}
      description="لطفا ایمیل خود را وارد کنید."
      heading="ورود"
      icon={<BsBoxArrowInLeft className="text-primary-light" size={19} />}
      headerLink={{ title: "ثبت نام", href: "/auth/register" }}
    >
      <FormLayout.Control
        register={register}
        validation={{
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        }}
        name="email"
        label="ایمیل"
        type="email"
      />
      <input type="hidden" {...register("oneTimePassword")} />
      <FormLayout.Submit
        disabled={!isValid}
        label="دریافت رمز یکبار مصرف"
        pendingStatus={isPending}
      />
      <FormLayout.Footer>
        <FormLayout.ExtraLink href="/auth/login">
          ورود با رمز ثابت
        </FormLayout.ExtraLink>
      </FormLayout.Footer>
    </FormLayout>
  );
}

export default OtpLoginFormEmail;
