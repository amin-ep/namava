import { SubscriptionOption } from "../_types/subscriptionTypes";

export const API_BASE_URL = "http://localhost:8000/api";

export const JWT_EXPIRATION_DATE = Date.now() + 90 * 24 * 60 * 60 * 1000;

export const JWT_SECRET_KEY = "a97f1ee7-5a7d-4937-b7c9-1ef2753d3500";

export const provincesArr = [
  "آذربایجان شرقی",
  "آذربایجان غربی",
  "اردبیل",
  "اصفهان",
  "البرز",
  "ایلام",
  "بوشهر",
  "تهران",
  "چهارمحال و بختیاری",
  "خراسان جنوبی",
  "خراسان رضوی",
  "خراسان شمالی",
  "خوزستان",
  "زنجان",
  "سمنان",
  "سیستان و بلوچستان",
  "فارس",
  "قزوین",
  "قم",
  "کردستان",
  "کرمان",
  "کرمانشاه",
  "کهگیلویه و بویراحمد",
  "گلستان",
  "گیلان",
  "لرستان",
  "مازندران",
  "مرکزی",
  "هرمزگان",
  "همدان",
  "یزد",
];

export const jalaaliMonths: () => string[] = () => {
  return [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];
};

export const countriesArray = [
  { title: "ایران" },
  { title: "آمریکا" },
  { title: "هند" },
  { title: "چین" },
  { title: "کره جنوبی" },
  { title: "ژاپن" },
  { title: "ترکیه" },
  { title: "آلمان" },
  { title: "فرانسه" },
  { title: "ایتالیا" },
  { title: "انگلستان" },
  { title: "اسپانیا" },
  { title: "دانمارک" },
  { title: "سوئد" },
  { title: "روسیه" },
  { title: "آرژانتین" },
  { title: "مکزیک" },
  { title: "برزیل" },
  { title: "استرالیا" },
  { title: "کانادا" },
];

export const FILE_BASE_URL = `http://localhost:8000/static`;

export const englishLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export const persianLetters = [
  "ا",
  "ب",
  "پ",
  "ت",
  "ث",
  "ج",
  "چ",
  "ح",
  "خ",
  "د",
  "ذ",
  "ر",
  "ز",
  "ژ",
  "س",
  "ش",
  "ص",
  "ض",
  "ط",
  "ظ",
  "ع",
  "غ",
  "ف",
  "ق",
  "ک",
  "گ",
  "ل",
  "م",
  "ن",
  "و",
  "ه",
  "ی",
];

export const singleDigitNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const georgianYearsArray: string[] = Array.from(
  { length: new Date().getFullYear() - 1900 + 1 },
  (_, i) => (1900 + i).toString(),
);

export const categories: { title: string; imageSrc?: string; href: string }[] =
  [
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
    {
      title: "اسکار",
      imageSrc: "/categories/oscar-category.jpg",
      href: "oscar",
    },
    {
      title: "علمی تخیلی",
      imageSrc: "/categories/science-fiction-category.jpg",
      href: "scifi",
    },
    {
      title: "درام",
      imageSrc: "/categories/drama-category.jpg",
      href: "drama",
    },
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
    {
      title: "جنایی",
      imageSrc: "/categories/crime-category.jpg",
      href: "crime",
    },
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
    {
      title: "فیلم خارجی",
      href: "foreign-movie",
    },
    {
      title: "جنگی",
      href: "war",
    },
  ];

export const subscriptionOptions: SubscriptionOption[] = [
  {
    price: 160000,
    discountPercentage: 10,
    expirationDate: "یک ماهه",
    key: "SCR01",
    month: 1,
  },
  {
    price: 480000,
    discountPercentage: 40,
    expirationDate: "سه ماهه",
    key: "SCR03",
    month: 3,
  },
  {
    price: 960000,
    discountPercentage: 30,
    expirationDate: "شش ماهه",
    key: "SCR06",
    month: 6,
  },
];
