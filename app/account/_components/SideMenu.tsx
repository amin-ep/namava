import { MobileNavListItem } from "@/app/_types/globalTypes";
import { User } from "@/app/_types/userTypes";
import { memo } from "react";
import SideMenuItem from "./SideMenuItem";
import SideMenuLogoutButton from "./SideMenuLogoutButton";

const navItems: MobileNavListItem[] = [
  {
    title: "حساب کاربری",
    href: "/account",
    iconPath: "user-gray.svg",
    activeIconPath: "user-primary.svg",
  },
  {
    title: "وضعیت اشتراک",
    href: "/account/subscriptions",
    iconPath: "star-gray.svg",
    activeIconPath: "star-primary.svg",
  },
  {
    title: "لیست سفارش ها",
    href: "/account/orders",
    iconPath: "orders-gray.svg",
    activeIconPath: "orders-primary.svg",
  },
];

const SideMenu = memo(function SideMenu({
  firstName,
  lastName,
}: {
  firstName: User["firstName"];
  lastName: User["lastName"];
}) {
  return (
    <div className="fixed hidden w-64 md:block xl:w-[17.75rem]">
      <aside className="flex w-full flex-col gap-4 rounded-xl bg-white pb-2 pt-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]">
        <div className="px-6">
          <h2>
            {firstName ?? "-"} {lastName ?? "-"}
          </h2>
        </div>
        <ul className="flex flex-col">
          <SideMenuItem items={navItems} />
          <li>
            <SideMenuLogoutButton />
          </li>
        </ul>
      </aside>
    </div>
  );
});

export default SideMenu;
