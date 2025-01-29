import jalaali from "jalaali-js";
import { jalaaliMonths } from "./constants";

export const jMonthIndex = (strMonth: string) => {
  return jalaaliMonths().findIndex((el) => el === strMonth);
};

export const numericJalaaliBirthDate = (date: string | Date) => {
  const georgianBirthDate = new Date(date);
  const birthYear = georgianBirthDate.getFullYear();
  const birthMonth = georgianBirthDate.getMonth();
  const birthDate = georgianBirthDate.getDate();

  const jalaaliBirthDateObject = jalaali.toJalaali(
    birthYear,
    birthMonth + 1,
    birthDate,
  );

  return `${jalaaliBirthDateObject.jy}/${jalaaliBirthDateObject.jm}/${jalaaliBirthDateObject.jd}`;
};

export const removeUnrecognizedFields = (
  payload: FormData | { [key: string]: FormDataEntryValue | undefined },
) => {
  const filteredPayload = Object.fromEntries(
    Object.entries(payload).filter(([key]) => !key.startsWith("$ACTION")),
  );
  return filteredPayload;
};
