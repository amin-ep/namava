"use client";

import { useModal } from "@/app/_hooks/useModal";
import Modal from "../Modal";
import HeaderActionLinkButton from "./HeaderActionLinkButton";
import Image from "next/image";
import { useTransition } from "react";
import { generateRandomMovieId } from "@/app/_lib/actions";
import { useRouter } from "next/navigation";
import MiniSpinner from "../MiniSpinner/MiniSpinner";
import { FaPlay } from "react-icons/fa6";
import LinkButton from "../LinkButton";

function HeaderShuffleAction() {
  const [isPending, startTransition] = useTransition();
  const { close, open, isOpen } = useModal();

  const router = useRouter();

  const playRandomMovie = () => {
    startTransition(async () => {
      const randomId = (await generateRandomMovieId()) as string;

      if (randomId) {
        close();
        router.push(`/play/${randomId}`);
      }
    });
  };

  return (
    <>
      <HeaderActionLinkButton
        variation="button"
        alt="shuffle-white"
        onClick={open}
        src="/icons/shuffle-white.svg"
        extraStyles="hidden xsm:block"
      />
      <Modal onClose={close} open={isOpen}>
        <div className="relative flex w-80 flex-col items-center rounded-md bg-gray-900 xsm:w-[27.5rem] md:w-[40rem] xl:w-[45rem]">
          <div className="absolute inset-0 z-10 rounded-[4px] bg-gradient-to-t from-gray-900 to-transparent"></div>
          <button
            onClick={close}
            className="absolute left-5 top-5 z-20 flex items-center justify-center rounded-full bg-black/50"
          >
            <Image
              src="/icons/times-white.svg"
              alt="close"
              width={24}
              height={24}
              className="w-8"
            />
          </button>
          {/* Shuffle icon */}
          <Image
            src="/icons/shuffle-white.svg"
            alt="shuffle"
            width={80}
            height={80}
            className="absolute top-28 z-20 mx-auto w-14 xsm:top-40 xsm:w-16 md:top-56 md:w-24 base:top-60 lg:top-64 xl:top-[264px] xl:w-32"
          />
          <Image
            src="/shuffle-banner.png"
            alt="shuffle"
            width={320}
            height={160}
            unoptimized
            className="z-0 aspect-[2/1] w-full rounded-t-[4px]"
          />
          <div className="flex flex-col items-center justify-center gap-5 p-6 text-center md:p-8 xl:px-10 xl:py-12">
            <div className="z-20 text-white">
              <h3 className="mb-2 text-sm font-bold leading-6 xsm:text-base xsm:leading-7 md:mb-4 md:text-lg md:leading-8 xl:text-xl xl:leading-9">
                نمیدونی چی ببینی؟
              </h3>
              <p className="text-xs leading-5 md:text-sm md:leading-6 xl:text-base xl:leading-7">
                نماوا یک فیلم یا سریال رو مطابق سلیقه‌ت به صورت تصادفی برات پخش
                می‌کنه.
              </p>
            </div>
            <LinkButton
              // className="z-20 flex w-[134px] items-center justify-center gap-2 rounded-xl bg-white py-3 text-xs"
              onClick={playRandomMovie}
              variation="button"
              color="white"
              extraStyles="w-[144px] z-20 gap-2"
            >
              {isPending ? (
                <MiniSpinner color="white" />
              ) : (
                <>
                  <span>
                    <FaPlay size={22} />
                  </span>
                  سورپرایزم کن
                </>
              )}
            </LinkButton>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default HeaderShuffleAction;
