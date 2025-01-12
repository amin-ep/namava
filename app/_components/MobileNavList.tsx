"use client";

import Link from "next/link";
import { MobileNavListItem } from "../_types/GlobalTypes";
import { RefObject } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { usePathname } from "next/navigation";
import cls from "classnames";

function MobileNavList({
  items,
  ref,
  theme = "dark",
}: {
  items: MobileNavListItem[];
  ref: RefObject<HTMLUListElement | null>;
  theme?: "dark" | "light";
}) {
  const pathname = usePathname();
  return (
    <ul
      ref={ref}
      className={cls(
        "absolute top-10 z-50 flex w-48 translate-x-5 flex-col rounded-xl px-4 shadow-[0_5px_10px_rgba(0,0,0,0.3)]",
        theme === "dark" ? "bg-[#37383e]" : "bg-white",
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
                ? "border-stone-500 text-white"
                : "border-stone-400 text-stone-800",
            )}
          >
            <div className="flex items-center justify-start gap-3">
              <span
                className={theme === "dark" ? "text-white" : "text-stone-400"}
              >
                {item.icon}
              </span>
              <span className="text-xs font-semibold">{item.title}</span>
            </div>
            {pathname === item.href && (
              <IoMdCheckmark
                size={22}
                className={theme === "dark" ? "text-primary" : "text-stone-950"}
              />
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MobileNavList;
