import Image from "next/image";
import Link from "next/link";

function ChangePasswordSuccess() {
  return (
    <div className="mx-auto flex h-dvh w-full flex-col items-center gap-7 bg-white py-20 xsm:mt-40 xsm:h-[unset] xsm:max-w-[500px] xsm:gap-8 xsm:rounded-xl xsm:p-10 xsm:shadow-[0_0_8px_0_rgba(0,0,0,0.2)]">
      <Link href="/">
        <Image src="/logo.svg" width={85} height={40} alt="Namava Logo" />
      </Link>
      <Image
        src="/icons/mark-green.svg"
        alt="mark"
        className="aspect-square w-10 xsm:w-[60px]"
        width={60}
        height={60}
      />
      <p className="text-sm text-stone-700 xsm:text-base">
        تغییر رمز عبور با موفقیت انجام شد.
      </p>
      <Link
        href="/account"
        className="my-3 flex h-[42px] w-[272px] cursor-pointer items-center justify-center rounded-xl bg-primary px-5 text-xs leading-[42px] text-white xsm:my-4 xsm:w-[360px]"
      >
        بازگشت
      </Link>
    </div>
  );
}

export default ChangePasswordSuccess;
