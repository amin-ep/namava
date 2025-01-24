"use client";

import MainLink from "@/app/_components/MainLink";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { setPasswordRequest } from "../actions";
import MiniSpinner from "@/app/_components/MiniSpinner";

function SetPasswordRequestButton({
  setLevel,
  email,
}: {
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  email: string;
}) {
  const [buttonIsOnHover, setButtonIsOnHover] = useState(false);
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
    <form
      action={formAction}
      className="flex flex-col gap-7 rounded-xl bg-white px-6 py-10 xsm:p-10 xsm:shadow-[0_0px_8px_0_rgba(0,0,0,0.2)] md:px-8"
    >
      <div className="flex items-center justify-center xsm:mb-1">
        <Link href="/">
          <Image src="/logo.svg" width={85} height={40} alt="Namava Logo" />
        </Link>
      </div>
      <div>
        <h1 className="text-right text-sm font-semibold">
          برای افزودن رمز عبور، یکی از راه‌های زیر را انتخاب کنید:
        </h1>
      </div>
      <button
        type="submit"
        className="mb-[14px] flex items-center justify-between rounded-xl bg-stone-100 p-3 text-black hover:bg-primary hover:text-white md:p-4 base:mb-5"
        onMouseEnter={() => {
          setButtonIsOnHover(true);
        }}
        onMouseLeave={() => {
          setButtonIsOnHover(false);
        }}
      >
        <div className="flex items-center justify-start gap-3 md:gap-6">
          <Image
            src={
              buttonIsOnHover
                ? "/icons/mobile-2-white.svg"
                : "/icons/mobile-2-primary.svg"
            }
            alt="mobile-icon"
            width={24}
            height={24}
            className="aspect-square w-7 object-cover"
          />
          <span className="text-right text-sm">
            دریافت رمز یکبار مصرف ({email})
          </span>
        </div>
        <div>
          {!isPending ? (
            <Image
              src={
                !buttonIsOnHover
                  ? "/icons/chevron-left-gray.svg"
                  : "/icons/chevron-left-white.svg"
              }
              alt="arrow-left"
              width={6}
              height={6}
              className="w-4"
            />
          ) : (
            <MiniSpinner />
          )}
        </div>
      </button>
      <div className="flex items-center justify-center">
        <MainLink href="/account">بازگشت</MainLink>
      </div>
    </form>
  );
}

export default SetPasswordRequestButton;
