"use client";

import { useModal } from "@/app/_hooks/useModal";
import HeaderActionLinkButton from "./HeaderActionLinkButton";
import Modal from "../Modal";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

function HeaderMobileAppAction() {
  const { close, isOpen, open } = useModal();

  useEffect(() => {
    if (isOpen) {
      const handleCloseModal = () => {
        if (window.innerWidth <= 1280) {
          close();
        }
      };
      window.addEventListener("resize", handleCloseModal);

      return () => window.removeEventListener("resize", handleCloseModal);
    }
  }, [isOpen, close]);
  return (
    <>
      <HeaderActionLinkButton
        variation="button"
        alt="mobile"
        src="/icons/mobile.svg"
        extraStyles="hidden xl:block"
        onClick={open}
      />
      <Modal
        onClose={close}
        open={isOpen}
        alignItems="flex-start"
        backgroundColor="transparent"
        justifyContent="flex-end"
        padding="5rem 0 0 42px"
      >
        <div className="flex w-[37.5rem] flex-col gap-10 rounded-xl bg-gray-900 px-[68px] py-6 shadow-[0_0_8px_0_rgba(0,0,0,0.3)]">
          <div className="text-center text-white">
            <h3 className="mb-6 text-base font-bold leading-7">نصب اپلیکیشن</h3>
            <p className="text-base leading-7">
              برای نصب اپلیکیشن نماوا بارکد را اسکن کنید.
            </p>
          </div>
          <div className="grid grid-cols-[160px_60px_166px] items-center justify-between">
            <Image
              src="/QRcode.png"
              className="rounded-xl"
              alt="qr-code"
              width={160}
              height={160}
            />
            <Image
              src="/icons/arrow-left-gray.svg"
              alt="left"
              width={60}
              height={60}
            />
            <Image
              src="/installencouragement.png"
              alt="installencouragement"
              width={166}
              height={200}
            />
          </div>
          <div className="flex items-center justify-center">
            <Link href="/app" className="text-primary-light">
              رفتن به صفحه اپلیکیشن ها
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default HeaderMobileAppAction;
