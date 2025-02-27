"use client";

import { useSearch } from "@/app/_contexts/SearchContext";
import Filters from "./Filters/Filters";
import cls from "classnames";
import { useEffect, useRef, useState } from "react";

function FilterModal() {
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const { modalIsOpen, closeModal } = useSearch();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleContainerWidth() {
      if (ref && ref.current) {
        setContainerWidth(ref.current.getBoundingClientRect().width);
      }
    }

    window.addEventListener("resize", handleContainerWidth);
    handleContainerWidth();
    return () => window.removeEventListener("resize", handleContainerWidth);
  }, []);

  return (
    <div
      style={{
        transform: !modalIsOpen
          ? `translate(${containerWidth}px, 0)`
          : "translate(0, 0)",
      }}
      ref={ref}
      className={cls("fixed inset-0 z-40 bg-gray-700 transition duration-500")}
    >
      <Filters onClose={closeModal} />
    </div>
  );
}

export default FilterModal;
