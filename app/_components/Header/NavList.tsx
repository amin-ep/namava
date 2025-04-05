"use client";

import { MobileNavListItem } from "@/app/_types/globalTypes";
import { findPersianCategoryName } from "@/app/_utils/helpers";
import cls from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

// const items = [
//   {
//     title: "خانه",
//     href: "home",
//   },
//   {
//     title: "فیلم ها",
//     href: "movie",
//   },
//   {
//     title: "سریال ها",
//     href: "series",
//   },
//   {
//     title: "دسته بندی",
//     href: "category",
//   },
//   {
//     title: "تازه ها",
//     href: "latest",
//   },
//   {
//     title: "کودکان",
//     href: "kids",
//   },
// ];

type Props = { items: MobileNavListItem[] };

const NavList = memo(function NavList({ items }: Props) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block">
      <ul className="mb-2 flex items-center gap-[18px] text-xs lg:gap-8 xl:mb-0">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cls(
                "font-medium hover:text-primary-light",
                pathname === item.href ? "text-primary-default" : "text-white",
              )}
            >
              {item.title}{" "}
              {item.href === "category" &&
                pathname.split("/").length == 3 &&
                pathname === "category" &&
                `(${findPersianCategoryName(pathname.split("/")[2])})`}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default NavList;
