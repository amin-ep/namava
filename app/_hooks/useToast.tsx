"use client";

import { toast } from "react-toastify";
import { IoIosWarning } from "react-icons/io";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { useId } from "react";

export function useToast() {
  const customId = useId();

  return function notify(
    status: "success" | "error" | "info" | "warn" | string,
    message: string,
  ) {
    if (status === "success") {
      toast.success(message, {
        icon: <IoCheckmarkCircleSharp size={22} className="text-green-600" />,
        autoClose: 6000,
        toastId: customId,
      });
    }
    if (status === "error") {
      toast.error(message, {
        icon: <IoIosWarning size={21} />,
        autoClose: 5000,
        toastId: customId,
      });
    }
  };
}
