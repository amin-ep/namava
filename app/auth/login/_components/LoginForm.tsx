"use client";

import FormLayout from "@/app/_components/FormLayout";
import { useToast } from "@/app/_hooks/useToast";
import { LoginPayload } from "@/app/_types/authTypes";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { login } from "../actions";
import { useFormAction } from "@/app/_hooks/useFormAction";

function LoginForm() {
  const {
    register,
    formState: { isValid },
    reset,
  } = useForm<LoginPayload>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      oneTimePassword: false,
    },
  });

  const { action, isPending } = useFormAction({
    formAction: login,
    onSuccessRouterHref: "/",
    shouldNotifyOnError: true,
    resetOnError: reset,
  });

  return (
    <FormLayout
      action={action}
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
      <FormLayout.Control
        register={register}
        validation={{
          required: true,
          minLength: 8,
          maxLength: 14,
        }}
        name="password"
        label="رمز عبور"
        type="password"
      />
      <FormLayout.Submit
        disabled={!isValid}
        label="ورود"
        pendingStatus={isPending}
      />
      <FormLayout.Footer>
        <FormLayout.ExtraLink href="/auth/login-otp">
          ورود با رمز یکبار مصرف
        </FormLayout.ExtraLink>
        <FormLayout.ExtraLink href="/auth/recover">
          رمز عبور خود را فراموش کرده ام
        </FormLayout.ExtraLink>
      </FormLayout.Footer>
    </FormLayout>
  );
}

export default LoginForm;
