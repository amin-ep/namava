"use client";

import cls from "classnames";
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
    <button
      type="submit"
      className={cls(
        "bg-primary-default my-3 flex h-[42px] cursor-pointer items-center justify-center rounded-xl px-5 text-xs leading-[42px] text-white xsm:my-4",
        !pendingStatus
          ? "disabled:cursor-default disabled:bg-gray-400"
          : "disabled:cursor-default",
      )}
      disabled={disabled || pendingStatus}
    >
      {pendingStatus ? <MiniSpinner /> : label}
    </button>
  );
}
