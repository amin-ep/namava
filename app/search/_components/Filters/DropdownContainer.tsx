import React, { ReactNode } from "react";
import cls from "classnames";
import styles from "./DropdownContainer.module.css";

type Props = { isOpen: boolean; children: ReactNode };

function DropDownContainer({ isOpen, children }: Props) {
  return (
    <div
      className={cls(
        "flex flex-col gap-4 transition-all duration-300",
        isOpen ? "max-h-96 overflow-auto pb-4" : "max-h-0 overflow-hidden",
        styles.container,
      )}
    >
      {children}
    </div>
  );
}

export default DropDownContainer;
