import { Metadata } from "next";
import HeadingWrapper from "./_components/HeadingWrapper";
import SideMenu from "./_components/SideMenu";
import { ReactNode } from "react";
import { getMe } from "../api/userApi";
import { User } from "../_types/UserTypes";

export const metadata: Metadata = {
  title: "حساب کاربری",
};

async function Layout({ children }: { children: ReactNode }) {
  const userInfo: User = await getMe();
  return (
    <div className="bg-[#f2f2f2] py-20 xsm:px-6 md:py-24 xl:py-28">
      <HeadingWrapper />
      <div className="relative grid grid-cols-1 md:grid-cols-[16rem_1fr] md:gap-5 xl:grid-cols-[17.75rem_1fr]">
        <div className="relative">
          <div className="fixed hidden w-64 md:block xl:w-[17.75rem]">
            <SideMenu
              firstName={userInfo?.firstName}
              lastName={userInfo?.lastName}
            />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
