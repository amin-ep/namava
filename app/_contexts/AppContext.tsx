"use client";

import { createContext, useContext, useState } from "react";

export type TabValue = "pc-laptop" | "android-tv" | "ios" | "android";

interface IContext {
  activeTab: TabValue;
  setTab: (t: TabValue) => void;
}

const AppContext = createContext({ activeTab: "pc-laptop" } as IContext);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabValue>("pc-laptop");

  const handleActiveTab = (tab: TabValue) => {
    setActiveTab(tab);
  };

  return (
    <AppContext value={{ activeTab, setTab: handleActiveTab }}>
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
