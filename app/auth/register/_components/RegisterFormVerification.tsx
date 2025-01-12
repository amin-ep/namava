"use client";

import { verifyEmail } from "@/app/auth/register/actions";
import { RegisterVerificationPayload } from "@/app/_types/AuthTypes";
import FormLayout from "@/app/_components/FormLayout";
import SixDigitsNumberInput from "@/app/_components/SixDigitsNumberInput";
import { useRouter } from "next/navigation";
import { ActionDispatch, useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    formState: { isValid },
    setValue,
    handleSubmit,
  } = useForm<RegisterVerificationPayload>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: RegisterVerificationPayload) => {
    startTransition(async () => {
      const response = await verifyEmail({
        email: email,
        verificationNumber: data.verificationNumber,
      });

      if (response === "OK") {
        router.push("/");
      }
    });
  };

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
      description={`کد تایید به ایمیل ${email} ارسال شد.`}
      heading="ثبت نام"
      icon={<MdEditNote className="text-primary" size={35} />}
      headerLink={{ href: "/auth/login", title: "ورود" }}
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
