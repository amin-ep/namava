"use client";

import FormLayout from "@/app/_components/FormLayout";
import { useFormAction } from "@/app/_hooks/useFormAction";
import { SetPasswordPayload } from "@/app/_types/userTypes";
import { useForm } from "react-hook-form";
import { MdLockReset } from "react-icons/md";
import { setPassword } from "../actions";

function SetPasswordForm() {
  const {
    register,
    formState: { isValid },
    reset,
  } = useForm<SetPasswordPayload>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { action, isPending } = useFormAction({
    formAction: setPassword,
    shouldNotifyOnError: true,
    resetOnError: reset,
    onSuccessRouterHref: "/account",
    shouldNotifyOnSuccess: true,
  });

  return (
    <FormLayout
      action={action}
      description="لطفا رمز عبور خود را تعیین کنید"
      heading="افزودن رمز عبور"
      icon={<MdLockReset size={30} className="text-primary" />}
    >
      <FormLayout.Control
        name="password"
        register={register}
        type="password"
        validation={{
          required: true,
          minLength: 8,
          maxLength: 14,
        }}
        label="رمز عبور"
        textAlign="left"
      />
      <FormLayout.Submit
        disabled={!isValid}
        label="تایید"
        pendingStatus={isPending}
      />
    </FormLayout>
  );
}

export default SetPasswordForm;
