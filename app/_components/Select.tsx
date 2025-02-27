"use client";

import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styles from "./Select.module.css";
import cls from "classnames";

function Select({
  placeholder,
  items,
  value,
  isOpen,
  onOpen,
  close,
  onClick,
  variation = "primary",
}: {
  placeholder: string;
  items: string[];
  value: string;
  isOpen: boolean;
  onOpen: () => void;
  close: () => void;
  onClick: (e?: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  variation?: "primary" | "secondary";
}) {
  const ref = useOutsideClick(close);

  const classes: { [k: string]: { primary: string; secondary: string } } = {
    btn: {
      primary:
        "h-10 w-full rounded-xl border border-gray-300 px-4 text-gray-400 disabled:cursor-default xsm:h-[52px]",
      secondary:
        "text-sm h-10 w-[160px] w-full px-2 py-3 leading-5 rounded-xl bg-gray-400",
    },
    btnLabel: {
      primary: "text-gray-800",
      secondary: "text-gray-800",
    },
    icon: {
      primary: "text-xl text-gray-800",
      secondary: "text-lg text-gray-600",
    },
    list: {
      primary:
        "absolute top-11 z-20 h-48 w-full overflow-y-auto rounded-xl border border-stone-300 bg-white xsm:top-14 md:h-60",
      secondary:
        "rounded-xl bg-gray-400 w-[160px] overflow-y-auto mt-[2px] max-h-64",
    },
    listItem: {
      primary:
        "cursor-pointer bg-transparent p-3 text-right text-base text-gray-800 hover:bg-gray-200",
      secondary: "cursor-pointer px-2 py-1 text-gray-800",
    },
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        className={cls(
          classes.btn[variation],
          "flex items-center justify-between",
        )}
        onClick={onOpen}
      >
        <div>
          {value.length > 0 ? (
            <span className={classes.btnLabel[variation]}>{value}</span>
          ) : (
            <span>{placeholder}</span>
          )}
        </div>
        <span className={classes.icon[variation]}>
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </button>
      <div>
        {isOpen && (
          <ul
            ref={ref as React.RefObject<HTMLUListElement | null>}
            className={cls(
              classes.list[variation],
              variation === "secondary" && styles.list,
            )}
          >
            {items.map((item) => (
              <li
                className={classes.listItem[variation]}
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
