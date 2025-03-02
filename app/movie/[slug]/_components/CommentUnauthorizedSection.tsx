import LinkButton from "@/app/_components/LinkButton";
import Image from "next/image";
import React from "react";

function CommentUnauthorizedSection() {
  return (
    <div className="mx-auto flex max-w-[462px] flex-col items-center justify-center gap-3 rounded-lg bg-gray-700 p-4 xsm:flex-row xl:max-w-[484px] xl:gap-4">
      <div className="mb-4 flex gap-2 text-xs font-normal xsm:mb-0">
        <Image src="/icons/comment.svg" alt="comment" width={40} height={40} />
        <p>برای ثبت نظر ابتدا باید وارد شوید.</p>
      </div>
      <div className="flex justify-center gap-6 xsm:gap-[18px] xl:gap-6">
        <LinkButton
          extraStyles="w-[108px] font-bold"
          color="white"
          variation="link"
          href="/auth/register"
        >
          ثبت نام
        </LinkButton>
        <LinkButton
          extraStyles="w-[108px] font-bold"
          color="glassy"
          variation="link"
          href="/auth/login"
        >
          ورود
        </LinkButton>
      </div>
    </div>
  );
}

export default CommentUnauthorizedSection;
