"use client";

import FormLayout from "@/app/_components/FormLayout";
import SixDigitsNumberInput from "@/app/_components/SixDigitsNumberInput";
import { useToast } from "@/app/_hooks/useToast";
import { OTPLoginVerificationPayload } from "@/app/_types/authTypes";
import { otpVerifyLogin } from "@/app/auth/login-otp/actions";
import { useRouter } from "next/navigation";
import { ActionDispatch, useActionState, useEffect } from "react";
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
  const [result, formAction, isPending] = useActionState(otpVerifyLogin, null);
  const router = useRouter();
  const notify = useToast();

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

  useEffect(() => {
    if (result?.status === "success") {
      router.push("/");
    }
  }, [router, result?.status]);

  useEffect(() => {
    if (result && result.status === "error") {
      notify("error", result?.message as string);
      reset({
        verificationNumber: result.values?.verificationNumber as string,
        email: email,
      });
    }
  }, [result]);

  return (
    <FormLayout
      action={formAction}
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
