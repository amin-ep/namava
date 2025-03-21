"use client";

import Image from "next/image";

type Props = { onClick: () => void; iconPath: string; alt: string };

function VideoControlButton({ alt, iconPath, onClick }: Props) {
  return (
    <button
      className="flex aspect-square w-8 cursor-pointer items-center justify-center rounded-full hover:bg-white/20 lg:w-12"
      onClick={onClick}
    >
      <Image
        src={iconPath}
        alt={alt}
        width={32}
        height={32}
        className="w-full"
      />
    </button>
  );
}

export default VideoControlButton;
