"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import cls from "classnames";
import styles from "./Header.module.css";
import HeaderAppPageLeftSection from "./HeaderAppPageLeftSection";

function Header({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef<number>(0);
  const pathname = usePathname();

  const disableRoutes: string[] = useMemo(() => {
    return [
      "/auth/login",
      "/auth/login-otp",
      "/auth/register",
      "/account/change-password",
      "/account/set-password",
      "/auth/recover",
    ];
  }, []);

  const dynamicDisableRoutes = useMemo(() => {
    return ["play"];
  }, []);

  useEffect(() => {
    if (
      disableRoutes.includes(pathname) ||
      dynamicDisableRoutes.includes(pathname.split("/")[1])
    )
      return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 0);
      setHidden(currentScrollY > lastScrollY.current && currentScrollY > 50);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <header
      id="header"
      className={cls(
        "fixed left-0 right-0 z-30 flex h-[60px] items-center justify-between px-5 xsm:px-6 md:px-8 lg:px-11 xl:h-20",
        pathname.split("/")[1] === "account"
          ? "bg-gray-950 shadow-[0_5px_10px_rgba(0,0,0,0.3)]"
          : "",
        hidden ? styles.hidden : styles.shown,
        scrolled ? styles.scrolled : styles.static,
        (disableRoutes.includes(pathname) ||
          dynamicDisableRoutes.includes(pathname.split("/")[1])) &&
          "hidden",
      )}
    >
      {children}
      {pathname === "/app" && <HeaderAppPageLeftSection />}
    </header>
  );
}

export default Header;
