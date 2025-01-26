"use client";

import FormLayout from "@/app/_components/FormLayout";
import { useActionState, useEffect } from "react";
import { updateEmailRequest } from "../actions";
import { useForm } from "react-hook-form";
import { useToast } from "@/app/_hooks/useToast";
import { useEditEmail } from "@/app/_contexts/EditEmailContext";
import { UpdateEmailRequestPayload } from "@/app/_types/editEmail";

function EditEmailForm() {
  const [result, formAction, isPending] = useActionState(
    updateEmailRequest,
    null,
  );

  const { handleNextStep } = useEditEmail();

  const notify = useToast();

  const {
    register,
    formState: { isValid },
  } = useForm<UpdateEmailRequestPayload>({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  useEffect(() => {
    if (result) {
      if (result.status === "success") {
        handleNextStep();
      } else {
        notify("error", result?.message as string);
      }
    }
  }, [handleNextStep, notify, result]);

  return (
    <FormLayout action={formAction}>
      <FormLayout.Control
        name="email"
        register={register}
        type="email"
        validation={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
        label="ایمیل خود را وارد کنید"
        textAlign="left"
      />
      <FormLayout.Submit
        pendingStatus={isPending}
        disabled={!isValid}
        label="ادامه"
      />
    </FormLayout>
  );
}

export default EditEmailForm;
