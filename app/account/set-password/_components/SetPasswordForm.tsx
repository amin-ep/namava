"use client";

import FormLayout from "@/app/_components/FormLayout";
import { useToast } from "@/app/_hooks/useToast";
import { SetPasswordPayload } from "@/app/_types/userTypes";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdLockReset } from "react-icons/md";
import { setPassword } from "../actions";

function SetPasswordForm() {
  const [result, formAction, isPending] = useActionState(setPassword, null);
  const notify = useToast();
  const router = useRouter();

  const {
    register,
    formState: { isValid },
    reset,
  } = useForm<SetPasswordPayload>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (result) {
      if (result?.status === "success") {
        notify("success", result?.message);
        router.push("/account");
      } else {
        notify("error", result?.message);
        reset({
          password: result.values?.password as string,
        });
      }
    }
  }, [result, router]);

  return (
    <FormLayout
      action={formAction}
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
