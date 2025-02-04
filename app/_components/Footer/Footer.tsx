"use client";

import { useInView } from "@/app/_hooks/useInView";
import cls from "classnames";
import { usePathname } from "next/navigation";
import FooterApplications from "./FooterApplications";
import FooterContent from "./FooterContent";
import FooterFixedList from "./FooterFixedList";
import FooterSocialNetworks from "./FooterSocialNetworks";

function Footer() {
  const pathname = usePathname();
  const [isVisible, ref] = useInView();

  return (
    <div
      className="relative"
      ref={ref as React.Ref<HTMLDivElement> | undefined}
    >
      <FooterFixedList
        className={
          isVisible && pathname.split("/")[1] !== "account"
            ? "absolute"
            : "fixed"
        }
      />
      <footer
        id="footer"
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
