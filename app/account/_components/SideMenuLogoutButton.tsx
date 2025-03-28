import { logout } from "@/app/auth/login-otp/actions";
import Image from "next/image";
import React from "react";

function SideMenuLogoutButton() {
  return (
    <button
      type="button"
      className="flex items-center justify-start gap-5 px-6 py-4 text-sm text-gray-400"
      onClick={logout}
    >
      <Image src="/icons/power-gray.svg" alt="logout" width={24} height={24} />
      <span className="text-gray-800">خروج از حساب کاربری</span>
    </button>
  );
}

export default SideMenuLogoutButton;
