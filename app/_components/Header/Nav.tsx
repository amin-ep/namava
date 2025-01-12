import { MobileNavListItem } from "@/app/_types/GlobalTypes";
import Logo from "../Logo/Logo";
import HeaderMobileNav from "./HeaderMobileNav";
import NavList from "./NavList";
import { TbCategoryFilled, TbHomeFilled } from "react-icons/tb";
import { BsCameraReelsFill, BsFillCollectionPlayFill } from "react-icons/bs";
import { LuPopcorn } from "react-icons/lu";
import { MdChildCare } from "react-icons/md";

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
  return (
    <div className="flex items-center justify-start gap-4 md:gap-8">
      <Logo />
      <HeaderMobileNav items={items} />
      <NavList />
    </div>
  );
}

export default Nav;
