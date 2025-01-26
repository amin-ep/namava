"use client";

import { useActionState, useEffect } from "react";
import OptionsList from "../../_components/OptionsList";
import { setPasswordRequest } from "../actions";

function SetPasswordOptions({
  setLevel,
  email,
}: {
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  email: string;
}) {
  const [message, formAction, isPending] = useActionState(
    setPasswordRequest,
    null,
  );

  useEffect(() => {
    if (message === "success") {
      setLevel(2);
    }
  }, [message, setLevel]);
  return (
    <OptionsList heading="برای افزودن رمز عبور، یکی از راه‌های زیر را انتخاب کنید:">
      <OptionsList.Item
        onClick={formAction}
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
