import LinkButton from "@/app/_components/LinkButton";
import Image from "next/image";
import React from "react";

type Props = { expirationDate: string };

function SuccessCard({ expirationDate }: Props) {
  return (
    <div className="mb-7 flex flex-col items-center justify-between gap-6 rounded-xl bg-white p-[20px_24px_20px_24px] shadow-md">
      <p className="text-center text-lg font-bold">{expirationDate}</p>
      <div className="flex items-center gap-1">
        <Image
          src="/icons/mark-success-green.svg"
          alt="success"
          width={20}
          height={20}
        />
        <span>خرید با موفقیت انجام شد.</span>
      </div>
      <LinkButton
        color="primary"
        variation="link"
        href="/"
        extraStyles="w-full"
      >
        تماشای فیلم و سریال
      </LinkButton>
    </div>
  );
}

export default SuccessCard;
