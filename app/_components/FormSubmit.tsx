"use client";

import LinkButton from "./LinkButton";
import MiniSpinner from "./MiniSpinner";

export default function FormSubmit({
  label,
  disabled,
  pendingStatus,
}: {
  label: string;
  disabled: boolean;
  pendingStatus: boolean;
}) {
  return (
    <LinkButton
      color="primary"
      variation="button"
      buttonType="submit"
      isPending={pendingStatus}
      disabled={disabled || pendingStatus}
      extraStyles=""
    >
      {pendingStatus ? <MiniSpinner /> : label}
    </LinkButton>
  );
}
