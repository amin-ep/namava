"use client";

import PlaylistTitleForm from "@/app/_components/PlaylistTitleForm";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { IPlaylist } from "@/app/_types/playlistTypes";
import cls from "classnames";
import Image from "next/image";
import React, { useState } from "react";
import DeletePlaylistModal from "./DeletePlaylistModal";

type Props = { close: () => void; playlist: IPlaylist };

function PlaylistItemMenu({ close, playlist }: Props) {
  const [warningIsOpen, setWarningIsOpen] = useState(false);
  const [editFormIsOpen, setEditFormIsOpen] = useState(false);

  const ref = useOutsideClick(close, editFormIsOpen);

  const handleOpenEditForm = () => setEditFormIsOpen(true);

  return (
    <>
      <div
        className="absolute left-0 top-full z-20 flex w-[200px] flex-col rounded-xl bg-gray-700 px-3 py-1 shadow-[0_4px_4px_0_rgba(0,0,0,0.2)] md:px-4 md:py-1"
        ref={ref as React.Ref<HTMLDivElement>}
      >
        <Button
          onClick={handleOpenEditForm}
          extraStyles="border-b border-gray-500"
          alt="edit-title"
          iconPath="pen-white.svg"
        >
          تغییر نام
        </Button>
        <Button
          onClick={() => setWarningIsOpen(true)}
          alt="delete"
          iconPath="trash-white.svg"
        >
          حذف لیست
        </Button>
      </div>
      <DeletePlaylistModal
        isOpen={warningIsOpen}
        onClose={() => setWarningIsOpen(false)}
        playlist={playlist}
      />
      <PlaylistTitleForm
        currentTitle={playlist.title}
        isOpen={editFormIsOpen}
        onClose={() => setEditFormIsOpen(false)}
        type="editTitle"
        editId={playlist._id}
      />
    </>
  );
}

function Button({
  children,
  iconPath,
  alt,
  extraStyles,
  onClick,
}: {
  children: React.ReactNode;
  alt: string;
  iconPath: string;
  extraStyles?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cls(
        "flex items-center justify-between py-2 md:py-3",
        extraStyles,
      )}
    >
      <span className="text-xs font-bold leading-5">{children}</span>
      <Image
        src={`/icons/${iconPath}`}
        alt={alt}
        width={20}
        height={20}
        className="aspect-square w-5 md:w-6"
      />
    </button>
  );
}

export default PlaylistItemMenu;
