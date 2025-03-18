"use client";

const speedArr = [0.5, 1, 1.25, 1.5, 2];

import { useVideo } from "@/app/_contexts/VideoContext";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import Image from "next/image";
import { useCallback } from "react";

type Props = { close: () => void };

function VideoSpeedMenu({ close }: Props) {
  const ref = useOutsideClick(close);

  return (
    <div
      className="absolute left-6 top-20 flex w-60 flex-col items-center rounded-lg bg-gray-900 lg:left-8"
      ref={ref as React.RefObject<HTMLDivElement | null>}
    >
      <div className="relative flex w-full border-b border-gray-700 py-3 pl-4 pr-6">
        <span className="mx-auto inline-block text-center text-sm leading-6">
          تنظیم سرعت پخش
        </span>
        <button onClick={close} className="float-left aspect-square w-6">
          <Image
            src="/icons/times-white.svg"
            alt="close"
            width={24}
            height={24}
            className="h-full w-full"
          />
        </button>
      </div>
      {speedArr.map((val) => (
        <RowButton onClose={close} value={val} key={val} />
      ))}
    </div>
  );
}

function RowButton({
  value,
  onClose,
}: {
  value: string | number;
  onClose: () => void;
}) {
  const { changeSpeed, playingSpeed } = useVideo();
  const handleChangeSpeed = useCallback(() => {
    changeSpeed(value as number);
    onClose();
  }, [value, onClose, changeSpeed]);
  return (
    <button
      onClick={handleChangeSpeed}
      className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-white"
    >
      <span>{value}</span>
      {playingSpeed == value && (
        <Image
          src="/icons/mark-nobg-white.svg"
          alt="selected"
          width={24}
          height={24}
          className="w-6"
        />
      )}
    </button>
  );
}

export default VideoSpeedMenu;
