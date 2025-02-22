"use client";

import { useInView } from "@/app/_hooks/useInView";
import cls from "classnames";
import { usePathname } from "next/navigation";
import FooterApplications from "./FooterApplications";
import FooterContent from "./FooterContent";
import FooterFixedList from "./FooterFixedList";
import FooterSocialNetworks from "./FooterSocialNetworks";
import { useEffect, useState } from "react";
function Footer() {
  const pathname = usePathname();
  const [isVisible, ref] = useInView();

  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    const protectedRoutes = ["/auth"];

    const isPrivate = protectedRoutes.some((route) => {
      return pathname.startsWith(route);
    });

    if (isPrivate) {
      setShowFooter(!isPrivate);
    }
  }, [pathname]);

  if (showFooter)
    return (
      <footer
        className="relative"
        ref={ref as React.Ref<HTMLDivElement> | undefined}
        id="footer"
      >
        <FooterFixedList
          className={
            isVisible && pathname.split("/")[1] !== "account"
              ? "absolute"
              : "fixed"
          }
        />
        <div
          id="footer"
          className={cls(
            "hidden w-full bg-gray-800 px-5 pb-8 pt-14 xl:pb-6 xl:pt-16",
            pathname.split("/")[1] === "account" ? "md:hidden" : "md:block",
          )}
        >
          <div className="mx-auto max-w-[1145px]">
            <FooterApplications />
            <FooterContent />
            <FooterSocialNetworks />
          </div>
        </div>
      </footer>
    );
}

export default Footer;
