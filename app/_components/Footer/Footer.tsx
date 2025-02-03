"use client";

import cls from "classnames";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import FooterApplications from "./FooterApplications";
import FooterContent from "./FooterContent";
import FooterFixedList from "./FooterFixedList";
import FooterSocialNetworks from "./FooterSocialNetworks";

function Footer() {
  const [listPosition, setListPosition] = useState("fixed");
  const ref = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleFixedListPosition = () => {
      if (ref && ref.current) {
        if (window.scrollY >= ref.current?.getBoundingClientRect().y) {
          setListPosition("absolute");
        } else {
          setListPosition("fixed");
        }
      }
    };
    window.addEventListener("scroll", handleFixedListPosition);
    handleFixedListPosition();

    return () => {
      window.removeEventListener("scroll", handleFixedListPosition);
    };
  }, []);

  return (
    <div className="relative">
      <FooterFixedList className={listPosition} />
      <footer
        id="footer"
        ref={ref}
        className={cls(
          "hidden w-full bg-[#1A1A1A] px-5 pb-8 pt-14 xl:pb-6 xl:pt-16",
          pathname.split("/")[1] === "account" ? "md:hidden" : "md:block",
        )}
      >
        <div className="mx-auto max-w-[1145px]">
          <FooterApplications />
          <FooterContent />
          <FooterSocialNetworks />
        </div>
      </footer>
    </div>
  );
}

export default Footer;
