"use client";

import { IMovie } from "@/app/_types/movieTypes";
import React from "react";
import Modal from "./Modal";
import { FILE_BASE_URL } from "../_utils/constants";
import Image from "next/image";

type Props = {
  videoUrl: IMovie["videoUrl"];
  onClose: () => void;
  open: boolean;
};

function TrailerModal({ videoUrl, onClose, open }: Props) {
  return (
    <Modal
      onClose={onClose}
      open={open}
      justifyContent="center"
      alignItems="center"
    >
      <div
        // onClick={handleClick}
        className="top-0 mx-auto flex h-auto w-3/4 flex-col items-center justify-center gap-3 xl:w-2/3"
      >
        <div className="flex w-full justify-end">
          <button onClick={onClose}>
            <Image
              src="/icons/times-white.svg"
              alt="times"
              width={20}
              height={20}
              className="w-6"
            />
          </button>
        </div>
        <video
          src={`${FILE_BASE_URL}/${videoUrl}`}
          controls
          className="w-full"
          controlsList="nodownload"
        ></video>
      </div>
    </Modal>
  );
}

export default TrailerModal;
