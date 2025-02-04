"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cls from "classnames";
import MobileNavList from "../MobileNavList";
import { MobileNavListItem } from "@/app/_types/globalTypes";
import { useModal } from "@/app/_hooks/useModal";

interface IItemContent {
  title: string;
  href?: string;
  iconPath: { active?: string; default: string };
  onClick?: () => void;
}

const footerModalMenuItems: MobileNavListItem[] = [
  { title: "اپلیکیشن‌ها", href: "/apps" },
  { title: "فرصت‌های شغلی", href: "/jobs" },
  { title: "تبلیغات در نماوا", href: "/pages/commercial/" },
  { title: "خرید اشتراک", href: "/plans" },
  { title: "کارت هدیه", href: "/plans#redeemCard" },
  { title: "سوالات متداول", href: "/faq" },
  { title: "تماس با ما", href: "/contact" },
  { title: "درباره نماوا", href: "/intro" },
  { title: "نماوا مگ", href: "/mag" },
  { title: "قوانین", href: "/terms-and-conditions" },
  { title: "شرایط مصرف اینترنت", href: "/internet" },
  { title: "ارسال فیلم‌نامه", href: "/pages/script" },
  { title: "دانلودها", href: "/downloads" },
];

function MobileFooter() {
  const { close, isOpen, open } = useModal();
  const classes: string = "flex flex-col items-center justify-center";

  const items: IItemContent[] = [
    {
      title: "خانه",
      href: "/home",
      iconPath: {
        active: "/icons/home-white.svg",
        default: "/icons/home-gray.svg",
      },
    },
    {
      title: "جستجو",
      href: "/search",
      iconPath: {
        active: "/icons/search-white.svg",
        default: "/icons/search-gray.svg",
      },
    },
    {
      title: "دسته بندی",
      href: "/category",
      iconPath: {
        active: "/icons/category-white.svg",
        default: "/icons/category-gray.svg",
      },
    },
    {
      title: "لیست ها",
      href: "/playlists",
      iconPath: {
        active: "/icons/folder-open-white.svg",
        default: "/icons/folder-open-gray.svg",
      },
    },
    {
      title: "بیشتر",
      iconPath: {
        default: "/icons/dots-3-gray.svg",
      },
      onClick: open,
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 grid h-14 grid-cols-5 border-t border-[#37383e] bg-gray-900 p-0 md:hidden">
      {items.map((item) =>
        item.href ? (
          <Link className={classes} key={item.href} href={item.href as string}>
            <ItemContent
              iconPath={item.iconPath}
              title={item.title}
              href={item.href}
            />
          </Link>
        ) : (
          <div
            className="flex items-center justify-center"
            key={item.iconPath.default}
          >
            {isOpen && (
              <MobileNavList
                className="bottom-14 left-1 h-72 overflow-auto"
                close={close}
                theme="dark"
                items={footerModalMenuItems}
                closeOnScroll={false}
              />
            )}
            <button className={classes} onClick={item.onClick}>
              <ItemContent iconPath={item.iconPath} title={item.title} />
            </button>
          </div>
        ),
      )}
    </footer>
  );
}

function ItemContent({ title, iconPath, href }: IItemContent) {
  const pathname = usePathname();

  return (
    <>
      <Image
        width={20}
        height={20}
        alt={title}
        src={
          href
            ? pathname === href
              ? (iconPath.active as string)
              : iconPath.default
            : iconPath.default
        }
      />
      <span
        className={cls(
          pathname === href ? "text-white" : "text-gray-500",
          "text-[10px] leading-4",
        )}
      >
        {title}
      </span>
    </>
  );
}

export default MobileFooter;
