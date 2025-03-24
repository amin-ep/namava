import React from "react";
import cls from "classnames";
import { subscriptionOptions } from "@/app/_utils/constants";
import {
  ISubscription,
  SubscriptionOption,
} from "@/app/_types/subscriptionTypes";
import {
  calculateDiscountPrice,
  calculateFinalPrice,
} from "@/app/_utils/helpers";
import { getMySubscriptions } from "@/app/api/subscriptionApi";
import PayButton from "../plans/[key]/_components/PayButton";

type Props = { subKey: string; status?: "waiting" | "payed" };

async function PaymentSummary({ subKey, status = "waiting" }: Props) {
  const userSubscriptions = await getMySubscriptions();

  const subOption: SubscriptionOption = subscriptionOptions.find(
    (el) => el.key === subKey,
  )!;

  const tax = (subOption.price * 9) / 100;

  const calcFinalPrice = () => {
    const userHadSubBefore = (userSubscriptions as ISubscription[]).length > 0;

    let finalPrice: null | number = null;

    if (!userHadSubBefore) {
      finalPrice =
        calculateFinalPrice(subOption.discountPercentage, subOption.price) +
        tax;
    } else {
      finalPrice = subOption.price + tax;
    }

    return finalPrice.toString();
  };

  return (
    <div className="rounded-xl border-gray-300 bg-white p-5 px-4 text-center shadow-md md:p-6 xl:p-6">
      <span className="mb-6 text-center">{subOption.expirationDate}</span>
      <div
        className={cls(
          "mb-4 flex flex-col",
          status === "waiting" && "border-b border-b-gray-400",
        )}
      >
        <Row title="قیمت" value={subOption.price.toString()} />
        {(userSubscriptions as ISubscription[]).length === 0 && (
          <Row
            title="جمع تخفیف"
            value={calculateDiscountPrice(
              subOption.discountPercentage,
              subOption.price,
            ).toString()}
            extraStyles="text-red-default"
          />
        )}
        <Row value={tax.toString()} title="مالیات بر ارزش افزوده" />
        <Row value={calcFinalPrice()} title="مبلغ قابل پرداخت" />
      </div>
      {status === "waiting" && (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm text-gray-700">مبلغ قابل پرداخت:</span>
            <span className="text-base text-primary-default">
              {calcFinalPrice()} تومان
            </span>
          </div>
          <PayButton finalPrice={+calcFinalPrice()} subKey={subKey} />
        </div>
      )}
    </div>
  );
}

function Row({
  title,
  value,
  extraStyles,
}: {
  title: string;
  value: string;
  extraStyles?: string;
}) {
  return (
    <div
      className={cls(
        "mb-3 flex items-center justify-between text-gray-500",
        extraStyles,
      )}
    >
      <span>{title}:</span>
      <span>{value} تومان</span>
    </div>
  );
}

export default PaymentSummary;
