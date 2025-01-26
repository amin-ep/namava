"use client";

import FormLayout from "@/app/_components/FormLayout";
import { useToast } from "@/app/_hooks/useToast";
import { LoginPayload } from "@/app/_types/authTypes";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { login } from "../actions";

function LoginForm() {
  const [result, formAction, isPending] = useActionState(login, null);
  const toast = useToast();
  const router = useRouter();

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

  useEffect(() => {
    if (result?.status === "success") {
      router.push("/");
    }
  }, [result?.status, router]);

  useEffect(() => {
    if (result && result?.status === "error") {
      toast("error", result?.message as string);
    }
  }, [result]);

  useEffect(() => {
    if (result && result.status === "error") {
      reset({
        email: result.values?.email as string,
        password: result.values?.password as string,
        oneTimePassword: false,
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
