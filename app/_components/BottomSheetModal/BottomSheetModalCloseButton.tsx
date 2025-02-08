"use client";

import Image from "next/image";
import React from "react";

function BottomSheetModalCloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button onClick={onClose} className="absolute right-0 top-0">
      <Image
        src="/icons/keyboard-arrow-down-white.svg"
        alt="arrow-down"
        width={24}
        height={24}
      />
    </button>
  );
}

export default BottomSheetModalCloseButton;
