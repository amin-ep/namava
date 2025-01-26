"use client";

import { useEffect, useMemo, useState } from "react";
import HeadingWrapper from "./HeadingWrapper";
import { usePathname } from "next/navigation";
import cls from "classnames";

function AccountLayout({
  children,
  Side,
}: {
  children: React.ReactNode;
  Side: React.ReactNode;
}) {
  const [showSideMenu, setShowSideMenu] = useState<boolean | null>(null);
  const unusedRoutes = useMemo(() => {
    return ["change-password", "set-password", "edit-email"];
  }, []);
  const pathname = usePathname();

  useEffect(() => {
    for (let i = 0; i < unusedRoutes.length; i++) {
      if (pathname.split("/").includes(unusedRoutes[i])) {
        setShowSideMenu(false);
        break;
      } else {
        setShowSideMenu(true);
      }
    }
  }, [pathname, unusedRoutes]);

  return (
    <div
      className={cls(
        "bg-[#f2f2f2]",
        showSideMenu ? "py-20 xsm:px-6 md:py-24 xl:py-28" : "",
      )}
    >
      <HeadingWrapper />
      <div
        className={cls(
          "relative grid grid-cols-1 md:gap-5",
          showSideMenu
            ? "md:grid-cols-[16rem_1fr] xl:grid-cols-[17.75rem_1fr]"
            : "",
        )}
      >
        {showSideMenu && <div className="relative">{Side}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default AccountLayout;
