import { cookies } from "next/headers";
import Link from "next/link";
import HeaderActionLinkButton from "./HeaderActionLinkButton";
import HeaderShuffleAction from "./HeaderShuffleAction";
import UserOptions from "./UserOptions";
import HeaderMobileAppAction from "./HeaderMobileAppAction";

async function UserActions() {
  const token = await (
    await cookies()
  ).get(process.env.JWT_SECRET_KEY as string)?.value;

  return (
    <div className="flex-end flex items-center gap-1 base:gap-3">
      <div className="flex items-center justify-end gap-3 text-[28px] text-white md:gap-5 lg:gap-6 xl:text-[40px]">
        <HeaderActionLinkButton
          extraStyles="hidden base:block"
          variation="link"
          alt="search"
          href="/search"
          src="/icons/search-white.svg"
        />
        <HeaderShuffleAction />
        <HeaderMobileAppAction />
        {token ? (
          <UserOptions />
        ) : (
          <>
            <Link
              href="/"
              className="px-1 text-center text-xs leading-[44px] text-white hover:text-primary-light"
            >
              خرید اشتراک
            </Link>
            <Link
              href="/auth/login"
              className="flex h-[42px] items-center justify-between gap-[2px] rounded-xl bg-[rgba(255,255,255,0.2)] px-5 text-xs text-white hover:bg-[rgba(255,255,255,0.4)]"
            >
              <span>ورود</span>
              <span className="hidden base:block">/</span>
              <span className="hidden base:block">ثبت نام</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default UserActions;
