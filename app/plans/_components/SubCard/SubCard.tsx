"use client";

import { SubscriptionOption } from "@/app/_types/subscriptionTypes";
import { calculateFinalPrice } from "@/app/_utils/helpers";
import Image from "next/image";
import Link from "next/link";

type Props = { subOption: SubscriptionOption; hadSubscriptionBefore: boolean };

function SubCard({ subOption, hadSubscriptionBefore }: Props) {
  return (
    <div className="mb-3 grid w-full grid-cols-[10px_1fr] rounded-xl md:mb-4">
      <span
        style={{
          background:
            "linear-gradient(rgb(199,199,199) 0%, rgb(199,199,199) 0.01%,rgb(238,238,238) 48.44%,rgb(199,199,199) 100%)",
        }}
        className="h-full w-2.5 rounded-r-xl"
      ></span>
      <Link
        href={`/plans/${subOption.key}`}
        className="flex flex-row rounded-l-xl border-b border-l border-t border-gray-300 bg-white p-4 md:pl-5 md:pr-3"
      >
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-row">
            {/* expiresAt */}
            <div className="flex h-full w-2/3 flex-col gap-3 md:w-3/4">
              <h2 className="text-sm text-gray-900 md:text-lg">
                {subOption.expirationDate}
              </h2>
              {!hadSubscriptionBefore && (
                <span className="w-fit rounded-full bg-primary-default px-3 py-1 text-sm text-white">
                  {subOption.discountPercentage}% تخفیف ویژه خرید اول
                </span>
              )}
            </div>
            {/* Price & Discount */}

            <div className="relative">
              {!hadSubscriptionBefore && (
                <div className="relative text-gray-400 before:absolute before:bottom-3 before:w-full before:border-t before:border-red-500 md:before:bottom-4">
                  <span className="pl-2 text-sm md:text-lg">
                    {subOption.price}
                  </span>
                  <span>تومان</span>
                </div>
              )}
              <div className="text-primary-default">
                <span className="ml-2 text-sm font-semibold md:text-lg">
                  {!hadSubscriptionBefore
                    ? calculateFinalPrice(
                        subOption.discountPercentage,
                        subOption.price,
                      )
                    : subOption.price}
                </span>
                <span className="text-xs md:text-base">تومان</span>
              </div>
            </div>
          </div>
          {/* discount label */}
        </div>
        <Image
          src="/icons/chevron-left-gray.svg"
          alt="arrow-left"
          width={16}
          height={40}
          className="hidden md:block"
        />
      </Link>
    </div>
  );
}

export default SubCard;
