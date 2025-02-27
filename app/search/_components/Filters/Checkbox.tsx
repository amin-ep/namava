"use client";

import cls from "classnames";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./Checkbox.module.css";
import { useSearch } from "@/app/_contexts/SearchContext";

type Props = {
  label: string;
  onChangeCallback: (e: React.ChangeEvent, label: string) => void;
  filterType: "genre" | "country";
};

function Checkbox({ label, onChangeCallback, filterType }: Props) {
  const [isChecked, setIsChecked] = useState(false);
  const [checkmarkLength, setCheckmarkLength] = useState<null | number>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const { filters } = useSearch();

  const id = useId();

  const handleToggleChecked = (e: React.ChangeEvent) => {
    onChangeCallback(e, label);
  };

  useEffect(() => {
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
        setIsChecked(true);
      } else {
        inputRef.current!.checked = false;
        setIsChecked(false);
      }
    }
  }, [filterType, filters, label]);

  return (
    <div className="flex items-center gap-2 text-white">
      <div>
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
            isChecked ? styles["checkbox-active"] : "",
          )}
          aria-hidden="true"
          viewBox="0 0 17 10"
          fill="none"
        >
          <path
            className={styles["checkbox-path"]}
            d="M1 4.5L5 9L14 1"
            strokeWidth="2"
            stroke={isChecked ? "#000" : "none"}
            strokeDasharray={checkmarkLength as number}
            strokeDashoffset={isChecked ? 0 : (checkmarkLength as number)}
            ref={(ref) => {
              if (ref) {
                setCheckmarkLength(ref.getTotalLength());
              }
            }}
          />
        </svg>
      </div>
      <label className="cursor-pointer text-sm leading-[18px]" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
