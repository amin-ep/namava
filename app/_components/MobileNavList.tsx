"use client";

import cls from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdCheckmark } from "react-icons/io";
import { MobileNavListItem } from "../_types/globalTypes";
import { useEffect } from "react";

function MobileNavList({
  items,
  theme = "dark",
  className,
  close,
  closeOnScroll = false,
}: {
  items: MobileNavListItem[];
  theme?: "dark" | "light";
  className?: string;
  close: () => void;
  closeOnScroll?: boolean;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (closeOnScroll) {
      window.addEventListener("scroll", close);

      return () => window.removeEventListener("scroll", close);
    }
  }, [close, closeOnScroll]);
  return (
    <>
      <div className="fixed inset-0 z-10" onClick={close} />
      <ul
        className={cls(
          "fixed z-50 flex w-[11.25rem] translate-x-5 flex-col rounded-xl px-4 shadow-[0_5px_10px_rgba(0,0,0,0.3)]",
          theme === "dark" ? "bg-gray-700" : "bg-white",
          className,
        )}
      >
        {items.map((item, index) => (
          <li key={item.href} className="w-full">
            <Link
              href={item.href}
              className={cls(
                "flex items-center justify-between py-3",
                index !== items.length - 1 && "border-b",
                theme === "dark"
                  ? "border-gray-500 text-white"
                  : "border-gray-400 text-gray-800",
              )}
            >
              <div className="flex items-center justify-start gap-3">
                {item.icon && (
                  <span
                    className={
                      theme === "dark" ? "text-white" : "text-gray-400"
                    }
                  >
                    {item.icon}
                  </span>
                )}
                <span className="text-xs font-semibold">{item.title}</span>
              </div>
              {pathname === item.href && (
                <IoMdCheckmark
                  size={22}
                  className={
                    theme === "dark" ? "text-primary-default" : "text-gray-950"
                  }
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MobileNavList;
