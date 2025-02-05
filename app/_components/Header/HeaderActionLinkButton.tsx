"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import cls from "classnames";

interface IImage {
  src: string;
  alt: string;
}

interface Props extends IImage {
  variation: "link" | "button";
  href?: string;
  extraStyles?: string;
  onClick?: () => void;
}

function HeaderActionLinkButton({
  variation,
  alt,
  onClick,
  src,
  href,
  extraStyles,
}: Props) {
  const styles = "w-8 aspect-square flex items-center justify-center xl:w-9";
  const imageAttributes = {
    src: src,
    alt: alt,
    width: "32",
    height: "32",
    className: "w-8 xl:w-9",
  };

  switch (variation) {
    case "button":
      return (
        <button className={cls(styles, extraStyles)} onClick={onClick}>
          <Image {...imageAttributes} />
        </button>
      );

    case "link":
      return (
        <Link className={cls(styles, extraStyles)} href={href as string}>
          <Image {...imageAttributes} />
        </Link>
      );
    default:
      return null;
  }
  return <div>HeaderActionLinkButton</div>;
}

export default HeaderActionLinkButton;
