"use client";

import Select from "@/app/_components/Select";
import { useSearch } from "@/app/_contexts/SearchContext";
import { useSelect } from "@/app/_hooks/useSelect";
import { georgianYearsArray } from "@/app/_utils/constants";
import React from "react";
import DropDownContainer from "./DropdownContainer";

type Props = { isOpen: boolean };

function ReleasedYear({ isOpen }: Props) {
  const {
    filterMode,
    handleReleasedYearFrom,
    handleReleasedYearUntil,
    filters,
  } = useSearch();
  const {
    close: closeFromSelect,
    isOpen: fromSelectIsOpen,
    toggle: toggleFromSelect,
    updateValue: updateFromValue,
    value: fromValue,
  } = useSelect(filters.releasedYear.from === 1900 ? "1900" : undefined);

  const currentYear = new Date().getFullYear();

  const {
    close: closeUntilSelect,
    isOpen: untilSelectIsOpen,
    toggle: toggleUntilSelect,
    updateValue: updateUntilSelect,
    value: untilValue,
  } = useSelect(
    filters.releasedYear.to === currentYear
      ? currentYear.toString()
      : undefined,
  );

  const handleClickFromSelect: (
    e?: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => void = (e) => {
    const textContent = (e?.target as HTMLLIElement).textContent;
    updateFromValue(textContent as string);
    if (filterMode === "onChange") {
      handleReleasedYearFrom(Number(textContent));
    }
    closeFromSelect();
  };

  const handleClickUntilSelect: (
    e?: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => void = (e) => {
    const textContent = (e?.target as HTMLLIElement).textContent;
    updateUntilSelect(textContent as string);
    if (filterMode === "onChange") {
      handleReleasedYearUntil(Number(textContent));
    }
    closeUntilSelect();
  };

  const selectWrapperStyles = "flex flex-row items-start gap-6 text-white";
  const selectTitleStyles = "flex h-8 w-3 items-center";

  return (
    <DropDownContainer isOpen={isOpen}>
      <div className="flex flex-col gap-3">
        <div className={selectWrapperStyles}>
          <span className={selectTitleStyles}>از</span>
          <Select
            close={closeFromSelect}
            items={georgianYearsArray}
            onOpen={toggleFromSelect}
            isOpen={fromSelectIsOpen}
            placeholder=""
            value={fromValue}
            onClick={handleClickFromSelect}
            variation="secondary"
          />
        </div>
        <div className={selectWrapperStyles}>
          <span className={selectTitleStyles}>تا</span>
          <Select
            close={closeUntilSelect}
            items={georgianYearsArray}
            onOpen={toggleUntilSelect}
            isOpen={untilSelectIsOpen}
            placeholder=""
            value={untilValue}
            onClick={handleClickUntilSelect}
            variation="secondary"
          />
        </div>
      </div>
    </DropDownContainer>
  );
}

export default ReleasedYear;
