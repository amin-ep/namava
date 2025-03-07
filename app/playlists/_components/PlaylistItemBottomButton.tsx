"use client";

import Image from "next/image";
import { useState } from "react";
import PlaylistItemMenu from "./PlaylistItemMenu";
import { IPlaylist } from "@/app/_types/playlistTypes";

type Props = { playlist: IPlaylist };

function PlaylistItemBottomButton({ playlist }: Props) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

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
        <PlaylistItemMenu playlist={playlist} close={handleCloseMenu} />
      )}
    </>
  );
}

export default PlaylistItemBottomButton;
