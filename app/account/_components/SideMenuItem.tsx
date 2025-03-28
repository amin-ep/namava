"use client";

import { MobileNavListItem } from "@/app/_types/globalTypes";
import cls from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { items: MobileNavListItem[] };

function SideMenuItem({ items }: Props) {
  const pathname = usePathname();
  return (
    <>
      {items.map((item, index) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={cls(
              "flex items-center justify-start gap-5 px-6 py-4 text-sm text-gray-400",
              (pathname === "/account/edit" && index === 0) ||
                pathname === item.href
                ? "bg-gray-100"
                : "",
            )}
          >
            <Image
              src={`/icons/${pathname === item.href ? item.activeIconPath : item.iconPath}`}
              alt={item.title}
              width={24}
              height={24}
            />
            <span
              className={
                (pathname === "/account/edit" && index === 0) ||
                pathname === item.href
                  ? "text-primary-default"
                  : "text-gray-800"
              }
            >
              {item.title}
            </span>
          </Link>
        </li>
      ))}
    </>
  );
}

export default SideMenuItem;
