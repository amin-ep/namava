"use client";

import { MobileNavListItem } from "@/app/_types/GlobalTypes";
import Link from "next/link";
import { FaStar, FaUser } from "react-icons/fa6";
import { IoIosListBox } from "react-icons/io";
import cls from "classnames";
import { usePathname } from "next/navigation";
import { User } from "@/app/_types/UserTypes";

const navItems: MobileNavListItem[] = [
  {
    title: "حساب کاربری",
    href: "/account",
    icon: <FaUser size={21} />,
  },
  {
    title: "وضعیت اشتراک",
    href: "/account/subscriptions",
    icon: <FaStar size={21} />,
  },
  {
    title: "لیست سفارش ها",
    href: "/account/orders",
    icon: <IoIosListBox size={21} />,
  },
  {
    title: "خروج از حساب کاربری",
    href: "/",
    icon: <IoIosListBox size={21} />,
  },
];

function SideMenu({
  firstName,
  lastName,
}: {
  firstName: User["firstName"];
  lastName: User["lastName"];
}) {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-col gap-4 rounded-xl bg-white pb-2 pt-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]">
      <div className="px-6">
        <h2>
          {firstName ?? "-"} {lastName ?? "-"}
        </h2>
      </div>
      <ul className="flex flex-col">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cls(
                "flex items-center justify-start gap-5 px-6 py-4 text-sm text-stone-400",
                pathname === item.href && "bg-stone-200/70",
              )}
            >
              <span className={pathname === item.href ? "text-primary" : ""}>
                {item.icon}
              </span>
              <span
                className={
                  pathname === item.href ? "text-primary" : "text-stone-800"
                }
              >
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideMenu;
