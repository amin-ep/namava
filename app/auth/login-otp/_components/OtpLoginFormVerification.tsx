"use client";

import { useToast } from "@/app/_hooks/useToast";
import { OTPLoginVerificationPayload } from "@/app/_types/AuthTypes";
import FormLayout from "@/app/_components/FormLayout";
import SixDigitsNumberInput from "@/app/_components/SixDigitsNumberInput";
import { otpVerifyLogin } from "@/app/auth/login-otp/actions";
import { useRouter } from "next/navigation";
import { ActionDispatch, useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const notify = useToast();

  const {
    register,
    formState: { isValid },
    handleSubmit,
    setValue,
  } = useForm<OTPLoginVerificationPayload>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: OTPLoginVerificationPayload) => {
    startTransition(async () => {
      const response = await otpVerifyLogin({
        email: email,
        verificationNumber: data.verificationNumber,
      });

      if (response === "OK") {
        router.push("/");
      } else {
        notify("error", response || "مشکلی هنگام ارسال درخواست به وجود آمد");
      }
    });
  };

  return (
    <FormLayout
      onSubmit={handleSubmit(onSubmit)}
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
