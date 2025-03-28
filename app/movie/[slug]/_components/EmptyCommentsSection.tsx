import Image from "next/image";
import React from "react";

function EmptyCommentsSection() {
  const textClasses = "text-base font-medium xsm:text-lg lg:text-xl";
  return (
    <div className="mt-3 flex flex-col items-center justify-between gap-4 xsm:mt-5 xsm:gap-5 md:mb-[18px] md:mt-8 xl:gap-6">
      <Image
        src="/icons/comment.svg"
        alt="comment"
        width={120}
        height={120}
        className="aspect-square w-[120px] xsm:w-[140px] md:w-40 xl:w-[180px]"
      />
      <p className={textClasses}>هنوز نظری ثبت نشده‌‌است.</p>
      <p className={textClasses}>اولین نفری باشید که نظر خود را ثبت می‌کند.</p>
    </div>
  );
}

export default EmptyCommentsSection;
