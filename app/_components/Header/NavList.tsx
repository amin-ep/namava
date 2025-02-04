"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

const items = [
  {
    title: "خانه",
    href: "/home",
  },
  {
    title: "فیلم ها",
    href: "/movie",
  },
  {
    title: "سریال ها",
    href: "/series",
  },
  {
    title: "دسته بندی",
    href: "/category",
  },
  {
    title: "تازه ها",
    href: "/latest",
  },
  {
    title: "کودکان",
    href: "/kids",
  },
];
const NavList = memo(function NavList() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block">
      <ul className="mb-2 flex items-center gap-[18px] text-xs lg:gap-8 xl:mb-0">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`hover:text-primary-default font-medium ${
                pathname === item.href ? "text-primary-default" : "text-white"
              }`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default NavList;
