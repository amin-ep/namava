import React from "react";
import Banner from "./_components/Banner";
import { AppProvider } from "../_contexts/AppContext";
import Tabs from "./_components/Tabs";

export const metadata = {
  title: "دانلود اپلیکیشن های نماوا",
};

function Page() {
  return (
    <AppProvider>
      <div className="bg-white pb-20 xl:pb-[100px]">
        <Banner />
        <h3 className="mt-5 text-center text-gray-900 md:mt-6 md:text-lg md:leading-8">
          دستگاه ها
        </h3>
        <Tabs />
      </div>
    </AppProvider>
  );
}

export default Page;
