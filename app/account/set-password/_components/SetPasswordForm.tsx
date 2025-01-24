import FormLayout from "@/app/_components/FormLayout";
import React, { useActionState, useEffect } from "react";
import { setPassword } from "../actions";
import { useForm } from "react-hook-form";
import { MdLockReset } from "react-icons/md";
import { SetPasswordPayload } from "@/app/_types/UserTypes";
import { useToast } from "@/app/_hooks/useToast";
import { useRouter } from "next/navigation";

function SetPasswordForm() {
  const [response, formAction, isPending] = useActionState(setPassword, null);
  const notify = useToast();

  const router = useRouter();

  const {
    register,
    formState: { isValid },
  } = useForm<SetPasswordPayload>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (response) {
      if (response?.status === "success") {
        notify("success", response?.message);
        router.push("/account");
      } else {
        notify("error", response?.message);
      }
    }
  }, [notify, response, router]);
  return (
    <FormLayout
      action={formAction}
      description="لطفا رمز عبور خود را تعیین کنید"
      heading="افزودن رمز عبور"
      icon={<MdLockReset size={30} />}
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
