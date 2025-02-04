"use client";
import MobileNavList from "@/app/_components/MobileNavList";
import { useModal } from "@/app/_hooks/useModal";
import { MobileNavListItem } from "@/app/_types/globalTypes";
import { useEffect, useState } from "react";
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
  const [headingTitle, setHeadingTitle] = useState("");

  const { close, isOpen, open } = useModal();

  // const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (document) {
      setHeadingTitle(document.title);
    }
  }, []);

  return (
    <div className="relative mb-5 flex items-center justify-center md:hidden">
      <h1 className="text-sm font-bold text-gray-800 xsm:text-base">
        {headingTitle}
      </h1>
      <div className="absolute right-5">
        <button onClick={open} className="aspect-square w-6 text-gray-800">
          {isOpen ? <HiOutlineXMark size={24} /> : <HiOutlineBars3 size={24} />}
        </button>
        {isOpen && (
          <MobileNavList
            closeOnScroll={true}
            items={navItems}
            theme="light"
            close={close}
            className="right-16 top-28"
          />
        )}
      </div>
    </div>
  );
}

export default HeadingWrapper;
