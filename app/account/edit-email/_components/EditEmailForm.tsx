"use client";

import FormLayout from "@/app/_components/FormLayout";
import { useEditEmail } from "@/app/_contexts/EditEmailContext";
import { useFormAction } from "@/app/_hooks/useFormAction";
import { UpdateEmailRequestPayload } from "@/app/_types/editEmail";
import { useForm } from "react-hook-form";
import { updateEmailRequest } from "../actions";

function EditEmailForm() {
  const { handleNextStep } = useEditEmail();

  const {
    register,
    formState: { isValid },
    reset,
  } = useForm<UpdateEmailRequestPayload>({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const { action, isPending } = useFormAction({
    formAction: updateEmailRequest,
    shouldNotifyOnError: true,
    resetOnError: reset,
    onSuccess: () => handleNextStep(),
  });

  return (
    <FormLayout action={action}>
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
