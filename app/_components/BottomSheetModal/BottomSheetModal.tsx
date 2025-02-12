"use client";

import cls from "classnames";
import Image from "next/image";
import { useEffect, useLayoutEffect, useReducer, useState } from "react";
import { browserName } from "react-device-detect";
import { useModal } from "../../_hooks/useModal";
import Modal from "../Modal";
import AndroidAppModal from "./AndroidAppModal";
import BottomSheetModalCloseButton from "./BottomSheetModalCloseButton";
import BottomSheetModalHeading from "./BottomSheetModalHeading";
import WebAppModal from "./WebAppModal";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";

interface IBrowserTypes {
  Chrome: string;
  Firefox: string;
  Opera: string;
  Yandex: string;
  Safari: string;
  InternetExplorer: string;
  Edge: string;
  Chromium: string;
  Ie: string;
  MobileSafari: string;
  EdgeChromium: string;
  MIUI: string;
  SamsungBrowser: string;
}

interface IRowProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  buttonColor: "primary-default" | "white";
  buttonTitle: string;
  onClick: () => void;
}

interface IState {
  browserTitle: string;
  browserImagePath: string;
}

type Actions = {
  type: keyof IBrowserTypes;
  payload: { imagePath: string; title: string };
};

const reducer = (state: IState, action: Actions) => {
  switch (action.type) {
    case action.type:
      return {
        ...state,
        browserTitle: action.payload.title,
        browserImagePath: action.payload.imagePath,
      };

    default:
      throw new Error("Unknown action type");
  }
};

function BottomSheetModal() {
  const [userHasSeenModal, setUserHasSeenModal] = useState(false);
  const [{ browserTitle, browserImagePath }, dispatch] = useReducer(reducer, {
    browserTitle: "",
    browserImagePath: "",
  } as IState);

  const pathname = usePathname();

  const {
    close: closeSheetModal,
    open: openSheetModal,
    isOpen: sheetModalIsOpen,
  } = useModal(false);

  const {
    close: closeAppModal,
    isOpen: appModalIsOpen,
    open: openAppModal,
  } = useModal();

  const {
    close: closeWebappModal,
    isOpen: webappModalIsOpen,
    open: openWebappModal,
  } = useModal(false);

  useEffect(() => {
    const handleCloseSheetModal = () => {
      if (window.innerWidth >= 800) {
        closeSheetModal();
        closeAppModal();
        closeWebappModal();
      }

      if (
        window.innerWidth < 800 &&
        !appModalIsOpen &&
        !webappModalIsOpen &&
        pathname === "/home"
      ) {
        if (userHasSeenModal) {
          closeSheetModal();
        } else {
          openSheetModal();
        }
      }
    };

    window.addEventListener("resize", handleCloseSheetModal);

    handleCloseSheetModal();

    return () => window.removeEventListener("resize", handleCloseSheetModal);
  }, [
    appModalIsOpen,
    closeAppModal,
    closeSheetModal,
    closeWebappModal,
    openSheetModal,
    pathname,
    sheetModalIsOpen,
    userHasSeenModal,
    webappModalIsOpen,
  ]);

  useEffect(() => {
    const browsersPersianTranslate: IBrowserTypes = {
      Chrome: "کروم",
      Chromium: "کرومیوم",
      Edge: "مایکروسافت ادج",
      EdgeChromium: "ادج کرومیوم",
      Firefox: "فایرفاکس",
      Ie: "اینترنت اکسپلورر",
      InternetExplorer: "اینترنت اکسپلورر",
      MIUI: "می یو آی",
      MobileSafari: "سافاری",
      Opera: "اوپرا",
      Safari: "سافاری",
      SamsungBrowser: "مرورگر سامسونگ",
      Yandex: "یاندکس",
    };

    dispatch({
      type: browserName as keyof IBrowserTypes,
      payload: {
        imagePath:
          `/${browserName as keyof IBrowserTypes}-browser-logo.png` ||
          "/browser-logo.png",
        title:
          browsersPersianTranslate[browserName as keyof IBrowserTypes] ||
          "مرورگر",
      },
    });
  }, []);

  useLayoutEffect(() => {
    const checkUserHasClosed = Cookies.get("SHEET-MODAL-CLOSED");

    if (checkUserHasClosed) {
      setUserHasSeenModal(true);
    }
  }, []);

  const handleCloseModal = () => {
    Cookies.set("SHEET-MODAL-CLOSED", "true", {
      expires: 7,
    });
    setUserHasSeenModal(true);
    closeSheetModal();
  };

  return (
    <>
      <Modal open={sheetModalIsOpen} onClose={handleCloseModal}>
        <div className="absolute bottom-0 left-0 right-0 w-full rounded-t-xl bg-gray-700 px-5 pb-7 pt-6 md:px-6">
          <div className="flex flex-col gap-6 text-white">
            <div className="relative">
              <BottomSheetModalHeading>
                تجربه بهتر با اپلیکیشن نماوا
              </BottomSheetModalHeading>
              <BottomSheetModalCloseButton onClose={closeSheetModal} />
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
              title={browserTitle}
              imageAlt="namava-logo"
              imageSrc={browserImagePath}
              buttonColor="white"
              buttonTitle="ادامه"
              onClick={() => {
                openWebappModal();
                closeSheetModal();
              }}
            />
          </div>
        </div>
      </Modal>
      <AndroidAppModal
        openWebAppModal={openWebappModal}
        isOpen={appModalIsOpen}
        onClose={closeAppModal}
      />
      <WebAppModal isOpen={webappModalIsOpen} onClose={closeWebappModal} />
    </>
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
          className="aspect-square w-9 rounded-lg"
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

export default BottomSheetModal;
