"use client";

import FormLayout from "@/app/_components/FormLayout";
import SixDigitsNumberInput from "@/app/_components/SixDigitsNumberInput";
import { useFormAction } from "@/app/_hooks/useFormAction";
import { RegisterVerificationPayload } from "@/app/_types/authTypes";
import { verifyEmail } from "@/app/auth/register/actions";
import { ActionDispatch } from "react";
import { useForm } from "react-hook-form";
import { MdEditNote } from "react-icons/md";
import { RegisterActionTypes } from "./RegisterForm";

function RegisterFormVerification({
  email,
  dispatch,
}: {
  email: string;
  dispatch: ActionDispatch<[action: RegisterActionTypes]>;
}) {
  const {
    register,
    formState: { isValid },
    setValue,
  } = useForm<RegisterVerificationPayload>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: email,
    },
  });

  const { action, isPending } = useFormAction({
    formAction: verifyEmail,
    shouldNotifyOnError: true,
    onSuccessRouterHref: "/",
  });

  return (
    <FormLayout
      action={action}
      description={`کد تایید به ایمیل ${email} ارسال شد.`}
      heading="ثبت نام"
      icon={<MdEditNote className="text-primary" size={35} />}
      headerLink={{ href: "/auth/login", title: "ورود" }}
    >
      <input
        type="hidden"
        {...register("verificationNumber", {
          required: true,
          validate: (val) => val.length === 6,
        })}
      />
      <input type="hidden" {...register("email")} />
      <SixDigitsNumberInput<RegisterVerificationPayload> setValue={setValue} />
      <FormLayout.Submit
        disabled={!isValid}
        label="تایید"
        pendingStatus={isPending}
      />
      <FormLayout.Footer>
        <button
          type="button"
          onClick={() => dispatch({ type: "clear" })}
          className="text-primary"
        >
          ایمیل را اشتباه وارد کرده اید؟
        </button>
      </FormLayout.Footer>
    </FormLayout>
  );
}

export default RegisterFormVerification;
