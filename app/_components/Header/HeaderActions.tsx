import cls from "classnames";
import Image from "next/image";
import Link from "next/link";
import UserOptions from "./UserOptions";
import { cookies } from "next/headers";

async function UserActions() {
  const classes = "w-8 aspect-square flex items-center justify-center xl:w-9";

  const token = await (
    await cookies()
  ).get(process.env.JWT_SECRET_KEY as string)?.value;

  return (
    <div className="flex-end flex items-center gap-1 md:gap-3">
      {token ? (
        <div className="flex items-center justify-end gap-5 text-[28px] text-white lg:gap-6 xl:text-[40px]">
          <Link href="/search" className={cls(classes, "hidden xl:block")}>
            <Image
              width={32}
              height={32}
              alt="search"
              src="/icons/search.svg"
              quality={100}
              className="w-8 rotate-90 xl:w-9"
            />
          </Link>
          <button className={cls(classes)}>
            <Image
              width={32}
              height={32}
              alt="search"
              src="/icons/arrows.svg"
              quality={100}
              className="w-8 xl:w-9"
            />
          </button>
          <button className={cls(classes, "hidden xl:block")}>
            <Image
              width={32}
              height={32}
              alt="search"
              src="/icons/mobile.svg"
              quality={100}
              className="w-8 xl:w-9"
            />
          </button>
          <UserOptions />
        </div>
      ) : (
        <>
          <Link
            href="/"
            className="px-5 text-center text-xs leading-[44px] text-white hover:text-primary"
          >
            خرید اشتراک
          </Link>
          <Link
            href="/auth/login"
            className="flex h-[42px] items-center justify-between gap-[2px] rounded-xl bg-[rgba(255,255,255,0.2)] px-5 text-xs text-white hover:bg-[rgba(255,255,255,0.4)]"
          >
            <span>ورود</span>
            <span className="hidden md:block">/</span>
            <span className="hidden md:block">ثبت نام</span>
          </Link>
        </>
      )}
    </div>
  );
}

export default UserActions;
