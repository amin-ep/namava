"use client";

import Image from "next/image";
import Modal from "../Modal";
import BottomSheetModalCloseButton from "./BottomSheetModalCloseButton";
import BottomSheetModalHeading from "./BottomSheetModalHeading";
import LinkButton from "../LinkButton";

interface IProps {
  onClose: () => void;
  isOpen: boolean;
  openWebAppModal: () => void;
}

function AndroidAppModal({ onClose, isOpen, openWebAppModal }: IProps) {
  const handleOpenWebAppModal = () => {
    openWebAppModal();
    onClose();
  };

  return (
    <Modal onClose={onClose} open={isOpen}>
      <div className="absolute bottom-0 left-0 right-0 w-full rounded-t-xl bg-gray-700 px-5 pb-7 pt-6 md:px-6">
        <div className="flex flex-col gap-6">
          <div className="relative flex justify-center">
            <Image
              src="/namava.jpg"
              alt="namava-logo"
              width={100}
              height={100}
              className="rounded-3xl"
            />
            <BottomSheetModalCloseButton onClose={onClose} />
          </div>
          <BottomSheetModalHeading>
            تجربه بهتر با اپلیکیشن نماوا
          </BottomSheetModalHeading>
          <div className="flex flex-col items-center justify-center gap-6">
            <LinkButton
              extraStyles="w-full"
              color="glassy"
              variation="link"
              href="/files/namava.apk"
              linkDownload
            >
              {/* FIXME */}
              <Image
                src="/icons/download-primary.svg"
                alt="download"
                width={18}
                height={18}
              />
              دریافت لینک مستقیم
            </LinkButton>
            <LinkButton
              extraStyles="w-full"
              color="glassy"
              variation="link"
              href="https://play.google.com/store/apps/details?id=com.shatelland.namava.mobile"
              linkTarget="_blank"
            >
              <Image
                src="/google-play-logo.png"
                alt="google-play"
                width={18}
                height={18}
              />
              گوگل پلی
            </LinkButton>
            <LinkButton
              extraStyles="w-full"
              color="glassy"
              variation="link"
              href="https://cafebazaar.ir/app/com.shatelland.namava.mobile/"
              linkTarget="_blank"
            >
              <Image
                src="/cafe-bazaar-logo.png"
                alt="bazaar"
                width={18}
                height={18}
              />
              بازار
            </LinkButton>
            <LinkButton
              extraStyles="w-full"
              color="glassy"
              variation="link"
              href="https://myket.ir/app/com.shatelland.namava.mobile"
              linkTarget="_blank"
            >
              <Image src="/myket-logo.png" alt="myket" width={18} height={18} />
              مایکت
            </LinkButton>
            <button
              className="text-primary-default"
              onClick={handleOpenWebAppModal}
            >
              مشاهده نسخه وب
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AndroidAppModal;
