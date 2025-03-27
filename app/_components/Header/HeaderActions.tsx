import { cookies } from "next/headers";
import Link from "next/link";
import HeaderActionLinkButton from "./HeaderActionLinkButton";
import HeaderShuffleAction from "./HeaderShuffleAction";
import UserOptions from "./UserOptions";
import HeaderMobileAppAction from "./HeaderMobileAppAction";
import LinkButton from "../LinkButton";
import HeaderActionsIconWrapper from "./HeaderActionsIconWrapper";
import { getMySubscriptions } from "@/app/api/subscriptionApi";
import { ISubscription } from "@/app/_types/subscriptionTypes";

async function HeaderActions() {
  const token = await (
    await cookies()
  ).get(process.env.JWT_SECRET_KEY as string)?.value;

  let activeSubscription: ISubscription | null = null;
  if (token) {
    const subscriptions = await getMySubscriptions();

    activeSubscription =
      (subscriptions as ISubscription[]).find(
        (el) => new Date(el.expiresAt).getTime() > Date.now(),
      ) || null;
  }

  return (
    <div className="flex-end flex items-center gap-1 base:gap-3">
      <div className="flex items-center justify-end gap-3 text-[28px] text-white md:gap-5 lg:gap-6 xl:text-[40px]">
        <HeaderActionsIconWrapper>
          <HeaderActionLinkButton
            extraStyles="hidden base:block"
            variation="link"
            alt="search"
            href="/search"
            src="/icons/search-white.svg"
          />
          <HeaderShuffleAction />
          <HeaderMobileAppAction />
        </HeaderActionsIconWrapper>
        {token ? (
          <UserOptions
            subscriptionExpiresAt={activeSubscription?.expiresAt as Date}
          />
        ) : (
          <>
            <Link
              href="/"
              className="px-1 text-center text-xs leading-[44px] text-white hover:text-primary-light"
            >
              خرید اشتراک
            </Link>
            <LinkButton href="/auth/login" color="glassy" variation="link">
              <span>ورود</span>
              <span className="hidden base:block">/</span>
              <span className="hidden base:block">ثبت نام</span>
            </LinkButton>
          </>
        )}
      </div>
    </div>
  );
}

export default HeaderActions;
