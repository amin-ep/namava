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
import TabPanelContent from "./TabPanelContent";

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

export interface IPanelItem {
  href: string;
  title: string;
  imageSrc: string;
  download?: boolean;
}

const pcLaptopItems: IPanelItem[] = [
  {
    href: "/files/namava-offline-play-win.zip",
    imageSrc: "/icons/windows-icon.svg",
    title: "ویندوز",
    download: true,
  },
  {
    href: "/files/namava-offline-play-mac.dmg",
    imageSrc: "/icons/brand-apple.svg",
    title: "مک",
    download: true,
  },
];

const androidTvItems: IPanelItem[] = [
  {
    imageSrc: "/icons/download-blue.svg",
    title: "دریافت مستقیم",
    href: "/files/namava.apk",
    download: true,
  },
  {
    href: "https://play.google.com/store/apps/details?id=com.shatelland.namava.tv",
    imageSrc: "/icons/google-play-logo.svg",
    title: "گوگل پلی",
  },
  {
    href: "https://myket.ir/app/com.shatelland.namava.tv",
    imageSrc: "/icons/myket-icon.svg",
    title: "مایکت",
  },
];

const androidItems: IPanelItem[] = [
  {
    imageSrc: "/icons/download-blue.svg",
    title: "دریافت مستقیم",
    href: "/files/namava.apk",
    download: true,
  },
  {
    href: "https://play.google.com/store/apps/details?id=com.shatelland.namava.mobile&pli=1",
    imageSrc: "/icons/google-play-logo.svg",
    title: "گوگل پلی",
  },
  {
    href: "https://myket.ir/app/com.shatelland.namava.mobile",
    imageSrc: "/icons/myket-icon.svg",
    title: "مایکت",
  },
];

const iosItems: IPanelItem[] = [
  {
    href: "https://sibapp.com/applications/namava",
    imageSrc: "/sibapp-logo.png",
    title: "سیب اپ",
  },
  {
    href: "https://iapps.ir/app/%D9%86%D9%85%D8%A7%D9%88%D8%A7/680419302",
    imageSrc: "/iapps-icon.ico",
    title: "آی اپس",
  },
  {
    href: "https://sibche.com/applications/namava-1",
    imageSrc: "/sibche-icon.jpeg",
    title: "سیبچه",
  },
];

function Tabs() {
  const { setTab, activeTab } = useApp();

  return (
    <div>
      <ReactTabs>
        <TabList className={styles.tablist}>
          {/* HEADINGS */}
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
        {/* PC & LAPTOP APPS */}
        <TabPanel className={styles.tabpanel}>
          <TabPanelContent activeTab={activeTab} items={pcLaptopItems} />
        </TabPanel>
        {/* ANDROID TV APP */}
        <TabPanel className={styles.tabpanel}>
          <TabPanelContent activeTab={activeTab} items={androidTvItems} />
        </TabPanel>
        {/* IOS APP */}
        <TabPanel className={styles.tabpanel}>
          <TabPanelContent activeTab={activeTab} items={iosItems} />
        </TabPanel>
        {/* ANDROID APP */}
        <TabPanel className={styles.tabpanel}>
          <TabPanelContent activeTab={activeTab} items={androidItems} />
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

export default Tabs;
