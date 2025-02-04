"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import cls from "classnames";

function Header({ children }: { children: ReactNode }) {
  const [showHeader, setShowHeader] = useState(true);
  const [latestScrollY, setLatestScrollY] = useState(0);
  const ref = useRef<HTMLElement | null>(null);

  const pathname = usePathname();

  const handleScroll: () => void = useCallback(() => {
    const currentScrollY: number = window.scrollY;
    setLatestScrollY(currentScrollY);
    if (ref && ref.current) {
      // if (pathname.split("/")[1] !== "account") { // FIXME
      if (currentScrollY > latestScrollY) {
        if (pathname.split("/")[1] !== "account") {
          ref.current.style.top = "-80px";
          ref.current.classList.remove("header-scrolled-down");
          ref.current.classList.add("header-scrolled-up");
        }
      } else if (currentScrollY === 0) {
        ref.current.style.top = "0";
        if (pathname.split("/")[1] !== "account") {
          ref.current.style.boxShadow = "unset";
          ref.current.style.backgroundColor = "unset";
        }
      } else if (currentScrollY < latestScrollY) {
        ref.current.style.top = "0";
        ref.current.style.backgroundColor = "rgba(18, 18, 18, 1)";
        ref.current.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.3)";
        if (pathname.split("/")[1] !== "account") {
          ref.current.classList.remove("header-scrolled-up");
          ref.current.classList.add("header-scrolled-down");
        }
      }
    }
    // }
  }, [latestScrollY, pathname]);

  useEffect(() => {
    const disableRoutes: string[] = [
      "/auth/login",
      "/auth/login-otp",
      "/auth/register",
      "/account/change-password",
      "/account/set-password",
      "/auth/recover",
    ];

    for (let i = 0; i < disableRoutes.length; i++) {
      if (disableRoutes[i] === pathname) {
        setShowHeader(false);
        break;
      } else {
        setShowHeader(true);
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (showHeader) {
      handleScroll();
      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll, showHeader]);

  if (showHeader)
    return (
      <header
        id="header"
        className={cls(
          "fixed left-0 right-0 z-30 flex h-[60px] items-center justify-between bg-gradient-to-b from-[rgba(18,18,18,1)] to-[rgba(18,18,18,0)] px-5 xsm:px-6 md:px-8 lg:px-11 xl:h-20",
          pathname.split("/")[1] === "account" ? "bg-gray-950" : "",
        )}
        ref={ref}
      >
        {children}
      </header>
    );
  else return null;
}

export default Header;
