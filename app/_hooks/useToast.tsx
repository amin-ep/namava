"use client";

import { toast } from "react-toastify";
import { IoIosWarning } from "react-icons/io";
import { useId } from "react";

export function useToast() {
  const customId = useId();

  return function notify(
    status: "success" | "error" | "info" | "warn",
    message: string,
  ) {
    switch (status) {
      case "error":
        {
          toast.error(message, {
            icon: <IoIosWarning size={21} />,
            // className: "bg-[#d95c5c] text-white",
            autoClose: 5000,
            toastId: customId,
          });
        }
        break;

      default:
        toast("مشکلی هنگام ارسال درخواست پیش آمد لطفا دوباره تلاش کنید");
    }
  };
}
