"use client";

import FormLayout from "@/app/_components/FormLayout";
import { useFormAction } from "@/app/_hooks/useFormAction";
import { IResetPasswordPayload } from "@/app/_types/authTypes";
import { useForm } from "react-hook-form";
import { MdLockReset } from "react-icons/md";
import { resetPassword } from "../actions";

function RecoverFormPassword({ resetId }: { resetId: string }) {
  const {
    register,
    formState: { isValid },
    reset,
  } = useForm<IResetPasswordPayload>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      resetId: resetId,
    },
  });

  const { action, isPending } = useFormAction<
    IResetPasswordPayload,
    {
      password: string;
      resetId: string;
    }
  >({
    formAction: resetPassword,
    resetOnError: reset,
    onSuccessRouterHref: "/",
    shouldNotifyOnError: true,
  });

  return (
    <FormLayout
      action={action}
      headerLink={{ title: "ثبت نام", href: "/auth/register" }}
      heading="بازیابی رمز عبور"
      description="لطفا رمز عبور جدید خود را تعیین کنید."
      icon={<MdLockReset size={35} className="text-primary-default" />}
    >
      <FormLayout.Control
        register={register}
        name="password"
        type="password"
        label="رمز عبور جدید"
        validation={{
          required: true,
          minLength: 8,
          maxLength: 14,
        }}
      />
      <input type="hidden" {...register("resetId")} />
      <FormLayout.Submit
        disabled={!isValid}
        pendingStatus={isPending}
        label="ادامه"
      />
    </FormLayout>
  );
}

export default RecoverFormPassword;
