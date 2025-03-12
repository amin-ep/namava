"use client";

import PlaylistTitleForm from "@/app/_components/PlaylistTitleForm";
import Image from "next/image";
import { useState } from "react";

function PlaylistHeading() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <div className="flex items-start justify-between text-white">
        <h3 className="text-base font-bold leading-7 md:text-lg md:leading-8">
          لیست ها
        </h3>
        <button
          className="mb-6 flex cursor-pointer items-center text-sm font-normal leading-6 md:mb-8 md:text-base md:leading-7"
          onClick={() => setModalIsOpen(true)}
        >
          <Image
            src="/icons/plus-white.svg"
            alt="plus"
            width={20}
            height={20}
            className="aspect-square w-5 md:w-7"
          />
          <span className="align-middle">افزودن لیست</span>
        </button>
      </div>
      <PlaylistTitleForm
        type="create"
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />
    </>
  );
}

export default PlaylistHeading;
