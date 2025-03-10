import Image from "next/image";
import React, { useState } from "react";
import PlaylistDropdownMenu from "../../_components/PlaylistDropdownMenu";
import { useSinglePlaylist } from "@/app/_contexts/SinglePlaylistContext";

type Props = { openSortBy: () => void };

function MobileHeadingActions({ openSortBy }: Props) {
  const [moreIsOpen, setMoreIsOpen] = useState(false);

  const { openEditTitle, startDeleting } = useSinglePlaylist();
  return (
    <div className="relative md:hidden">
      <div className="flex items-center justify-start gap-6 text-white">
        <Item
          onClick={openSortBy}
          imageSrc="sort-amount-down-white.svg"
          title="مرتب سازی"
        />
        <Item
          onClick={() => setMoreIsOpen(true)}
          imageSrc="dots-3-vertical-white.svg"
          title="بیشتر"
        />
      </div>
      {moreIsOpen && (
        <PlaylistDropdownMenu
          extraStyles="md:hidden"
          items={[
            {
              alt: "pen",
              iconPath: "pen-white.svg",
              onClick: openEditTitle,
              title: "تغییر نام",
            },
            {
              alt: "trash",
              iconPath: "trash-white.svg",
              onClick: startDeleting,
              title: "حذف از لیست",
            },
          ]}
          close={() => setMoreIsOpen(false)}
        />
      )}
    </div>
  );
}

function Item({
  imageSrc,
  title,
  onClick,
}: {
  title: string;
  imageSrc: string;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="flex items-center gap-1 xsm:gap-2">
      <Image
        src={`/icons/${imageSrc}`}
        alt={title}
        width={24}
        height={24}
        className="aspect-square w-6 xsm:w-8"
      />
      <span className="text-xs font-bold">{title}</span>
    </button>
  );
}

export default MobileHeadingActions;
