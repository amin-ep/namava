"use client";

import MainLink from "@/app/_components/MainLink";
import MiniSpinner from "@/app/_components/MiniSpinner/MiniSpinner";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function OptionsList({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-7 rounded-xl bg-white px-6 py-10 xsm:p-10 xsm:shadow-[0_0px_8px_0_rgba(0,0,0,0.2)] md:px-8">
      <div className="flex items-center justify-center xsm:mb-1">
        <Link href="/">
          <Image src="/logo.svg" width={85} height={40} alt="Namava Logo" />
        </Link>
      </div>
      <div>
        <h1 className="text-right text-sm font-semibold">{heading}</h1>
      </div>
      <div className="flex flex-col gap-3 md:gap-6">{children}</div>
      <div className="flex items-center justify-center">
        <MainLink href="/account">بازگشت</MainLink>
      </div>
    </div>
  );
}

function Item({
  isPending,
  label,
  onClick,
  iconPath,
}: {
  isPending?: boolean;
  onClick?: () => void;
  label: string;
  iconPath: { onHover: string; static: string };
}) {
  const [buttonIsOnHover, setButtonIsOnHover] = useState(false);

  return (
    <button
      {...(onClick && { onClick: onClick })}
      type="button"
      className="flex items-center justify-between rounded-xl bg-gray-100 p-3 text-black hover:bg-primary-default hover:text-white md:p-4"
      onMouseEnter={() => {
        setButtonIsOnHover(true);
      }}
      onMouseLeave={() => {
        setButtonIsOnHover(false);
      }}
    >
      <div className="flex items-center justify-start gap-3 md:gap-6">
        <Image
          src={buttonIsOnHover ? iconPath.onHover : iconPath.static}
          alt="mobile-icon"
          width={24}
          height={24}
          className="aspect-square w-7 object-cover"
        />
        <span className="text-right text-sm">{label}</span>
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
  );
}

OptionsList.Item = Item;

export default OptionsList;
