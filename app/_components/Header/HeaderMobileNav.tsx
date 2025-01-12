"use client";

import { MobileNavListItem } from "@/app/_types/GlobalTypes";
import { memo, useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import MobileNavList from "../MobileNavList";

const HeaderMobileNav = memo(function HeaderMobileNav({
  items,
}: {
  items: MobileNavListItem[];
}) {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const listRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

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

  return (
    <nav className="relative block md:hidden">
      <button
        ref={buttonRef}
        onClick={() => setMenuIsOpen((open) => !open)}
        className="flex h-7 w-16 items-center justify-center gap-[6px] whitespace-nowrap rounded-full border border-[rgba(255,255,255,0.3)] bg-[rgba(102,102,102,0.3)] px-1 py-3 text-xs text-white shadow-[0_4px_4px_0_rgba(0,0,0,0.2)]"
      >
        خانه
        <span>{menuIsOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
      </button>
      {menuIsOpen && <MobileNavList items={items} ref={listRef} theme="dark" />}
    </nav>
  );
});

export default HeaderMobileNav;
