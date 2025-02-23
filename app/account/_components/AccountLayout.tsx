"use client";

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
  const pathname = usePathname();

  const disableSlideRoutes = [
    "/account/change-password",
    "/account/set-password",
    "/account/edit-email",
  ];

  const disableSideMenu = disableSlideRoutes.includes(pathname);

  return (
    <div
      className={cls(
        "bg-gray-100",
        !disableSideMenu ? "py-20 xsm:px-6 md:py-24 xl:py-28" : "",
      )}
    >
      <HeadingWrapper />
      <div
        className={cls(
          "relative grid grid-cols-1 md:gap-5",
          !disableSideMenu
            ? "md:grid-cols-[16rem_1fr] xl:grid-cols-[17.75rem_1fr]"
            : "",
        )}
      >
        <div className={cls("relative", disableSideMenu && "hidden")}>
          {Side}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default AccountLayout;
