"use client";

import PlaylistTitleForm from "@/app/_components/PlaylistTitleForm";
import { IPlaylist } from "@/app/_types/playlistTypes";
import Image from "next/image";
import { useState } from "react";
import DeletePlaylistModal from "./DeletePlaylistModal";
import PlaylistDropdownMenu from "./PlaylistDropdownMenu";

type Props = { playlist: IPlaylist };

function PlaylistItemBottomButton({ playlist }: Props) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [warningIsOpen, setWarningIsOpen] = useState(false);
  const [editFormIsOpen, setEditFormIsOpen] = useState(false);

  const handleOpenEditForm = () => setEditFormIsOpen(true);
  const handleOpenMenu = () => setMenuIsOpen(true);

  const handleCloseMenu = () => setMenuIsOpen(false);

  return (
    <>
      <button onClick={handleOpenMenu}>
        <Image
          src="/icons/dots-3-gray.svg"
          alt="menu"
          width={20}
          height={20}
          className="aspect-square w-5 rotate-90 md:w-6"
        />
      </button>
      {menuIsOpen && (
        <PlaylistDropdownMenu
          extraStyles="left-0"
          items={[
            {
              alt: "edit-title",
              iconPath: "pen-white.svg",
              extraStyles: "border-b border-gray-500",
              title: "تغییر نام",
              onClick: handleOpenEditForm,
            },
            {
              onClick: () => setWarningIsOpen(true),
              alt: "delete",
              iconPath: "trash-white.svg",
              title: "حذف لیست",
            },
          ]}
          close={handleCloseMenu}
        />
      )}
      <PlaylistTitleForm
        currentTitle={playlist.title}
        isOpen={editFormIsOpen}
        onClose={() => setEditFormIsOpen(false)}
        type="editTitle"
        editId={playlist._id}
      />
      <DeletePlaylistModal
        isOpen={warningIsOpen}
        onClose={() => setWarningIsOpen(false)}
        playlist={playlist}
      />
    </>
  );
}

export default PlaylistItemBottomButton;
