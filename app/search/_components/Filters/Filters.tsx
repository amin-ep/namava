"use client";

import { useSearch } from "@/app/_contexts/SearchContext";
import { categories, countriesArray } from "@/app/_utils/constants";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import SearchFiltersCheckboxList from "./CheckboxList";
import FiltersButton from "./FiltersButton";
import ReleasedYear from "./ReleasedYearDropdown";
import SortDropdownList from "./SortDropdownList";
import cls from "classnames";
import styles from "./Filters.module.css";
import LinkButton from "@/app/_components/LinkButton";
import { IMovie } from "@/app/_types/movieTypes";

type Props = { onClose?: () => void };

type Options = {
  title: string;
  list: React.ReactNode;
  badge?: string | number;
};

function Filters({ onClose }: Props) {
  const [openDropdownName, setOpenDropdownName] = useState<string>("");
  const [filtered, setFiltered] = useState(false);

  const {
    filters,
    reset,
    filterMode,
    submitFilters,
    filterInitialValues,
    movies,
  } = useSearch();

  const isOpen = useCallback(
    (title: Options["title"]) => {
      return title === openDropdownName;
    },
    [openDropdownName],
  );

  const isYearChanged: boolean =
    filters.releasedYear.to !== new Date().getFullYear() ||
    filters.releasedYear.from != 1900;

  const filtersObject = useMemo(() => {
    if (filterMode === "onChange") {
      return filters;
    } else {
      return filterInitialValues;
    }
  }, [filterInitialValues, filterMode, filters]);

  const filterOptions: Options[] = useMemo(() => {
    return [
      {
        title: "ژانرها",
        badge:
          filtersObject.genres!.length > 0 ? filtersObject.genres?.length : "",
        list: ((title) => (
          <SearchFiltersCheckboxList
            type="genre"
            searchPlaceholder="جستجوی ژانرها"
            title="همه ژانرها"
            isOpen={isOpen(title)}
            list={categories}
          />
        ))("ژانرها"),
      },
      {
        title: "کشور سازنده",
        badge:
          filtersObject.countries!.length > 0
            ? filtersObject.countries?.length
            : "",
        list: ((title) => (
          <SearchFiltersCheckboxList
            type="country"
            searchPlaceholder="جستجوی کشورها"
            title="همه کشورها"
            isOpen={isOpen(title)}
            list={countriesArray}
          />
        ))("کشور سازنده"),
      },
      {
        title: "سال ساخت",
        badge: isYearChanged
          ? `${filtersObject.releasedYear.to} - ${filtersObject.releasedYear.from}`
          : "",
        list: ((title) => <ReleasedYear isOpen={isOpen(title)} />)("سال ساخت"),
      },
      {
        title: "مرتب سازی",
        badge: (filtersObject.sortBy === "none"
          ? ""
          : filtersObject.sortBy === "imdbRating"
            ? "امتیاز IMDB"
            : filtersObject.sortBy === "newest"
              ? "سال ساخت (جدیدترین)"
              : filtersObject.sortBy === "oldest"
                ? "سال ساخت (قدیمی ترین)"
                : filtersObject.sortBy === "") as string,
        list: ((title) => <SortDropdownList isOpen={isOpen(title)} />)(
          "مرتب سازی",
        ),
      },
    ];
  }, [filtersObject, isOpen, isYearChanged]);

  useEffect(() => {
    const { releasedYear, sortBy, countries, genres } = filtersObject;
    if (
      countries?.length === 0 &&
      genres?.length === 0 &&
      releasedYear.from === 1900 &&
      releasedYear.to === new Date().getFullYear() &&
      sortBy === "none"
    ) {
      setFiltered(false);
    } else {
      setFiltered(true);
    }
  }, [filtersObject]);

  const handleOpenDropdown = (title: string) => {
    if (title === openDropdownName) {
      setOpenDropdownName("");
    } else {
      setOpenDropdownName(title);
    }
  };

  const handleSubmitFilters = () => {
    submitFilters();
    if (onClose) onClose();
  };

  return (
    <div
      className={cls(
        "w-full rounded-xl bg-gray-700 px-6 py-4 md:w-[18.5rem] xl:w-[307px]",
        (movies as IMovie[])?.length > 0 ? "fixed" : "absolute",
      )}
    >
      <div
        className={cls("max-h-[400px] w-full overflow-auto", styles.container)}
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onClose && (
              <button className="aspect-square w-6" onClick={onClose}>
                <Image
                  src="/icons/chevron-right-white.svg"
                  alt="arrow-right"
                  width={15}
                  height={15}
                />
              </button>
            )}
            <span className="text-white">فیلترها</span>
          </div>
          <button
            className="text-primary-light disabled:text-gray-500"
            disabled={!filtered}
            onClick={reset}
          >
            حذف همه
          </button>
        </div>
        <div className="flex flex-col">
          {filterOptions.map((option) => (
            <React.Fragment key={option.title}>
              <FiltersButton
                badge={option.badge}
                onClick={() => handleOpenDropdown(option.title)}
                isOpen={openDropdownName === option.title}
              >
                {option.title}
              </FiltersButton>
              {option.list}
            </React.Fragment>
          ))}
          {filterMode === "onClick" && (
            <LinkButton
              variation="button"
              color="primary"
              disabled={!filtered}
              buttonType="button"
              onClick={handleSubmitFilters}
            >
              اعمال
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filters;
