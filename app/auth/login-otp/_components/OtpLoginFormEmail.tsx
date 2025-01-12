"use client";

import { OTPLoginPayload } from "@/app/_types/AuthTypes";
import FormLayout from "@/app/_components/FormLayout";
import { otpLogin } from "@/app/auth/login-otp/actions";
import { ActionDispatch, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { OTPLoginActionTypes } from "./OtpLoginForm";

function OtpLoginFormEmail({
  dispatch,
}: {
  dispatch: ActionDispatch<[action: OTPLoginActionTypes]>;
}) {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    setValue,
  } = useForm<OTPLoginPayload>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    setValue("oneTimePassword", true, {
      shouldValidate: true,
    });
  }, [setValue]);

  const onSubmit = (data: OTPLoginPayload) => {
    startTransition(async () => {
      const response: string = await otpLogin({
        email: data.email,
        oneTimePassword: data.oneTimePassword,
      });
      if (response === "OK") {
        dispatch({ type: "sent", payload: data?.email });
      } else {
        console.log(response);
      }
    });
  };

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      description="لطفا ایمیل خود را وارد کنید."
      heading="ورود"
      icon={<BsBoxArrowInLeft className="text-sky-400" size={19} />}
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
