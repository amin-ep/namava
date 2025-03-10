import Image from "next/image";
import React from "react";

function EmptyPlaylist() {
  return (
    <div className="my-[100px] flex flex-col items-center justify-center text-center">
      <Image
        src="/icons/empty-sad-folder.svg"
        alt="empty-folder"
        width={140}
        height={140}
        className="aspect-square w-[140px] xsm:w-[180px] xl:w-[200px]"
      />
      <div className="mx-auto w-[320px] py-5 text-sm leading-6 text-white xl:w-[600px] xl:py-10">
        <span className="text-sm xl:text-lg">
          برای افزودن فیلم یا سریال به این لیست، دکمه افزودن به لیست را، در صفحه
          فیلم یا سریال بزنید و این لیست را از گزینه‌های موجود انتخاب کنید.
        </span>
      </div>
    </div>
  );
}

export default EmptyPlaylist;
