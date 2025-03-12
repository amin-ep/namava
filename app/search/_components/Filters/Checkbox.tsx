"use client";

import { useSearch } from "@/app/_contexts/SearchContext";
import cls from "classnames";
import { useId, useLayoutEffect, useRef, useState } from "react";
import styles from "./Checkbox.module.css";

type Props = {
  label: string;
  onChangeCallback: (e: React.ChangeEvent, label: string) => void;
  filterType?: "genre" | "country";
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

function Checkbox({
  label,
  onChangeCallback,
  filterType,
  checked,
  setChecked,
}: Props) {
  const [checkmarkLength, setCheckmarkLength] = useState<null | number>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const { filters } = useSearch();

  const id = useId();

  const handleToggleChecked = (e: React.ChangeEvent) => {
    onChangeCallback(e, label);
  };

  useLayoutEffect(() => {
    if (filterType) {
      let isChecked: boolean = false;
      if (filterType === "genre") {
        isChecked = filters.genres?.some(
          (el) => el.trim() === label.trim(),
        ) as boolean;
      } else if (filterType === "country") {
        isChecked = filters.countries?.some(
          (el) => el.trim() === label.trim(),
        ) as boolean;
      }
      if (inputRef) {
        if (isChecked) {
          inputRef.current!.checked = true;
          setChecked(true);
        } else {
          inputRef.current!.checked = false;
          setChecked(false);
        }
      }
    }
  }, [filterType, filters, label]);

  return (
    <div className="flex items-center text-white">
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          className={styles.input}
          onChange={handleToggleChecked}
          ref={inputRef}
        />
        <svg
          className={cls(
            styles.checkbox,
            checked ? styles["checkbox-active"] : "",
          )}
          aria-hidden="true"
          viewBox="0 0 17 10"
          fill="none"
        >
          <path
            className={styles["checkbox-path"]}
            d="M1 4.5L5 9L14 1"
            strokeWidth="2"
            stroke={checked ? "#000" : "none"}
            strokeDasharray={checkmarkLength as number}
            strokeDashoffset={checked ? 0 : (checkmarkLength as number)}
            ref={(ref) => {
              if (ref) {
                setCheckmarkLength(ref.getTotalLength());
              }
            }}
          />
        </svg>
      </div>
      <label
        className="cursor-pointer pr-2 text-sm leading-[18px]"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
