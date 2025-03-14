"use client";

import { usePathname } from "next/navigation";
import React from "react";

type Props = { children: React.ReactNode };

function HeaderActionsIconWrapper({ children }: Props) {
  const pathname = usePathname();

  const disableRoutes = ["/app"];

  if (disableRoutes.includes(pathname)) return;
  else
    return (
      <div className="flex items-center justify-end gap-3 md:gap-5 lg:gap-6">
        {children}
      </div>
    );
}

export default HeaderActionsIconWrapper;
