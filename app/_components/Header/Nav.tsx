"use client";

import { MobileNavListItem } from "@/app/_types/globalTypes";
import { BsCameraReelsFill, BsFillCollectionPlayFill } from "react-icons/bs";
import { LuPopcorn } from "react-icons/lu";
import { MdChildCare } from "react-icons/md";
import { TbCategoryFilled, TbHomeFilled } from "react-icons/tb";
import Logo from "../Logo/Logo";
import HeaderMobileNav from "./HeaderMobileNav";
import NavList from "./NavList";
import { usePathname } from "next/navigation";
import cls from "classnames";

const items: MobileNavListItem[] = [
  {
    title: "خانه",
    href: "/home",
    icon: <TbHomeFilled size={30} />,
  },
  {
    title: "فیلم ها",
    href: "/movie",
    icon: <BsCameraReelsFill size={30} />,
  },
  {
    title: "سریال ها",
    href: "/series",
    icon: <BsFillCollectionPlayFill size={30} />,
  },
  {
    title: "دسته بندی",
    href: "/category",
    icon: <TbCategoryFilled size={30} />,
  },
  {
    title: "تازه ها",
    href: "/latest",
    icon: <LuPopcorn size={30} />,
  },
  {
    title: "کودکان",
    href: "/kids",
    icon: <MdChildCare size={30} />,
  },
];

function Nav() {
  const pathname = usePathname();
  return (
    <div
      className={cls(
        "flex items-center justify-start gap-4 md:gap-8",
        pathname.split("/")[1] === "account" && "hidden md:flex",
      )}
    >
      <Logo />
      <HeaderMobileNav items={items} />
      <NavList />
    </div>
  );
}

export default Nav;
