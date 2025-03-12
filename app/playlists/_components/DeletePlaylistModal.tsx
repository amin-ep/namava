"use client";

import LinkButton from "@/app/_components/LinkButton";
import MiniSpinner from "@/app/_components/MiniSpinner/MiniSpinner";
import Modal from "@/app/_components/Modal";
import PlaylistModalTop from "@/app/_components/PlaylistModalTop";
import { IPlaylist } from "@/app/_types/playlistTypes";
import Image from "next/image";
import { useTransition } from "react";
import { deletePlaylistById } from "../actions";
import { useToast } from "@/app/_hooks/useToast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  playlist: IPlaylist;
};

function DeletePlaylistModal({ isOpen, onClose, playlist }: Props) {
  const [isPending, startTransition] = useTransition();
  const notify = useToast();

  const handleDeletePlaylist = async () => {
    startTransition(async () => {
      const deletingRes = await deletePlaylistById(playlist._id);

      if (deletingRes?.status === "success") {
        onClose();
      } else {
        notify("error", "مشکلی در حذف لیست پیش آمد لطفا مجددا تلاش کنید");
      }
    });
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="w-[396px] rounded-xl bg-gray-900 px-3 pb-6 pt-2.5 text-white xsm:w-[428px] xsm:px-4 xsm:pt-3.5 md:w-[468px] md:pt-5 lg:w-[500px] xl:px-4 xl:pt-4">
        <PlaylistModalTop title="اخطار" onClose={onClose} />
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/icons/red-triangle-warning.svg"
            alt="warning"
            width={40}
            height={40}
            className="my-3.5 aspect-square w-10 xsm:my-6 xsm:w-[60px] md:mb-5 md:mt-4 md:w-20"
          />
          <p className="mb-5 text-xs font-normal xsm:mb-6 xsm:text-sm md:mb-8 md:text-base">
            آیا از حذف لیست{" "}
            <span className="font-bold underline">{playlist.title}</span>{" "}
            اطمینان دارید؟ این عمل قابل بازگشت نیست.
          </p>
          <div className="flex w-full justify-between gap-4 md:gap-5">
            <LinkButton
              extraStyles="w-full"
              color="red"
              variation="button"
              buttonType="button"
              onClick={handleDeletePlaylist}
            >
              {isPending ? <MiniSpinner color="white" /> : "حذف لیست"}
            </LinkButton>
            <LinkButton
              onClick={onClose}
              color="glassy"
              extraStyles="w-full"
              variation="button"
              buttonType="button"
            >
              بستن
            </LinkButton>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DeletePlaylistModal;
