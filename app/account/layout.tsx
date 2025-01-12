import { Metadata } from "next";
import React from "react";
import HeadingWrapper from "./_components/HeadingWrapper";
import Sidebar from "./_components/Sidebar";

export const metadata: Metadata = {
  title: "حساب کاربری",
};

function Layout() {
  return (
    <div className="pt-20">
      <HeadingWrapper />
      <div className="grid grid-cols-1">
        <div className="bg-white">content</div>
        <Sidebar />
      </div>
    </div>
  );
}

export default Layout;
