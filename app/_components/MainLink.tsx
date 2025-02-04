import Link from "next/link";
import React from "react";

function MainLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-primary-default text-xs font-semibold md:text-sm"
    >
      {children}
    </Link>
  );
}

export default MainLink;
