"use client";

import { useSelect } from "@/app/_hooks/useSelect";
import { jMonthIndex, numericJalaaliDate } from "@/app/_utils/helpers";
import jalaali, { GregorianDateObject } from "jalaali-js";
import { memo, useEffect, useMemo, useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import Select from "../../../_components/Select/Select";
import SelectLabel from "./SelectLabel";
import { jalaaliMonths } from "@/app/_utils/constants";

const BirthDaySelectGroup = memo(function BirthDaySelectGroup<
  TFormValues extends FieldValues,
>({
  control,
  name,
  defaultDate,
  validation,
}: {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  defaultDate: Date | string | undefined;
  validation: RegisterOptions<TFormValues, Path<TFormValues>> | undefined;
}) {
  const [defaultBirthDateObject, setDefaultBirthDateObject] = useState<{
    year: null | string | number;
    month: null | string | number;
    day: null | string | number;
  }>({
    day: null,
    month: null,
    year: null,
  });

  useEffect(() => {
    if (defaultDate) {
      const numericBirthDate = numericJalaaliDate(new Date(defaultDate));
      const numericBirthDateArr = numericBirthDate.split("/");
      setDefaultBirthDateObject({
        year: numericBirthDateArr.at(0) as string,
        month: jalaaliMonths()[+(numericBirthDateArr.at(1) as string) - 1],
        day: numericBirthDateArr.at(2) as string,
      });
    }
  }, [defaultDate]);

  const daysArr = useMemo(() => {
    return [...Array(32).keys()].map(Number.call, String).slice(1, 32);
  }, []);

  const months: string[] = useMemo(() => {
    return jalaaliMonths();
  }, []);

  const years = useMemo(() => {
    return Array.from(
      { length: (1403 - 1300) / 1 + 1 },
      (_value, index) => 1300 + index * 1,
    )
      .map((el) => el.toString())
      .reverse();
  }, []);

  // Day select
  const {
    close: closeDaySelect,
    isOpen: dayIsOpen,
    updateValue: updateDayValue,
    value: dayValue,
    toggle: toggleDaySelect,
  } = useSelect((defaultBirthDateObject?.day as string) ?? "");

  // Month select
  const {
    close: closeMonthSelect,
    isOpen: monthIsOpen,
    updateValue: updateMonthValue,
    value: monthValue,
    toggle: toggleMonthSelect,
  } = useSelect((defaultBirthDateObject?.month as string) ?? undefined);

  // Year select
  const {
    close: closeYearSelect,
    isOpen: yearIsOpen,
    updateValue: updateYearValue,
    value: yearValue,
    toggle: toggleYearSelect,
  } = useSelect((defaultBirthDateObject.year as string) ?? undefined);

  // day select click
  const handleClickDay = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.target as HTMLLIElement;
    updateDayValue(target.textContent!);
    closeDaySelect();
  };

  // month select click
  const handleClickMonth = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.target as HTMLLIElement;
    updateMonthValue(target.textContent!);
    closeMonthSelect();
  };

  // year select click
  const handleClickYear = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.target as HTMLLIElement;
    updateYearValue(target.textContent!);
    closeYearSelect();
  };

  // set value of birthDate

  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({ field }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if (yearValue && dayValue && monthValue) {
            const birthDateObj: GregorianDateObject = jalaali.toGregorian(
              +yearValue,
              +jMonthIndex(monthValue) + 1,
              +dayValue,
            );

            const georgianBirthDateString = new Date(
              birthDateObj.gy,
              birthDateObj.gm - 1,
              birthDateObj.gd,
            ).toISOString();

            // Update the form value
            field.onChange(georgianBirthDateString);
          }
        }, [field, yearValue, dayValue, monthValue]);

        return (
          <div className="flex flex-col gap-2">
            <SelectLabel
              label={{ title: "تاریخ تولد", optionalTitle: "اختیاری" }}
              onClick={() => {
                updateDayValue("");
                updateMonthValue("");
                updateYearValue("");
                field.onChange(""); // Clear the field value
              }}
            />
            <div className="grid grid-cols-3 gap-x-2">
              <Select
                onClick={(e) => {
                  handleClickDay(
                    e as React.MouseEvent<HTMLLIElement, MouseEvent>,
                  );
                }}
                isOpen={dayIsOpen}
                onOpen={toggleDaySelect}
                value={dayValue}
                items={daysArr as string[]}
                placeholder="روز"
                close={closeDaySelect}
              />
              <Select
                onClick={(e) => {
                  handleClickMonth(
                    e as React.MouseEvent<HTMLLIElement, MouseEvent>,
                  );
                }}
                isOpen={monthIsOpen}
                onOpen={toggleMonthSelect}
                value={monthValue}
                items={months as string[]}
                placeholder="ماه"
                close={closeMonthSelect}
              />
              <Select
                onClick={(e) => {
                  handleClickYear(
                    e as React.MouseEvent<HTMLLIElement, MouseEvent>,
                  );
                }}
                isOpen={yearIsOpen}
                onOpen={toggleYearSelect}
                value={yearValue}
                close={closeYearSelect}
                items={years as string[]}
                placeholder="سال"
              />
            </div>
          </div>
        );
      }}
    />
  );
});

export default BirthDaySelectGroup;
