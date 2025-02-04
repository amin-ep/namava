"use client";

import FormLayout from "@/app/_components/FormLayout";
import { useFormAction } from "@/app/_hooks/useFormAction";
import { useForm } from "react-hook-form";
import { forgetPassword } from "../actions";
import { MdLockReset } from "react-icons/md";
import { IForgetPasswordPayload } from "@/app/_types/authTypes";

function RecoverFormEmail({
  nextStep,
  setEmail,
}: {
  nextStep: () => void;
  setEmail: (email: string) => void;
}) {
  const {
    reset,
    register,
    formState: { isValid },
    getValues,
  } = useForm<IForgetPasswordPayload>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const formActionOnSuccess = () => {
    setEmail(getValues().email);
    nextStep();
  };

  const { action, isPending } = useFormAction({
    formAction: forgetPassword,
    shouldNotifyOnError: true,
    onSuccess: formActionOnSuccess,
    resetOnError: reset,
  });

  return (
    <FormLayout
      action={action}
      headerLink={{ title: "ثبت نام", href: "/auth/register" }}
      heading="بازیابی رمز عبور"
      description="لطفا ایمیل خود را وارد کنید."
      icon={<MdLockReset size={35} className="text-primary-default" />}
    >
      <FormLayout.Control
        name="email"
        register={register}
        type="email"
        validation={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
        label="ایمیل"
        textAlign="left"
      />
      <FormLayout.Submit
        disabled={!isValid}
        pendingStatus={isPending}
        label="دریافت رمز یکبار مصرف"
      />
    </FormLayout>
  );
}

export default RecoverFormEmail;
