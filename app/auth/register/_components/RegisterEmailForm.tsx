"use client";

import FormLayout from "@/app/_components/FormLayout";
import signup from "@/app/auth/register/actions";
import { ActionDispatch, useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm<RegisterPayload>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: RegisterPayload) => {
    startTransition(async () => {
      const response: string = await signup(data);
      if (response === "Created") {
        dispatch({ type: "sent", payload: data.email });
      } else {
        console.log(response);
      }
    });
  };

  return (
    <FormLayout
      description="لطفا ایمیل خود را وارد کنید."
      heading="ثبت نام"
      icon={<MdEditNote className="text-primary" size={35} />}
      headerLink={{ title: "ورود", href: "/auth/login" }}
      onSubmit={handleSubmit(onSubmit)}
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
