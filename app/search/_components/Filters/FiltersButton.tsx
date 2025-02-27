"use client";

import Image from "next/image";
import React from "react";
import cls from "classnames";

type Props = {
  children: React.ReactNode;
  isOpen?: boolean;
  onClick: () => void;
  badge?: string | number;
};

export default function FiltersButton({
  children,
  isOpen,
  onClick,
  badge,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="border-gray flex justify-between border-t border-t-gray-500 py-3 text-white"
    >
      <div className="flex items-center gap-3">
        <span className="text-sm">{children}</span>
        {badge && (
          <span className="rounded-md bg-primary-default px-2 text-xs leading-[21px] text-white">
            {badge}
          </span>
        )}
      </div>
      <Image
        src="/icons/keyboard-arrow-down-white.svg"
        alt="arrow"
        width={12}
        height={7}
        className={cls(isOpen && "rotate-180", "w-7")}
      />
    </button>
  );
}
