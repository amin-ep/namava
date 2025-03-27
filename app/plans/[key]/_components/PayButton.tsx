"use client";

import LinkButton from "@/app/_components/LinkButton";
import { useTransition } from "react";
import { paySub } from "../actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/_hooks/useToast";
import { subscriptionOptions } from "@/app/_utils/constants";
import { IPaySubscriptionPayload } from "@/app/_types/subscriptionTypes";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  subKey: string;
  finalPrice: number;
  tax: number;
  discount: null | number;
};

function PayButton({ subKey, finalPrice, tax, discount }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const notify = useToast();

  const queryClient = useQueryClient();

  const buySubscription = async () => {
    const payload: IPaySubscriptionPayload = {
      price: finalPrice,
      months: subscriptionOptions.find((el) => el.key === subKey)
        ?.month as number,
      tax,
    };

    if (discount) payload.discount = discount;

    startTransition(async () => {
      const buyResponse = await paySub(payload);
      if (buyResponse?.status === "success") {
        queryClient.invalidateQueries({
          queryKey: ["subscription"],
        });
        router.push(`/purchase/${subKey}`);
      } else {
        notify("error", "مشکلی در پرداخت پیش آمد! لطفا دوباره تلاش کنید.");
      }
    });
  };

  return (
    <LinkButton
      color="primary"
      extraStyles="w-full"
      variation="button"
      buttonType="button"
      isPending={isPending}
      onClick={buySubscription}
    >
      ادامه و پرداخت
    </LinkButton>
  );
}

export default PayButton;
