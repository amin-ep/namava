"use client";

import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import cls from "classnames";
import Image from "next/image";
import React from "react";

type ButtonProps = {
  title: string;
  alt?: string;
  iconPath?: string;
  extraStyles?: string;
  onClick: () => void;
};

type Props = {
  close: () => void;
  items: ButtonProps[];
  onOutsideClickDisable?: boolean;
  extraStyles?: string;
};

function PlaylistDropdownMenu({
  close,
  items,
  onOutsideClickDisable,
  extraStyles,
}: Props) {
  const ref = useOutsideClick(close, onOutsideClickDisable);

  return (
    <>
      <div
        className={cls(
          "absolute top-full z-20 flex w-[200px] flex-col rounded-xl bg-gray-700 px-3 py-1 text-white shadow-[0_4px_4px_0_rgba(0,0,0,0.2)] md:px-4 md:py-1",
          extraStyles,
        )}
        ref={ref as React.Ref<HTMLDivElement>}
      >
        {items.map((item) => (
          <Button
            alt={item.alt}
            iconPath={item.iconPath}
            onClick={item.onClick}
            title={item.title}
            extraStyles={item.extraStyles}
            key={item.alt}
          />
        ))}
      </div>
    </>
  );
}

function Button({ iconPath, alt, extraStyles, title, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cls(
        "flex items-center justify-between py-2 md:py-3",
        extraStyles,
      )}
    >
      <span className="text-xs font-bold leading-5">{title}</span>
      {alt && iconPath && (
        <Image
          src={`/icons/${iconPath}`}
          alt={alt}
          width={20}
          height={20}
          className="aspect-square w-5 md:w-6"
        />
      )}
    </button>
  );
}

export default PlaylistDropdownMenu;
