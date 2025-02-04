"use client";

import { useState } from "react";

export function useModal(defaultIsOpen: boolean | undefined = false) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  const toggle = () => setIsOpen((state) => !state);

  return { isOpen, open, close, toggle };
}
