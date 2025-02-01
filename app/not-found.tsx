import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404",
};

function NotFound() {
  return (
    <div className="pt-14 md:pt-44">
      <div className="mx-auto flex max-w-96 flex-col items-center justify-center gap-10 md:gap-[60px] xl:gap-20">
        <div className="flex flex-col items-center justify-center gap-3 text-center md:gap-5">
          <Image
            width={180}
            height={117}
            src="/404.png"
            alt="404-image"
            className="w-[180px] md:w-72 xl:w-[336px]"
          />
          <h1 className="text-sm text-white md:text-base">
            صفحه مورد نظر شما یافت نشد
          </h1>
          <p className="text-xs text-stone-400 md:text-sm xl:text-base">
            برای دیدن هزاران فیلم و سریال، به صفحه اصلی نماوا بروید
          </p>
        </div>
        <Link
          className="w-56 rounded-xl bg-white px-5 py-3 text-center text-xs text-stone-800 hover:bg-primary hover:text-white md:w-60 md:text-sm"
          href="/"
        >
          رفتن به خانه
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
