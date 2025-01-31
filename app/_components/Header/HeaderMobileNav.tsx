"use client";

import { MobileNavListItem } from "@/app/_types/globalTypes";
import { memo, useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import MobileNavList from "../MobileNavList";
import { usePathname } from "next/navigation";

const HeaderMobileNav = memo(function HeaderMobileNav({
  items,
}: {
  items: MobileNavListItem[];
}) {
  const [buttonTitle, setButtonTitle] = useState<string | null>(null);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const listRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    function handleOutsideClick(e: Event) {
      if (
        menuIsOpen &&
        listRef &&
        !listRef.current?.contains(e.target as HTMLElement)
      ) {
        if (buttonRef?.current?.contains(e.target as HTMLButtonElement)) {
          return;
        } else {
          setMenuIsOpen(false);
        }
      }
    }
    if (listRef) {
      document.addEventListener("click", handleOutsideClick, true);

      return () => document.addEventListener("click", handleOutsideClick, true);
    }
  }, [menuIsOpen]);

  useEffect(() => {
    const pageTitle = items.find(
      (el) => el.href === "/" + pathname.split("/")[1],
    )?.title;

    setButtonTitle(pageTitle as string);
  }, [items, pathname]);

  return (
    <nav className="relative block md:hidden">
      <button
        ref={buttonRef}
        onClick={() => setMenuIsOpen((open) => !open)}
        className="flex h-7 items-center justify-center gap-[6px] whitespace-nowrap rounded-full border border-[rgba(255,255,255,0.3)] bg-[rgba(102,102,102,0.3)] px-3 py-3 text-xs text-white shadow-[0_4px_4px_0_rgba(0,0,0,0.2)]"
      >
        {buttonTitle ?? ""}
        <span>{menuIsOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
      </button>
      {menuIsOpen && <MobileNavList items={items} ref={listRef} theme="dark" />}
    </nav>
  );
});

export default HeaderMobileNav;
