"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function PrevPageButton() {
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const splittedPathname = pathname.split("/");
    const ableRoutes = ["account", "search"];

    if (!ableRoutes.includes(splittedPathname[1])) {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  }, [pathname]);

  return (
    <>
      {showButton && (
        <button
          onClick={() => {
            router.back();
          }}
          className="md:hidden"
        >
          <Image
            className="block aspect-square w-10 md:hidden"
            src="/icons/keyboard-arrow-right.svg"
            alt="arrow-right"
            width={24}
            height={24}
          />
        </button>
      )}
    </>
  );
}

export default PrevPageButton;
