"use client";

import React, { useCallback, useEffect, useState } from "react";
import Checkbox from "../../../_components/Checkbox/Checkbox";
import DropDownContainer from "./DropdownContainer";
import cls from "classnames";
import { useSearch } from "@/app/_contexts/SearchContext";

type List = { title: string };

type Props = {
  isOpen: boolean;
  list: List[];
  title: string;
  searchPlaceholder: string;
  type: "genre" | "country";
};

function CheckboxList({ isOpen, list, title, searchPlaceholder, type }: Props) {
  const [searchItem, setSearchItem] = useState("");
  const [filteredItems, setFilteredItems] = useState<Props["list"]>(list);

  const {
    handleAddGenre,
    handleAddCountry,
    handleRemoveCountry,
    handleRemoveGenre,
  } = useSearch();

  const handleSearchOnChange = useCallback((e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSearchItem(target.value);
  }, []);

  useEffect(() => {
    if (searchItem.length > 0) {
      const items = list.filter((item) => item.title.includes(searchItem));
      setFilteredItems(items);
    } else {
      setFilteredItems(list);
    }
  }, [list, searchItem]);

  const handleCheckboxChange = (e: React.ChangeEvent, label: string) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      if (type === "country") {
        handleAddCountry(label);
      }
      if (type === "genre") {
        handleAddGenre(label);
      }
    } else {
      if (type === "country") {
        handleRemoveCountry(label);
      }
      if (type === "genre") {
        handleRemoveGenre(label);
      }
    }
  };

  return (
    <div
      className={cls(
        "transition-all duration-300",
        !isOpen ? "max-h-0 overflow-hidden" : "max-h-[424px]",
      )}
    >
      <SearchInput
        placeholder={searchPlaceholder}
        onChange={handleSearchOnChange}
      />
      <DropDownContainer isOpen={isOpen}>
        <div>
          <p className="text-right text-sm text-gray-400">{title}</p>
        </div>
        {filteredItems.map((item) => (
          <FilterCheckbox
            filterType={type}
            label={item.title}
            onChange={handleCheckboxChange}
            key={item.title}
          />
        ))}
      </DropDownContainer>
    </div>
  );
  function SearchInput({
    placeholder,
    onChange,
  }: {
    placeholder: string;
    onChange: (e: React.ChangeEvent) => void;
  }) {
    return (
      <input
        type="search"
        className="mb-2 h-10 w-full rounded-xl bg-gray-300 px-4 py-2 leading-6 placeholder:text-gray-800"
        placeholder={placeholder}
        onChange={onChange}
      />
    );
  }
}

function FilterCheckbox({
  onChange,
  label,
  filterType,
}: {
  onChange: (e: React.ChangeEvent, label: string) => void;
  label: string;
  filterType: "genre" | "country" | undefined;
}) {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      onChangeCallback={onChange}
      label={label}
      filterType={filterType}
      setChecked={setChecked}
      checked={checked}
    />
  );
}

export default CheckboxList;
