"use client";

import { useSelect } from "@/app/_hooks/useSelect";
import { FieldValues } from "@/app/_types/globalTypes";
import {
  jalaaliMonths,
  jMonthIndex,
  numericJalaaliBirthDate,
} from "@/app/_utils/helpers";
import jalaali, { GregorianDateObject } from "jalaali-js";
import { memo, useEffect, useMemo, useState } from "react";
import {
  Path,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import Select from "../../../_components/Select";
import SelectLabel from "./SelectLabel";

const BirthDaySelectGroup = memo(function BirthDaySelectGroup<
  TFormValues extends FieldValues,
>({
  register,
  name,
  defaultDate,
  setValue,
  validation,
}: {
  register: UseFormRegister<TFormValues>;
  name: Path<TFormValues>;
  defaultDate: Date | string | undefined;
  setValue: UseFormSetValue<FieldValues>;
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
      const numericBirthDate = numericJalaaliBirthDate(new Date(defaultDate));
      const numericBirthDateArr = numericBirthDate.split("/");
      setDefaultBirthDateObject({
        year: numericBirthDateArr.at(0) as string,
        month: numericBirthDateArr.at(1) as string,
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
    open: openDaySelect,
    updateValue: updateDayValue,
    value: dayValue,
  } = useSelect((defaultBirthDateObject?.day as string) ?? "");

  // Month select
  const {
    close: closeMonthSelect,
    isOpen: monthIsOpen,
    open: openMonthSelect,
    updateValue: updateMonthValue,
    value: monthValue,
  } = useSelect((defaultBirthDateObject?.month as string) ?? "");

  // Year select
  const {
    close: closeYearSelect,
    isOpen: yearIsOpen,
    open: openYearSelect,
    updateValue: updateYearValue,
    value: yearValue,
  } = useSelect((defaultBirthDateObject.year as string) ?? "");

  useEffect(() => {
    const birthDateObj: GregorianDateObject = jalaali.toGregorian(
      +yearValue,
      +jMonthIndex(monthValue),
      +dayValue,
    );

    const strBirthDate = new Date(
      birthDateObj.gy + 1,
      birthDateObj.gm,
      birthDateObj.gd + 4,
    ).toISOString();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    setValue(name, strBirthDate);
  }, [yearValue, dayValue, monthValue, setValue, name]);

  return (
    <div className="flex flex-col gap-2">
      <SelectLabel
        label={{ title: "تاریخ تولد", optionalTitle: "اختیاری" }}
        onClick={() => {
          updateDayValue("");
          updateMonthValue("");
          updateYearValue("");
        }}
      />
      <div className="grid grid-cols-3 gap-x-2">
        <Select
          isOpen={dayIsOpen}
          onOpen={openDaySelect}
          updateValue={updateDayValue}
          value={dayValue}
          items={daysArr as string[]}
          placeholder="روز"
          close={closeDaySelect}
        />
        <Select
          isOpen={monthIsOpen}
          onOpen={openMonthSelect}
          updateValue={updateMonthValue}
          value={monthValue}
          items={months as string[]}
          placeholder="ماه"
          close={closeMonthSelect}
        />
        <Select
          isOpen={yearIsOpen}
          onOpen={openYearSelect}
          updateValue={updateYearValue}
          value={yearValue}
          close={closeYearSelect}
          items={years as string[]}
          placeholder="سال"
        />
        <input type="hidden" {...register(name, { ...validation })} />
      </div>
    </div>
  );
});

export default BirthDaySelectGroup;
