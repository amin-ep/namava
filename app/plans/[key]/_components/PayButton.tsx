"use client";

import LinkButton from "@/app/_components/LinkButton";

function PayButton() {
  return (
    <LinkButton
      color="primary"
      extraStyles="w-full"
      variation="button"
      buttonType="button"
    >
      ادامه و پرداخت
    </LinkButton>
  );
}

export default PayButton;
