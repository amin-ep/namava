"use client";

import cls from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
interface ILink {
  title: string;
  href: string;
}

const items: ILink[] = [
  { title: "اپلیکیشن ها", href: "/app" },
  { title: "فرصت‌های شغلی", href: "/" },
  { title: "تبلیغات در نماوا", href: "/pages/commercial/" },
  { title: "خرید اشتراک", href: "/plans" },
  { title: "کارت هدیه", href: "/plans#redeemCard" },
  { title: "سوالات متداول", href: "/faq" },
  { title: "تماس با ما", href: "/contact" },
  { title: "درباره نماوا", href: "/intro" },
];

const linkStyles =
  "text-[10px] text-gray-400 hover:text-white font-semibold base:text-xs";

function FooterFixedList({ className }: { className: string }) {
  const [modalMenuIsOpen, setModalMenuIsOpen] = useState<boolean>(false);
  const id = useId();

  const listItemStyles = "flex w-full items-center justify-center py-2";

  return (
    <div
      className={cls(
        "left-0 right-0 z-10 hidden bg-gray-900 md:block",
        className,
        className === "fixed" ? "bottom-0" : "top-0",
      )}
    >
      {modalMenuIsOpen && (
        <ListModalMenu
          onClose={() => setModalMenuIsOpen(false)}
          isOpen={modalMenuIsOpen}
        />
      )}
      <ul className="grid grid-cols-9 grid-rows-1">
        {items.map((item, index) => (
          <li
            key={`${id}-${item.href?.split("/")[1] ?? String(index)}`}
            className={listItemStyles}
          >
            <Link className={cls(linkStyles, "text-center")} href={item.href}>
              {item.title}
            </Link>
          </li>
        ))}
        <li className={cls(listItemStyles)}>
          <button
            className={cls(
              linkStyles,
              "z-10 flex items-center justify-center gap-2",
            )}
            onClick={() => setModalMenuIsOpen((state) => !state)}
          >
            سایر لینک ها
            <Image
              src="/icons/keyboard-arrow-top-white.svg"
              alt="arrow-top"
              width={12}
              height={7}
              className="w-6"
            />
          </button>
        </li>
      </ul>
    </div>
  );
}

function ListModalMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLUListElement | null>(null);

  const items: ILink[] = [
    { title: "نماوا مگ", href: "/mag" },
    { title: "قوانین", href: "/terms-and-conditions" },
    { title: "شرایط مصرف اینترنت", href: "/internet" },
    { title: "ارسال فیلمنامه", href: "/pages/script" },
  ];

  return (
    <>
      <Overlay onClose={onClose} isOpen={isOpen} />
      <ul
        className={cls(
          "absolute bottom-10 left-8 z-20 flex flex-col bg-gray-900 p-0 transition-all delay-100 duration-500",
        )}
        ref={ref}
      >
        <button
          onClick={onClose}
          className="flex w-full items-center justify-between px-6 py-3 text-center text-[10px] font-semibold text-gray-400 base:text-xs"
        >
          <span className="hover:text-white">سایر لینک ها</span>
          <Image
            src="/icons/keyboard-arrow-down-white.svg"
            alt="arrow-top"
            width={12}
            height={7}
            className="w-6"
          />
        </button>
        {items.map((item) => (
          <li key={item.href} className="grid px-6 py-3">
            <Link
              href={item.href}
              className={cls(linkStyles, "w-full text-right")}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function Overlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (document && isOpen) {
      const body = document.body;
      const documentHeight = Math.max(body.scrollHeight);
      const footer = document.getElementById("footer");
      const header = document.getElementById("header");
      const footerHeight = footer?.getBoundingClientRect().height;
      const headerHeight = header?.getBoundingClientRect().height;
      const overlayHeight =
        documentHeight - (headerHeight as number) - (footerHeight as number);
      if (ref && ref.current) {
        ref.current.style.height = `${overlayHeight}px`;
        ref.current.style.top = `${headerHeight}px`;
        ref.current.style.bottom = `${footerHeight}px`;
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;
  else if (isOpen && document)
    return createPortal(
      <div
        onClick={onClose}
        ref={ref}
        className="absolute left-0 right-0 z-0 w-full bg-black/85"
      ></div>,
      document.body,
    );
}

export default FooterFixedList;
