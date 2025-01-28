"use client";

import FormLayout from "@/app/_components/FormLayout";
import { useToast } from "@/app/_hooks/useToast";
import signup from "@/app/auth/register/actions";
import { ActionDispatch, useActionState, useEffect } from "react";
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
  const [result, formAction, isPending] = useActionState(signup, null);
  // const [isPending, startTransition] = useTransition();
  const {
    register,
    formState: { isValid },
    getValues,
  } = useForm<RegisterPayload>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const notify = useToast();

  useEffect(() => {
    if (result) {
      switch (result?.status) {
        case "success":
          dispatch({ type: "sent", payload: getValues()?.email });

          break;
        case "error":
          notify("error", result?.message as string);
          break;

        default:
          throw new Error("Unknown status");
      }
    }
  }, [result, dispatch, getValues]);

  return (
    <FormLayout
      description="لطفا ایمیل خود را وارد کنید."
      heading="ثبت نام"
      icon={<MdEditNote className="text-primary" size={35} />}
      headerLink={{ title: "ورود", href: "/auth/login" }}
      action={formAction}
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
