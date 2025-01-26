"use client";

import { useEditEmail } from "@/app/_contexts/EditEmailContext";
import { useToast } from "@/app/_hooks/useToast";
import { useTransition } from "react";
import OptionsList from "../../_components/OptionsList";
import { otpUpdateEmailRequest } from "../actions";

function EditEmailOptions() {
  const [isPending, startTransition] = useTransition();
  const { handleChangeOption, userData: user } = useEditEmail();
  const notify = useToast();

  const handleOtpChangeEmailRequest = async () => {
    startTransition(async () => {
      const result = await otpUpdateEmailRequest();
      if (result === 200) {
        handleChangeOption("email");
      } else {
        notify("error", result as string);
      }
    });
  };

  return (
    <OptionsList heading="لطفا از طریق یکی از راه های زیر احراز هویت کنید">
      {user?.password && (
        <OptionsList.Item
          iconPath={{
            onHover: "/icons/lock-reset-white.svg",
            static: "/icons/lock-reset-primary.svg",
          }}
          label="وارد کردن رمز عبور ثابت"
          onClick={() => {
            handleChangeOption("password");
          }}
        />
      )}
      <OptionsList.Item
        iconPath={{
          onHover: "/icons/email-address-white.svg",
          static: "/icons/email-address-primary.svg",
        }}
        label={`دریافت رمز یکبار مصرف(${user?.email ?? ""})`}
        onClick={handleOtpChangeEmailRequest}
        isPending={isPending}
      />
    </OptionsList>
  );
}

export default EditEmailOptions;
