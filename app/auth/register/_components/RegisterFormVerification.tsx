"use client";

import { verifyEmail } from "@/app/auth/register/actions";
import { RegisterVerificationPayload } from "@/app/_types/authTypes";
import FormLayout from "@/app/_components/FormLayout";
import SixDigitsNumberInput from "@/app/_components/SixDigitsNumberInput";
import { useRouter } from "next/navigation";
import { ActionDispatch, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdEditNote } from "react-icons/md";
import { RegisterActionTypes } from "./RegisterForm";
import { useToast } from "@/app/_hooks/useToast";
function RegisterFormVerification({
  email,
  dispatch,
}: {
  email: string;
  dispatch: ActionDispatch<[action: RegisterActionTypes]>;
}) {
  // const [isPending, startTransition] = useTransition();
  const [result, formAction, isPending] = useActionState(verifyEmail, null);
  const router = useRouter();

  const notify = useToast();

  const {
    register,
    formState: { isValid },
    setValue,
  } = useForm<RegisterVerificationPayload>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: email,
    },
  });

  useEffect(() => {
    if (result) {
      switch (result?.status) {
        case "success":
          router.push("/");

          break;
        case "error":
          notify("error", result?.message as string);
          break;

        default:
          throw new Error("Unknown status");
      }
    }
  }, [result]);

  // const onSubmit = (data: RegisterVerificationPayload) => {
  //   startTransition(async () => {
  //     const response = await verifyEmail({
  //       email: email,
  //       verificationNumber: data.verificationNumber,
  //     });

  //     if (response === "OK") {
  //       router.push("/");
  //     }
  //   });
  // };

  return (
    <FormLayout
      action={formAction}
      description={`کد تایید به ایمیل ${email} ارسال شد.`}
      heading="ثبت نام"
      icon={<MdEditNote className="text-primary" size={35} />}
      headerLink={{ href: "/auth/login", title: "ورود" }}
    >
      {/* <FormLayout.Control
        name="verificationNumber"
        register={register}
        validation={{
          required: true,
          validate: (val) => val.length === 6,
        }}
        type="hidden"
      /> */}
      <input
        type="hidden"
        {...register("verificationNumber", {
          required: true,
          validate: (val) => val.length === 6,
        })}
      />
      <input type="hidden" {...register("email")} />
      <SixDigitsNumberInput<RegisterVerificationPayload> setValue={setValue} />
      <FormLayout.Submit
        disabled={!isValid}
        label="تایید"
        pendingStatus={isPending}
      />
      <FormLayout.Footer>
        <button
          type="button"
          onClick={() => dispatch({ type: "clear" })}
          className="text-primary"
        >
          ایمیل را اشتباه وارد کرده اید؟
        </button>
      </FormLayout.Footer>
    </FormLayout>
  );
}

export default RegisterFormVerification;
