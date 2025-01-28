"use client";

import FormLayout from "@/app/_components/FormLayout";
import { useFormAction } from "@/app/_hooks/useFormAction";
import signup from "@/app/auth/register/actions";
import { ActionDispatch } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { MdEditNote } from "react-icons/md";
import { RegisterActionTypes } from "./RegisterForm";

interface RegisterPayload extends FieldValues {
  email: string;
}

function RegisterEmailForm({
  dispatch,
}: {
  dispatch: ActionDispatch<[action: RegisterActionTypes]>;
}) {
  const {
    register,
    formState: { isValid },
    getValues,
    reset,
  } = useForm<RegisterPayload>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  function handleSuccessForm() {
    dispatch({ type: "sent", payload: getValues()?.email });
  }

  const { action, isPending } = useFormAction({
    formAction: signup,
    shouldNotifyOnError: true,
    onSuccess: handleSuccessForm,
    resetOnError: reset,
  });

  return (
    <FormLayout
      description="لطفا ایمیل خود را وارد کنید."
      heading="ثبت نام"
      icon={<MdEditNote className="text-primary" size={35} />}
      headerLink={{ title: "ورود", href: "/auth/login" }}
      action={action}
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
      <FormLayout.Submit
        label="ثبت نام"
        disabled={!isValid}
        pendingStatus={isPending}
      />
      <FormLayout.Footer>
        <p className="text-stone-950">
          با زدن ادامه دکمه{" "}
          <FormLayout.ExtraLink href="/terms-and-conditions">
            شرایط و قوانین سایت{" "}
          </FormLayout.ExtraLink>
          را می پذیرم
        </p>
      </FormLayout.Footer>
    </FormLayout>
  );
}

export default RegisterEmailForm;
