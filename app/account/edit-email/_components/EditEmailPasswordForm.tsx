"use client";

import FormLayout from "@/app/_components/FormLayout";
import { useActionState, useEffect } from "react";
import { verifyMe } from "../actions";
import { useForm } from "react-hook-form";
import { useToast } from "@/app/_hooks/useToast";
import { useEditEmail } from "@/app/_contexts/EditEmailContext";

function EditEmailPasswordForm() {
  const [result, formAction, isPending] = useActionState(verifyMe, null);
  const { handleNextStep } = useEditEmail();

  const notify = useToast();

  const {
    register,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (result) {
      if (result?.status === "success") {
        handleNextStep();
      } else {
        notify("error", result?.message as string);
      }
    }
  }, [result, handleNextStep, notify]);

  return (
    <FormLayout action={formAction as (payload?: FormData | undefined) => void}>
      <FormLayout.Control
        name="password"
        register={register}
        type="password"
        validation={{ required: true, minLength: 8, maxLength: 14 }}
        label="رمز عبور خود را وارد کنید"
        textAlign="left"
      />
      <FormLayout.Submit
        disabled={!isValid}
        label="ادامه"
        pendingStatus={isPending}
      />
    </FormLayout>
  );
}

export default EditEmailPasswordForm;
