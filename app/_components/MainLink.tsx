import Link from "next/link";
import React from "react";
import cls from "classnames";

function MainLink({
  href,
  children,
  boldLevel = "normal",
  extraStyles,
}: {
  href: string;
  children: React.ReactNode;
  boldLevel?:
    | "bold"
    | "thin"
    | "extraLight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extra-bold";
  extraStyles?: string;
}) {
  return (
    <Link
      href={href}
      className={cls(
        "text-xs text-primary-default md:text-sm",
        `font-${boldLevel}`,
        extraStyles,
      )}
    >
      {children}
    </Link>
  );
}

export default MainLink;
