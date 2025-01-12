"use client";

import { LoginPayload } from "@/app/_types/AuthTypes";
import FormLayout from "@/app/_components/FormLayout";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { BsBoxArrowInLeft } from "react-icons/bs";

function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    setValue,
  } = useForm<LoginPayload>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    setValue("oneTimePassword", false, {
      shouldValidate: true,
    });
  }, [setValue]);

  const onSubmit = (data: LoginPayload) => {
    console.log(data);
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
        <FormLayout.ExtraLink href="/auth/login-otp">
          رمز عبور خود را فراموش کرده ام
        </FormLayout.ExtraLink>
      </FormLayout.Footer>
    </FormLayout>
  );
}

export default LoginForm;
