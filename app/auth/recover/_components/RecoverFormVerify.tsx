"use client";

import FormLayout from "@/app/_components/FormLayout";
import { useForm } from "react-hook-form";
import { forgetPasswordVerify } from "../actions";
import { MdLockReset } from "react-icons/md";
import SixDigitsNumberInput from "@/app/_components/SixDigitsNumberInput";
import { IForgetPasswordVerifyPayload } from "@/app/_types/authTypes";
import { useActionState, useEffect } from "react";
import { useToast } from "@/app/_hooks/useToast";

function RecoverFormVerify({
  nextStep,
  email,
  setResetId,
  wrongEmail,
}: {
  nextStep: () => void;
  email: string;
  wrongEmail: () => void;
  setResetId: (id: string) => void;
}) {
  const [result, action, isPending] = useActionState(
    forgetPasswordVerify,
    null,
  );

  const notify = useToast();

  const {
    formState: { isValid },
    register,
    setValue,
    reset,
  } = useForm<IForgetPasswordVerifyPayload>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: email,
    },
  });

  useEffect(() => {
    if (result) {
      if (result?.status === "success") {
        setResetId(result?.message as string);
        nextStep();
      } else if (result.status === "error") {
        const values = result?.values as { email: string };
        reset({
          email: values.email,
        });
        notify("error", result?.message as string);
      }
    }
  }, [result, nextStep, setResetId]);

  return (
    <FormLayout
      action={action}
      headerLink={{ title: "ثبت نام", href: "/auth/register" }}
      heading="بازیابی رمز عبور"
      description={`کد تایید به ایمیل ${email} ارسال شد. لطفا کد را وارد کنید`}
      icon={<MdLockReset size={35} className="text-primary" />}
    >
      <SixDigitsNumberInput setValue={setValue} />
      <input
        type="hidden"
        {...register("verificationNumber", {
          required: true,
          validate: (val) => val.length === 6 || "",
        })}
      />
      <input
        type="hidden"
        {...register("email", {
          required: true,
        })}
      />
      <FormLayout.Submit
        disabled={!isValid}
        pendingStatus={isPending}
        label="تایید"
      />
      <FormLayout.Footer>
        <button type="button" onClick={wrongEmail}>
          ایمیل را اشتباه وارد کرده اید؟
        </button>
      </FormLayout.Footer>
    </FormLayout>
  );
  return null;
}

export default RecoverFormVerify;
