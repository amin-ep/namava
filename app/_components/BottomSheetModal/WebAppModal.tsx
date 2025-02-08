"use client";

import Image from "next/image";
import Modal from "../Modal";
import LinkButton from "../LinkButton";

interface IProps {
  onClose: () => void;
  isOpen: boolean;
}

interface IStepProps {
  children: React.ReactNode;
  label?: string;
  imagePath?: string;
  imageAlt?: string;
}

function WebAppModal({ isOpen, onClose }: IProps) {
  const textStyles =
    "text-xs leading-5 text-center xsm:text-base xsm:leading-7";
  return (
    <Modal onClose={onClose} open={isOpen}>
      <div className="absolute inset-0 flex flex-col items-center gap-6 overflow-auto bg-gray-700 px-5 pb-7 pt-10 text-white xsm:gap-8 xsm:px-6 xsm:pb-8 xsm:pt-14">
        <Image
          src="/namava.jpg"
          alt="namava-logo"
          width={80}
          height={80}
          className="aspect-square w-20 rounded-[20px]"
        />
        <p className="text-center text-sm font-bold leading-6 xsm:text-lg xsm:leading-8">
          نسخه وب اپلیکیشن (PWA) نماوا را به صفحه اصلی دستگاه خود اضافه کنید.
        </p>
        <p className={textStyles}>
          با این کار، می‌توانید برای همیشه و بدون نیاز به به‌روزرسانی به
          اپلیکیشن نماوا دسترسی داشته باشید و از آن به راحتی استفاده کنید.
        </p>
        <div className="flex flex-col items-center justify-center gap-8 xsm:flex-row">
          <p className={textStyles}>
            توجه داشته باشید که حتما از طریق{" "}
            <span className="text-primary-light">سافاری</span> امتحان کنید
          </p>
          <span className="flex items-center justify-center">
            ({" "}
            <Image
              src="/Safari-browser-logo.png"
              alt="safari"
              width={28}
              height={28}
              className="mx-1 aspect-square w-7 rounded-md xsm:mx-0"
            />{" "}
            )
          </span>
        </div>
        <StepsList onClick={onClose} />
      </div>
    </Modal>
  );
}

function StepsList({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex w-full flex-col justify-between">
      <div className="grid w-full grid-cols-1 gap-7 xsm:gap-6">
        <Step imageAlt="share" imagePath="/icons/upload-line-file-white.svg">
          1. روی دکمه <span className="text-primary-light"> share </span>در نوار
          پایین کلیک کنید.
        </Step>
        <Step imagePath="/icons/plus-square-white.svg" imageAlt="add">
          2. گزینه{" "}
          <span className="text-primary-light"> Add to Home screen </span>{" "}
          انتخاب کنید.
        </Step>
        <Step label="Add">
          3. در پنجره باز شده روی{" "}
          <span className="text-primary-light"> Add </span> کلیک کنید.
        </Step>
      </div>
      <LinkButton
        color="white"
        variation="button"
        buttonType="button"
        onClick={onClick}
      >
        متوجه شدم
      </LinkButton>
    </div>
  );
}

function Step({ children, imageAlt, imagePath, label }: IStepProps) {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <p className="text-xs font-bold text-white xsm:text-base xsm:font-normal xsm:leading-7">
        {children}
      </p>
      <span>
        {label ?? null}
        {imagePath && imageAlt && (
          <Image src={imagePath} alt={imageAlt} width={20} height={20} />
        )}
      </span>
    </div>
  );
}

export default WebAppModal;
