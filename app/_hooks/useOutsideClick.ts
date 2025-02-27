"use client";

import { useEffect, useRef } from "react";

export function useOutsideClick(close: () => void) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClose = (e: MouseEvent | TouchEvent) => {
      if (
        ref &&
        ref.current &&
        !ref.current.contains(e.target as HTMLElement)
      ) {
        close();
      }
    };
    document.addEventListener("click", handleClose);
    document.addEventListener("touchstart", handleClose);

    return () => {
      document.removeEventListener("click", handleClose);
      document.removeEventListener("touchstart", handleClose);
    };
  }, [close]);

  return ref;
}
