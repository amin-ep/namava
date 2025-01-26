import { Metadata } from "next";
import SideMenu from "./_components/SideMenu";
import { ReactNode } from "react";
import { getMe } from "../api/userApi";
import { User } from "../_types/userTypes";
import AccountLayout from "./_components/AccountLayout";

export const metadata: Metadata = {
  title: "حساب کاربری",
};

async function Layout({ children }: { children: ReactNode }) {
  const userInfo: User = await getMe();
  return (
    <AccountLayout
      Side={
        <SideMenu
          firstName={userInfo?.firstName}
          lastName={userInfo?.lastName}
        />
      }
    >
      {children}
    </AccountLayout>
  );
}

export default Layout;
