"use client";

import { PiTrashSimpleDuotone } from "react-icons/pi";

interface Label {
  title: string;
  optionalTitle: string;
}

export default function SelectLabel({
  label,
  onClick,
}: {
  label: Label;
  onClick?: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-right text-xs font-normal text-gray-950 md:text-sm">
        {label.title}
        {label.optionalTitle && (
          <span className="text-gray-400"> ({label.optionalTitle})</span>
        )}
      </div>
      {onClick && (
        <button type="button" className="text-gray-500" onClick={onClick}>
          <PiTrashSimpleDuotone size={20} />
        </button>
      )}
    </div>
  );
}
