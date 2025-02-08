"use client";

import cls from "classnames";
import Link from "next/link";

interface Props {
  variation: "link" | "button";
  buttonType?: "button" | "submit";
  color: "primary" | "white" | "glassy";
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
  extraStyles?: string;
  isPending?: boolean;
  disabled?: boolean;
  linkTarget?: React.HTMLAttributeAnchorTarget;
  linkDownload?: string;
}

function LinkButton({
  color = "primary",
  variation,
  href,
  onClick,
  children,
  extraStyles,
  buttonType = "button",
  isPending,
  disabled = false,
  linkTarget,
  linkDownload,
}: Props) {
  const buttonStyles: { [k: string]: string } = {
    primary: "bg-primary-default text-white",
    glassy:
      " gap-[2px] bg-[rgba(255,255,255,0.2)] text-xs text-white hover:bg-[rgba(255,255,255,0.4)] disabled:cursor-not-allowed",
    white: "bg-white text-gray-900 hover:bg-primary-default hover:text-white",
  };

  const classes = cls(
    "flex h-[42px] cursor-pointer items-center justify-center rounded-xl px-5 text-xs leading-[42px]",
    extraStyles,
    !isPending
      ? "disabled:cursor-default disabled:bg-gray-400"
      : "disabled:cursor-default",
    buttonStyles[color],
  );

  if (variation === "button") {
    return (
      <button
        disabled={disabled}
        type={buttonType}
        {...(onClick && { onClick: onClick })}
        className={classes}
      >
        {children}
      </button>
    );
  } else if (variation === "link") {
    return (
      <Link
        {...(linkTarget && { target: linkTarget })}
        href={href as string}
        className={classes}
        {...(linkDownload && { download: linkDownload })}
      >
        {children}
      </Link>
    );
  }
  return <div>LinkButton</div>;
}

export default LinkButton;
