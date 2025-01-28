"use client";

import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Select({
  placeholder,
  items,
  value,
  isOpen,
  onOpen,
  close,
  onClick,
}: {
  placeholder: string;
  items: string[];
  value: string;
  isOpen: boolean;
  onOpen: () => void;
  close: () => void;
  onClick: (e?: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}) {
  const ref = useOutsideClick(close);

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="flex h-10 w-full items-center justify-between rounded-xl border border-stone-300 px-4 text-stone-400 disabled:cursor-default xsm:h-[52px]"
        onClick={onOpen}
      >
        <div>
          {value.length > 0 ? (
            <span className="text-stone-800">{value}</span>
          ) : (
            <span>{placeholder}</span>
          )}
        </div>
        <span className="text-xl text-stone-700">
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </button>
      <div>
        {isOpen && (
          <ul
            ref={ref as React.RefObject<HTMLElement | null> | undefined}
            className="absolute top-11 z-20 h-48 w-full overflow-y-auto rounded-xl border border-stone-300 bg-white xsm:top-14 md:h-60"
          >
            {items.map((item) => (
              <li
                className="cursor-pointer bg-transparent p-3 text-right text-base text-stone-900 hover:bg-stone-200"
                key={item}
                onClick={onClick}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Select;
