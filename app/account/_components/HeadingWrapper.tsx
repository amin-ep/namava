"use client";
import MobileNavList from "@/app/_components/MobileNavList";
import { MobileNavListItem } from "@/app/_types/GlobalTypes";
import { useEffect, useRef, useState } from "react";
import { FaStar, FaUser } from "react-icons/fa";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { IoIosListBox } from "react-icons/io";

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
function HeadingWrapper() {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [headingTitle, setHeadingTitle] = useState("");

  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (document) {
      setHeadingTitle(document.title);
    }
  }, []);
  useEffect(() => {
    function handleOutsideClick(e: Event) {
      if (
        navIsOpen &&
        listRef &&
        !listRef.current?.contains(e.target as HTMLElement)
      ) {
        setNavIsOpen(false);
      }
    }
    if (listRef) {
      document.addEventListener("click", handleOutsideClick, true);

      return () => document.addEventListener("click", handleOutsideClick, true);
    }
  }, [navIsOpen]);

  return (
    <div className="relative mb-5 flex items-center justify-center md:hidden">
      <h1 className="text-sm font-bold text-stone-700 xsm:text-base">
        {headingTitle}
      </h1>
      <div className="absolute right-5">
        <button
          onClick={() => setNavIsOpen(true)}
          className="aspect-square w-6 text-stone-600"
        >
          {navIsOpen ? (
            <HiOutlineXMark size={24} />
          ) : (
            <HiOutlineBars3 size={24} />
          )}
        </button>
        {navIsOpen && (
          <MobileNavList items={navItems} theme="light" ref={listRef} />
        )}
      </div>
    </div>
  );
}

export default HeadingWrapper;
