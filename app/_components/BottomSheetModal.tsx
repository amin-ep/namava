"use client";

import cls from "classnames";
import Image from "next/image";
import { useEffect } from "react";
import { useModal } from "../_hooks/useModal";
import Modal from "./Modal";

interface IRowProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  buttonColor: "primary-default" | "white";
  buttonTitle: string;
  onClick: () => void;
}

function BottomSheetModal() {
  const {
    close: closeSheetModal,
    open: openSheetModal,
    isOpen: sheetModalIsOpen,
  } = useModal(window.innerWidth < 800);

  const {
    close: closeAppModal,
    isOpen: appModalIsOpen,
    open: openAppModal,
  } = useModal();

  useEffect(() => {
    const handleCloseSheetModal = () => {
      if (window.innerWidth >= 800) {
        closeSheetModal();
      }

      if (window.innerWidth < 800) {
        openSheetModal();
      }
    };

    window.addEventListener("resize", handleCloseSheetModal);

    return () => window.removeEventListener("resize", handleCloseSheetModal);
  }, [closeSheetModal, openSheetModal, sheetModalIsOpen]);

  return (
    <>
      <Modal open={sheetModalIsOpen} onClose={closeSheetModal}>
        <Container>
          <div className="flex flex-col gap-6 text-white">
            <div className="relative">
              <Heading>تجربه بهتر با اپلیکیشن نماوا</Heading>
              <CloseButton onClose={closeSheetModal} />
            </div>
            <Row
              title="اپلیکیشن نماوا"
              imageAlt="namava-logo"
              imageSrc="/namava.jpg"
              buttonColor="primary-default"
              buttonTitle="مشاهده"
              onClick={() => {
                openAppModal();
                closeSheetModal();
              }}
            />
            <Row
              title="کروم"
              imageAlt="namava-logo"
              imageSrc="/chrome-logo.jpg"
              buttonColor="white"
              buttonTitle="ادامه"
              onClick={() => {
                console.log("open chrome app");
              }}
            />
          </div>
        </Container>
      </Modal>
      <Modal onClose={closeAppModal} open={appModalIsOpen}>
        <Container>
          <div className="flex flex-col gap-6">
            <div className="relative flex justify-center">
              <Image
                src="/namava.jpg"
                alt="namava-logo"
                width={100}
                height={100}
                className="rounded-3xl"
              />
              <CloseButton onClose={closeAppModal} />
            </div>
            <Heading>تجربه بهتر با اپلیکیشن نماوا</Heading>
            <div className="flex items-center justify-center">
              <button className="text-primary-default">مشاهده نسخه وب</button>
            </div>
          </div>
        </Container>
      </Modal>
    </>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 w-full rounded-t-xl bg-gray-700 px-5 pb-7 pt-6 md:px-6">
      {children}
    </div>
  );
}

function Row({
  imageAlt,
  imageSrc,
  title,
  buttonTitle,
  buttonColor,
  onClick,
}: IRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start gap-2">
        <Image
          className="rounded-lg"
          src={imageSrc}
          alt={imageAlt}
          width={36}
          height={36}
        />
        <p>{title}</p>
      </div>
      <button
        className={cls(
          `bg-${buttonColor} w-[73px] rounded-lg py-[10px] text-xs`,
          buttonColor === "primary-default"
            ? "text-white"
            : "text-black hover:bg-primary-default hover:text-white",
        )}
        onClick={onClick}
      >
        {buttonTitle}
      </button>
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-center text-sm font-bold leading-6">{children}</h1>
  );
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button onClick={onClose} className="absolute right-0 top-0">
      <Image
        src="/icons/keyboard-arrow-down-white.svg"
        alt="arrow-down"
        width={24}
        height={24}
      />
    </button>
  );
}

export default BottomSheetModal;
