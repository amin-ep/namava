"use client";

import { logout } from "@/app/auth/login-otp/actions";
import cls from "classnames";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  FaFolderOpen,
  FaGift,
  FaPhone,
  FaStar,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { PiPowerFill } from "react-icons/pi";

function UserOptions() {
  const [containerStyle, setContainerStyle] = useState<string>("");
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleContainerStyle = () => {
      if (window.innerWidth <= 500) {
        if (optionsIsOpen) {
          setContainerStyle("translate-x-[unset]");
        } else {
          setContainerStyle("translate-y-full");
        }
      } else {
        if (optionsIsOpen) {
          setContainerStyle("grid");
        } else {
          setContainerStyle("hidden");
        }
      }
    };
    handleContainerStyle();

    window.addEventListener("resize", handleContainerStyle, true);

    return () =>
      window.removeEventListener("resize", handleContainerStyle, true);
  }, [optionsIsOpen, containerStyle]);

  const handleOpenOptions = () => {
    if (window.innerWidth <= 500) {
      setOptionsIsOpen(true);
    } else {
      return;
    }
  };

  useEffect(() => {
    function handleCloseOptions() {
      setOptionsIsOpen(false);
    }

    if (window.innerWidth > 500) {
      window.addEventListener("scroll", handleCloseOptions);

      return () => window.removeEventListener("scroll", handleCloseOptions);
    }
  }, []);

  const handleUserButtonOnHover = () => {
    if (window.innerWidth > 500) {
      setOptionsIsOpen(true);
    } else {
      return;
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 500 && optionsIsOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "unset";
    }
  }, [optionsIsOpen]);

  const handleUserButtonMouseDown = () => {
    setTimeout(() => {
      if (
        window.innerWidth > 500 &&
        ref.current &&
        !ref?.current.matches(":hover")
      ) {
        setOptionsIsOpen(false);
      }
    }, 1000);
  };

  const items: {
    title: string;
    href: string;
    icon: ReactNode;
    onClick?: () => void;
  }[] = [
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
      onClick: () => {},
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

  const handleOnMouseLeave = () => {
    const userButton = document.querySelector("#user-button");
    setTimeout(() => {
      if (
        window.innerWidth > 500 &&
        userButton &&
        !userButton.matches(":hover")
      ) {
        setOptionsIsOpen(false);
      }
    }, 1000);
  };
  return (
    <>
      <button
        id="user-button"
        onClick={handleOpenOptions}
        onMouseEnter={handleUserButtonOnHover}
        onMouseLeave={handleUserButtonMouseDown}
      >
        <Image
          src="/user-icon.png"
          alt="user"
          width={25}
          height={25}
          className="aspect-square w-[30px] rounded-full outline outline-2 outline-offset-2 outline-[#d95c5c] xl:w-9"
        />
      </button>
      <div
        className={cls(
          "fixed bottom-0 left-0 right-0 z-20 grid h-full grid-cols-1 grid-rows-[20%_1fr] transition duration-500 xsm:bottom-[unset] xsm:left-[2.2%] xsm:right-[unset] xsm:top-[60px] xsm:h-[80vh] xsm:max-h-[469px] xsm:w-[272px] xsm:rounded-xl xsm:before:absolute xsm:before:-top-3 xsm:before:left-7 xsm:before:z-20 xsm:before:h-5 xsm:before:w-4 xsm:before:bg-[url('/triangle.svg')] xsm:before:bg-no-repeat xl:top-20",
          containerStyle,
        )}
        ref={ref}
        onMouseLeave={handleOnMouseLeave}
      >
        <div
          className={cls(
            "bg-black/50 transition duration-[1300ms] xsm:hidden",
            optionsIsOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOptionsIsOpen(false)}
        ></div>

        <div className="grid grid-cols-1 grid-rows-[90px_auto]">
          <div className="flex flex-col items-center justify-center gap-[10px] rounded-t-xl bg-[#d95c5c] p-4">
            <p className="text-sm text-white">اشتراک فعالی ندارید.</p>
            <Link
              href="/plans"
              className="w-full rounded-xl bg-white px-5 text-center text-xs leading-[30px] text-[rgb(26,26,26)] shadow-[0_4px_8px_rgba(0,0,0,0.25)] hover:bg-primary hover:text-white"
            >
              خرید اشتراک
            </Link>
          </div>
          <div className="h-[calc(100vh-90px)] overflow-auto bg-white px-3 py-2 text-xs text-black xsm:h-[calc(80vh-90px)] xsm:rounded-b-xl">
            <Link
              href="/profile-list-edit"
              className="flex items-center justify-between border-b border-b-stone-300 py-[10px]"
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/user-icon.png"
                  alt="user"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                {/* <span>{`${userData?.firstName} ${userData?.lastName}`}</span> */}
                <span>بزرگسال</span>
              </div>
              <span className="flex items-center gap-1">
                <IoMdSettings size={20} className="text-stone-400" />
                تنظیمات
              </span>
            </Link>
            <ul className="flex flex-col gap-[15px] py-4">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-start gap-2 hover:text-primary"
                    onClick={item.onClick}
                  >
                    <span className="text-stone-400">{item.icon}</span>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserOptions;
