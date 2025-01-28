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
  console.log(payload);
  const filteredPayload = Object.fromEntries(
    Object.entries(payload).filter(([key]) => !key.startsWith("$ACTION")),
  );
  return filteredPayload;
};

// export const convertJalaaliToGeorgian = (jy: number, jm:number, jd: number) => {
//   const georgianDate = { jy, jm, jd };
//   const jalaaliDate =
// }

export class ConvertDate {
  toJalaali(gy: number, gm: number, gd: number) {
    const jalaaliDate = jalaali.toJalaali(gy, gm, gd);
    return jalaaliDate;
  }

  toGeorgian(jy: number, jm: number, jd: number) {
    const georgianDate = jalaali.toGregorian(jy, jm, jd);
    return georgianDate;
  }
}
