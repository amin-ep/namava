import Image from "next/image";
import React from "react";

type Props = { onClose: () => void; title: string };

function PlaylistModalTop({ onClose, title }: Props) {
  return (
    <div className="relative mb-3 h-10 border-b border-gray-500 text-center font-bold leading-[2.7] xsm:mb-[18px] xsm:leading-[1.7] md:mb-[26px] md:h-[50px] md:text-base xl:mb-4 xl:h-14">
      <button className="float-left" onClick={onClose}>
        <Image
          src="/icons/times-white.svg"
          alt="times"
          width={14}
          height={14}
          className="aspect-square w-3.5 md:w-4 xl:w-6"
        />
      </button>
      <span className="text-white">{title}</span>
    </div>
  );
}

export default PlaylistModalTop;
