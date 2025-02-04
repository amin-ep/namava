"use client";

import { useModal } from "@/app/_hooks/useModal";
import { MobileNavListItem } from "@/app/_types/globalTypes";
import { usePathname } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import MobileNavList from "../MobileNavList";

const HeaderMobileNav = memo(function HeaderMobileNav({
  items,
}: {
  items: MobileNavListItem[];
}) {
  const [buttonTitle, setButtonTitle] = useState<string | null>(null);

  const { close, isOpen, open } = useModal();

  const pathname = usePathname();

  useEffect(() => {
    const pageTitle = items.find(
      (el) => el.href === "/" + pathname.split("/")[1],
    )?.title;

    setButtonTitle(pageTitle as string);
  }, [items, pathname]);

  return (
    <nav className="relative block md:hidden">
      <button
        onClick={open}
        className="flex h-7 items-center justify-center gap-[6px] whitespace-nowrap rounded-2xl border border-[rgba(255,255,255,0.3)] bg-[rgba(102,102,102,0.3)] px-3 py-1 text-xs text-white shadow-[0_4px_4px_0_rgba(0,0,0,0.2)] xsm:py-4"
      >
        {buttonTitle ?? ""}
        <span>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
      </button>
      {isOpen && (
        <MobileNavList
          closeOnScroll={true}
          close={close}
          className=""
          items={items}
          theme="dark"
        />
      )}
    </nav>
  );
});

export default HeaderMobileNav;
