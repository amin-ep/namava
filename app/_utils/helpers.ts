import jalaali from "jalaali-js";
import { categories, jalaaliMonths } from "./constants";

export const jMonthIndex = (strMonth: string) => {
  return jalaaliMonths().findIndex((el) => el === strMonth);
};

export const numericJalaaliDate = (date: string | Date) => {
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

export const findPersianCategoryName = (name: string) => {
  if (name) {
    const categoryName = categories.find((el) => el.href === name)?.title;
    return categoryName;
  }
};

export const findCategoryHref = (title: string) => {
  const href = categories.find((item) => item.title === title)?.href;
  return href;
};

export const cryptEmail = (email: string) => {
  let hashedEmail: string = email;
  const splittedEmail = hashedEmail.split("@");
  hashedEmail = `${splittedEmail.at(0)?.replace(splittedEmail[0].slice(5, splittedEmail[0].length), "****")}@${splittedEmail[1]}`;

  return hashedEmail;
};

export const jalaaliDateString = (date: string) => {
  const convertedDate = new Date(date).toLocaleDateString("fa-IR", {
    weekday: "long",
    year: "numeric",
    day: "2-digit",
    month: "long",
    era: "short",
  });

  return convertedDate;
};

export const calculateDiscountPrice = (
  discountPercentage: number,
  price: number,
) => {
  return (price * discountPercentage) / 100;
};

export const calculateFinalPrice = (
  discountPercentage: number,
  price: number,
) => {
  return (price * (100 - discountPercentage)) / 100;
};

export const calcSubExpireDay = (expiresAt: Date | string) => {
  const currentTime = Date.now();
  const numericExpiresAt = new Date(expiresAt).getTime();
  const days = (numericExpiresAt - currentTime) / 1000 / 24 / 60 / 60;
  return Math.round(days);
};
