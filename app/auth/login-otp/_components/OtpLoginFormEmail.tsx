"use client";

import { OTPLoginPayload } from "@/app/_types/authTypes";
import FormLayout from "@/app/_components/FormLayout";
import { otpLogin } from "@/app/auth/login-otp/actions";
import { ActionDispatch, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { OTPLoginActionTypes } from "./OtpLoginForm";
import { useToast } from "@/app/_hooks/useToast";

function OtpLoginFormEmail({
  dispatch,
}: {
  dispatch: ActionDispatch<[action: OTPLoginActionTypes]>;
}) {
  const [result, formAction, isPending] = useActionState(otpLogin, null);
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

  const notify = useToast();

  useEffect(() => {
    if (result?.status === "success") {
      dispatch({ type: "sent", payload: getValues()?.email });
    }
  }, [result?.status, dispatch, getValues]);

  useEffect(() => {
    if (result && result?.status === "error") {
      notify("error", result?.message as string);
      reset({
        email: result.values?.email as string,
      });
    }
  }, [result, reset]);

  return (
    <FormLayout
      action={formAction}
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
