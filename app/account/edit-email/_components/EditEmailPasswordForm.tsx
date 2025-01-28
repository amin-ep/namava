"use client";

import FormLayout from "@/app/_components/FormLayout";
import { useEditEmail } from "@/app/_contexts/EditEmailContext";
import { useFormAction } from "@/app/_hooks/useFormAction";
import { VerifyMePayload } from "@/app/_types/userTypes";
import { useForm } from "react-hook-form";
import { verifyMe } from "../actions";

function EditEmailPasswordForm() {
  const { handleNextStep } = useEditEmail();

  const {
    register,
    formState: { isValid },
    reset,
  } = useForm<VerifyMePayload>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { action, isPending } = useFormAction({
    formAction: verifyMe,
    shouldNotifyOnError: true,
    resetOnError: reset,
    onSuccess: () => handleNextStep(),
  });

  return (
    <FormLayout action={action}>
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
