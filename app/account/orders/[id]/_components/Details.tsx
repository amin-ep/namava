import { ISubscription } from "@/app/_types/subscriptionTypes";
import { subscriptionOptions } from "@/app/_utils/constants";
import { jalaaliNumericDateAndTime } from "@/app/_utils/helpers";
import { getSubscriptionById } from "@/app/api/subscriptionApi";
import React from "react";
import cls from "classnames";
import LinkButton from "@/app/_components/LinkButton";

type Props = { id: string };

export default async function Details({ id }: Props) {
  const dataRes = (await getSubscriptionById(id)) as {
    status: string;
    data: ISubscription;
  };

  const wrapperClasses = "flex flex-col gap-5 xsm:gap-6";

  return (
    <div className="flex flex-col">
      <div
        className={cls(
          wrapperClasses,
          "border-b border-b-gray-400 pb-5 xsm:pb-6",
        )}
      >
        <Row>
          <span className="text-gray-700">شرح:</span>
          <span className="font-semibold text-gray-900">
            {
              subscriptionOptions.find((el) => el.month === dataRes.data.months)
                ?.expirationDate
            }
          </span>
        </Row>
        <Row>
          <span className="text-gray-900">شماره سفارش:</span>
          <span className="text-gray-500">{dataRes.data.subCode}</span>
        </Row>
        <Row>
          <span className="text-gray-900">زمان ثبت سفارش:</span>
          <span className="text-gray-500">
            {jalaaliNumericDateAndTime(dataRes.data.createdAt)}
          </span>
        </Row>
      </div>
      <div className={cls(wrapperClasses, "pt-5 xsm:pt-6")}>
        <Row>
          <span className="text-gray-900">قیمت:</span>
          <span className="text-gray-500">
            {
              subscriptionOptions.find(
                (sub) => sub.month === dataRes.data.months,
              )?.price
            }{" "}
            تومان
          </span>
        </Row>
        {dataRes.data.discount && (
          <Row extraStyles="text-red-default">
            <span>جمع تخفیف:</span>
            <span>{dataRes.data.discount} تومان</span>
          </Row>
        )}
        <Row>
          <span className="text-gray-900">مالیات بر ارزش افزوده:</span>
          <span className="text-gray-500">{dataRes.data.tax} تومان</span>
        </Row>
        <Row extraStyles="text-primary-default">
          <span>مبلغ پرداختی:</span>
          <span>{dataRes.data.price} تومان</span>
        </Row>
        <LinkButton variation="link" color="primary" href="/account/orders">
          بازگشت
        </LinkButton>
      </div>
    </div>
  );
}

function Row({
  children,
  extraStyles,
}: {
  children: React.ReactNode;
  extraStyles?: string;
}) {
  return (
    <div
      className={cls(
        "flex items-center justify-between text-xs xsm:text-sm md:text-base",
        extraStyles,
      )}
    >
      {children}
    </div>
  );
}
