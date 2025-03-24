import { logout } from "@/app/auth/login-otp/actions";
import Link from "next/link";
import React, { useMemo } from "react";
import {
  FaFolderOpen,
  FaGift,
  FaPhone,
  FaStar,
  FaUser,
  FaUsers,
} from "react-icons/fa6";
import { PiPowerFill } from "react-icons/pi";
import styles from "./UserOptionsMenu.module.css";
import cls from "classnames";

function UserOptionsMenu() {
  const items: {
    title: string;
    href: string;
    icon: React.ReactNode;
    onClick?: () => void;
  }[] = useMemo(() => {
    return [
      {
        title: "لیست ها",
        icon: <FaFolderOpen size={20} />,
        href: "/playlists",
      },
      {
        title: "خرید اشتراک",
        icon: <FaStar size={20} />,
        href: "/plans",
      },
      {
        title: "کارت هدیه",
        icon: <FaGift size={20} />,
        href: "/plans#redeemCard",
      },
      {
        title: "دعوت از دوستان",
        icon: <FaUsers size={20} />,
        href: "/referral",
      },
      {
        title: "حساب کاربری شما",
        icon: <FaUser size={20} />,
        href: "/account",
      },
      {
        title: "تماس با ما",
        icon: <FaPhone size={20} />,
        href: "/contact",
      },
      {
        title: "خروج از حساب کاربری",
        icon: <PiPowerFill size={20} />,
        href: "/home",
        onClick: logout,
      },
    ];
  }, []);

  return (
    <div className="h-[calc(100vh-90px)] overflow-auto px-3 py-2 text-xs text-gray-800 xsm:h-[250px] xsm:rounded-b-xl">
      <ul className="flex flex-col gap-[15px]">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cls(
                "flex items-center justify-start gap-2 hover:text-primary-default",
                styles.item,
              )}
              {...(item.onClick && { onClick: item.onClick })}
            >
              <span>{item.icon}</span>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserOptionsMenu;
