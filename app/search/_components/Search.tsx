"use client";

import { useSearch } from "@/app/_contexts/SearchContext";
import Image from "next/image";
import React, { useRef, useState } from "react";

function Search() {
  const [showInputReset, setShowInputReset] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { handleSearch, resetSearch } = useSearch();

  function handleSearchInputChange(e: React.ChangeEvent) {
    handleSearch(e);
    const target = e.target as HTMLInputElement;
    if (target.value.length > 0) {
      setShowInputReset(true);
    } else {
      setShowInputReset(false);
    }
  }

  const handleResetInput = () => {
    inputRef!.current!.value = "";
    resetSearch();
  };

  return (
    <div className="relative flex items-center rounded-xl bg-gray-700 px-4">
      <label htmlFor="search" className="ml-4 flex items-center justify-center">
        <Image
          src="/icons/search-white.svg"
          alt="جستجو"
          width={20}
          height={20}
          className="aspect-square w-5 md:w-7"
        />
      </label>
      <input
        ref={inputRef}
        onChange={handleSearchInputChange}
        id="search"
        type="search"
        autoComplete="off"
        className="h-[42px] w-full rounded-l-xl bg-transparent px-4 py-3 !pr-0 text-right text-xs leading-[21] text-white md:h-[60px] md:px-4 md:py-4 md:text-sm"
      />
      {showInputReset && (
        <button type="button" onClick={handleResetInput}>
          <Image
            src="/icons/times-white.svg"
            alt="times"
            width={20}
            height={20}
            className="aspect-square w-5 md:w-7"
          />
        </button>
      )}
    </div>
  );
}

export default Search;
