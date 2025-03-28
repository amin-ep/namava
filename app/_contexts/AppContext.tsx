"use client";

import { createContext, useContext, useState } from "react";

export type TabValue = "pc-laptop" | "android-tv" | "ios" | "android" | string;

interface IContext {
  activeTab: TabValue;
  setTab: (t: TabValue) => void;
  bannerImageUrl: string;
  heading: string;
  description: string;
}

const AppContext = createContext({ activeTab: "pc-laptop" } as IContext);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [appTabObject, setAppTabObject] = useState<{
    activeTab: TabValue;
    bannerImageUrl: string;
    heading: string;
    description: string;
  }>({
    activeTab: "pc-laptop",
    bannerImageUrl: "/app-page-banner-img-pc-laptop.png",
    heading: "دانلود اپلیکیشن کامپیوتر و لپ تاپ",
    description: "لذت تماشای نماوا حتی بدون اینترنت",
  });

  const handleActiveTab = (tab: TabValue) => {
    const heading: string =
      tab === "pc-laptop"
        ? "دانلود اپلیکیشن کامپیوتر و لپ تاپ"
        : tab === "android"
          ? "دانلود اپلیکیشن اندروید"
          : tab === "android-tv"
            ? "دانلود اپلیکیشن اندروید تی‌وی"
            : tab === "ios"
              ? "دانلود اپلیکیشن iOS"
              : "";

    const description: string =
      tab === "pc-laptop"
        ? "لذت تماشای نماوا حتی بدون اینترنت"
        : tab == "android"
          ? "لذت تماشای نماوا هر جا که هستید"
          : tab === "android-tv"
            ? "لذت تماشای نماوا همراه خانواده"
            : tab === "ios"
              ? "لذت تماشای نماوا هر جا که هستید"
              : "";

    setAppTabObject({
      activeTab: tab,
      bannerImageUrl: `/app-page-banner-img-${tab}.png`,
      heading: heading,
      description,
    });
  };

  return (
    <AppContext
      value={{
        activeTab: appTabObject.activeTab,
        setTab: handleActiveTab,
        bannerImageUrl: appTabObject.bannerImageUrl,
        heading: appTabObject.heading,
        description: appTabObject.description,
      }}
    >
      {children}
    </AppContext>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("context is used outside the provider");
  }

  return context;
};
