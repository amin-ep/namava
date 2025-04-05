import React from "react";
import cls from "classnames";
import { calcSubExpireDay } from "@/app/_utils/helpers";
import Link from "next/link";

type Props = { hasSubscription: boolean; subscriptionExpiresAt: Date };

function UserOptionsSubscriptionStatus({
  hasSubscription,
  subscriptionExpiresAt,
}: Props) {
  return (
    <div
      className={cls(
        "flex flex-col items-center justify-center gap-[10px] rounded-t-xl p-4",
        hasSubscription ? "bg-success" : "bg-red-default",
      )}
    >
      {hasSubscription ? (
        <>
          <p className="text-sm text-white">
            باقی مانده اشتراک: {calcSubExpireDay(subscriptionExpiresAt)} روز
          </p>
        </>
      ) : (
        <>
          <p className="text-sm text-white">اشتراک فعالی ندارید.</p>
          <Link
            href="/plans"
            className="w-full rounded-xl bg-white px-5 text-center text-xs leading-[30px] text-[rgb(26,26,26)] shadow-[0_4px_8px_rgba(0,0,0,0.25)] hover:bg-primary-default hover:text-white"
          >
            خرید اشتراک
          </Link>
        </>
      )}
    </div>
  );
}

export default UserOptionsSubscriptionStatus;
