"use client";

import { useToast } from "@/app/_hooks/useToast";
import { useTransition } from "react";
import OptionsList from "../../_components/OptionsList";
import { setPasswordRequest } from "../actions";
import { FormActionPreviousState } from "@/app/_types/globalTypes";

function SetPasswordOptions({
  setLevel,
  email,
}: {
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  email: string;
}) {
  const [isPending, startTransition] = useTransition();

  const notify = useToast();

  const handleNextLevel = async () => {
    startTransition(async () => {
      const result: number | string | undefined | FormActionPreviousState =
        await setPasswordRequest();

      if (result === 200) {
        setLevel(2);
      } else if (typeof result === "string") {
        notify("error", result as string);
      }
    });
  };

  return (
    <OptionsList heading="برای افزودن رمز عبور، یکی از راه‌های زیر را انتخاب کنید:">
      <OptionsList.Item
        onClick={handleNextLevel}
        iconPath={{
          onHover: "/icons/mobile-2-white.svg",
          static: "/icons/mobile-2-primary.svg",
        }}
        label={` دریافت رمز یکبار مصرف (${email})`}
        isPending={isPending}
      />
    </OptionsList>
  );
}

export default SetPasswordOptions;
