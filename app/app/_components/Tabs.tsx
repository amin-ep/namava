"use client";

import { TabValue, useApp } from "@/app/_contexts/AppContext";
import Image from "next/image";
import { Tabs as ReactTabs, Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styles from "./Tabs.module.css";
import cls from "classnames";
import pcIconColored from "../../../public/icons/pc-icon-colored.svg";
import androidTvColored from "../../../public/icons/android-tv-icon-colored.svg";
import iosColored from "../../../public/icons/brand-apple-colored.svg";
import androidColored from "../../../public/icons/android-icon-colored.svg";
import Link from "next/link";

const tabHeadings: {
  imageSrc: string;
  title: string;
  value: TabValue;
  activeImageSrc: string;
}[] = [
  {
    title: "کامپیوتر و لپ تاپ",
    imageSrc: "/icons/pc-icon.svg",
    value: "pc-laptop",
    activeImageSrc: pcIconColored,
  },
  {
    title: "اندروید تی وی",
    imageSrc: "/icons/android-tv-icon.svg",
    value: "android-tv",
    activeImageSrc: androidTvColored,
  },
  {
    title: "آی او اس",
    imageSrc: "/icons/brand-apple.svg",
    value: "ios",
    activeImageSrc: iosColored,
  },
  {
    title: "اندروید",
    imageSrc: "/icons/android-icon.svg",
    value: "android",
    activeImageSrc: androidColored,
  },
];

interface IPanelItem {
  href: string;
  title: string;
  imageSrc: string;
}

const pcLaptopItems: IPanelItem[] = [
  { href: "/", imageSrc: "/icons/windows-icon.svg", title: "ویندوز" },
  { href: "/", imageSrc: "/icons/brand-apple.svg", title: "مک" },
];

const androidTvItems: IPanelItem[] = [
  { href: "/", imageSrc: "/icons/download-blue.svg", title: "دریافت مستقیم" },
  { href: "/", imageSrc: "/icons/google-play-logo.svg", title: "گوگل پلی" },
  { href: "/", imageSrc: "/icons/myket-icon.svg", title: "مایکت" },
];

const iosItems: IPanelItem[] = [
  { href: "/", imageSrc: "/sibapp-logo.png", title: "سیب اپ" },
  { href: "/", imageSrc: "/iapps-icon.ico", title: "آی اپس" },
  { href: "/", imageSrc: "/sibche-icon.jpeg", title: "سیبچه" },
];

function Tabs() {
  const { setTab, activeTab } = useApp();

  return (
    <div>
      <ReactTabs>
        <TabList className={styles.tablist}>
          {tabHeadings.map((tb) => (
            <Tab
              className={styles.tab}
              onClick={() => {
                setTab(tb.value);
              }}
              selectedClassName={cls(
                styles[`selected-tab-${tb.value}`],
                styles["selected-tab"],
              )}
              key={tb.value}
            >
              <Image
                src={activeTab === tb.value ? tb.activeImageSrc : tb.imageSrc}
                alt={tb.title}
                width={52}
                height={52}
                className="w-[52px] md:w-[76px]"
              />
              <span className="text-center text-[10px] font-normal leading-4 md:text-sm md:leading-6">
                {tb.title}
              </span>
            </Tab>
          ))}
        </TabList>
        <h3 className="mt-5 text-center text-gray-900 md:mt-6 md:text-lg md:leading-8">
          دانلود اپلیکیشن:
        </h3>
        <TabPanel className={styles.tabpanel}>
          <div
            id={`panel-${activeTab}`}
            className="flex flex-col gap-3 p-5 md:gap-4 md:px-6 xl:py-6"
          >
            {pcLaptopItems.map((item) => (
              <PanelLink
                href={item.href}
                imageSrc={item.imageSrc}
                title={item.title}
                key={item.title}
              />
            ))}
          </div>
        </TabPanel>
        <TabPanel className={styles.tabpanel}>
          <div
            id={`panel-${activeTab}`}
            className="flex flex-col gap-3 p-5 md:gap-4 md:px-6 xl:py-6"
          >
            {androidTvItems.map((item) => (
              <PanelLink
                href={item.href}
                imageSrc={item.imageSrc}
                title={item.title}
                key={item.title}
              />
            ))}
          </div>
        </TabPanel>
        <TabPanel className={styles.tabpanel}>
          <div
            id={`panel-${activeTab}`}
            className="flex flex-col gap-3 p-5 md:gap-4 md:px-6 xl:py-6"
          >
            {iosItems.map((item) => (
              <PanelLink
                href={item.href}
                imageSrc={item.imageSrc}
                title={item.title}
                key={item.title}
              />
            ))}
          </div>
        </TabPanel>
        <TabPanel className={styles.tabpanel}>
          <div
            id={`panel-${activeTab}`}
            className="flex flex-col gap-3 p-5 md:gap-4 md:px-6 xl:py-6"
          >
            {androidTvItems.map((item) => (
              <PanelLink
                href={item.href}
                imageSrc={item.imageSrc}
                title={item.title}
                key={item.title}
              />
            ))}
          </div>
        </TabPanel>
      </ReactTabs>
      <div className="flex items-center justify-center">
        <Link
          href="/"
          className="text-center text-xs font-bold text-primary-default hover:text-black md:text-sm md:leading-6"
        >
          مشاهده نسخه وب
        </Link>
      </div>
    </div>
  );
}

function PanelLink({ href, imageSrc, title }: IPanelItem) {
  return (
    <Link
      href={href}
      className="flex justify-center rounded-md border border-gray-400 py-2"
    >
      <Image
        alt={title}
        src={imageSrc}
        width={20}
        height={20}
        className="w-5 md:w-6"
      />
      <span className="mr-2 text-xs font-bold leading-5 text-gray-700 md:text-sm md:leading-6">
        {title}
      </span>
    </Link>
  );
}

export default Tabs;
