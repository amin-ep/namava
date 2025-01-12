"use client";

import { useEffect, useRef } from "react";

export function useOutsideClick(close: () => void) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (
        ref &&
        ref.current &&
        !ref.current.contains(e.target as HTMLElement)
      ) {
        close();
      }
    };
    document.addEventListener("click", handleClose, true);

    return () => document.removeEventListener("click", handleClose, true);
  }, [close]);

  return ref;
}
