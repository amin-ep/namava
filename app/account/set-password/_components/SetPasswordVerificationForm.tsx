import FormLayout from "@/app/_components/FormLayout";
import SixDigitsNumberInput from "@/app/_components/SixDigitsNumberInput";
import { useToast } from "@/app/_hooks/useToast";
import React, { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdLockReset } from "react-icons/md";
import { setPasswordVerify } from "../actions";

function SetPasswordVerificationForm({
  setLevel,
  email,
}: {
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  email: string;
}) {
  const notify = useToast();
  const [response, formAction, isPending] = useActionState(
    setPasswordVerify,
    null,
  );

  const {
    register,
    setValue,
    formState: { isValid },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  useEffect(() => {
    if (response) {
      if (typeof response !== "string" && response?.status === "error") {
        notify("error", response?.message);
      } else if (response === "success") {
        setLevel(3);
      }
    }
  }, [response, notify, setLevel]);

  return (
    <FormLayout
      action={formAction}
      description={`کد تایید به ایمیل ${email} ارسال شد. لطفا کد را وارد کنید.`}
      heading="افزودن رمز عبور"
      icon={<MdLockReset className="text-primary" size={30} />}
    >
      <SixDigitsNumberInput setValue={setValue} />
      <input
        type="hidden"
        {...register("verificationNumber", {
          minLength: 6,
          maxLength: 6,
          required: true,
        })}
      />
      <FormLayout.Submit
        disabled={!isValid}
        label="تایید"
        pendingStatus={isPending}
      />
    </FormLayout>
  );
}

export default SetPasswordVerificationForm;
