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

export const categories: { title: string; imageSrc: string; href: string }[] = [
  {
    title: "ایرانی",
    imageSrc: "/categories/irani-category.jpg",
    href: "persian",
  },
  {
    title: "انیمه و انیمیشن",
    imageSrc: "/categories/anime-animation-category.jpg",
    href: "anime-animation",
  },
  {
    title: "دوبله نماوا",
    imageSrc: "/categories/namava-dubbed-category.jpg",
    href: "exclusive-dubs",
  },
  {
    title: "پردیس نماوا",
    imageSrc: "/categories/pardis-namava-category.jpg",
    href: "collection-pardis",
  },
  {
    title: "برترین ها",
    imageSrc: "/categories/the-best-category.jpg",
    href: "tops",
  },
  {
    title: "ترکی",
    imageSrc: "/categories/turkish-category.jpg",
    href: "turkish",
  },
  {
    title: "هندی",
    imageSrc: "/categories/indian-category.jpg",
    href: "indian",
  },
  {
    title: "کره ای",
    imageSrc: "/categories/korean-category.jpg",
    href: "korean",
  },
  {
    title: "کمدی",
    imageSrc: "/categories/comedy-category.jpg",
    href: "comedy",
  },
  {
    title: "اکشن",
    imageSrc: "/categories/action-category.jpg",
    href: "action",
  },
  { title: "اسکار", imageSrc: "/categories/oscar-category.jpg", href: "oscar" },
  {
    title: "علمی تخیلی",
    imageSrc: "/categories/science-fiction-category.jpg",
    href: "scifi",
  },
  { title: "درام", imageSrc: "/categories/drama-category.jpg", href: "drama" },
  {
    title: "عاشقانه",
    imageSrc: "/categories/romantic-category.jpg",
    href: "romance",
  },
  {
    title: "ترسناک",
    imageSrc: "/categories/thriller-category.jpg",
    href: "horror",
  },
  { title: "جنایی", imageSrc: "/categories/crime-category.jpg", href: "crime" },
  {
    title: "کلاسیک",
    imageSrc: "/categories/classic-category.jpg",
    href: "classic",
  },
  {
    title: "خانوادگی",
    imageSrc: "/categories/family-category.jpg",
    href: "family",
  },
  {
    title: "مستند",
    imageSrc: "/categories/documentary-category.jpg",
    href: "documentary",
  },
  {
    title: "فیلم های کوتاه",
    imageSrc: "/categories/short-movie-category.jpg",
    href: "short-movie",
  },
  {
    title: "ماجراجویی",
    imageSrc: "/categories/adventure-category.jpg",
    href: "adventure",
  },
];

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
