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
    <Link href={href} className="text-xs font-semibold text-primary md:text-sm">
      {children}
    </Link>
  );
}

export default MainLink;
