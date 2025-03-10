"use client";

import PlaylistTitleForm from "@/app/_components/PlaylistTitleForm";
import { useSinglePlaylist } from "@/app/_contexts/SinglePlaylistContext";
import { IPlaylist } from "@/app/_types/playlistTypes";
import DeletingOptions from "./DeletingOptions";
import MobileHeadingActions from "./MobileHeadingActions";
import TooltipButton from "./TooltipButton";
import PlaylistDropdownMenu from "../../_components/PlaylistDropdownMenu";
import { useState } from "react";

type Props = { title: IPlaylist["title"]; playlist: IPlaylist; length: number };

function SinglePlaylistHeading({ length, playlist, title }: Props) {
  const [openSortBy, setOpenSortBy] = useState(false);
  const {
    isDeleting,
    openEditTitle,
    closeEditTitle,
    editTitleFormIsOpen,
    startDeleting,
    sortBy,
    sortNewest,
    sortOldest,
  } = useSinglePlaylist();

  const handleOpenSortBy = () => setOpenSortBy(true);

  return (
    <div className="relative">
      <div className="mb-6 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        {!isDeleting ? (
          <p className="align-middle text-base">
            <span>{title}</span>
            <span className="text-gray-400">({length})</span>
          </p>
        ) : (
          <p className="text-center text-sm leading-6 md:text-right md:text-base xl:text-xl">
            فیلم های مورد نظر را برای حذف از لیست {title} انتخاب کنید
          </p>
        )}
        {!isDeleting ? (
          <>
            <div className="hidden items-center justify-end gap-6 md:flex">
              <TooltipButton
                onClick={handleOpenSortBy}
                img={{ alt: "فیلتر", src: "/icons/sort-amount-down-white.svg" }}
                tooltipTitle="جدیدترین به قدیمی ترین"
              />
              <TooltipButton
                onClick={openEditTitle}
                img={{ alt: "تغییر نام", src: "/icons/pen-white.svg" }}
                tooltipTitle="تغییر نام"
              />
              {playlist.movies.length > 0 && (
                <TooltipButton
                  onClick={startDeleting}
                  img={{ alt: "حذف", src: "/icons/trash-white.svg" }}
                  tooltipTitle="حذف از لیست"
                />
              )}
            </div>
            <MobileHeadingActions openSortBy={handleOpenSortBy} />
          </>
        ) : (
          <DeletingOptions />
        )}
      </div>
      <PlaylistTitleForm
        isOpen={editTitleFormIsOpen}
        onClose={closeEditTitle}
        type="editTitle"
        currentTitle={title}
        editId={playlist._id}
      />
      {openSortBy && (
        <PlaylistDropdownMenu
          extraStyles="right-0 md:right-[unset] md:left-[107px] xl:left-[127px]"
          items={[
            {
              alt: "newest",
              iconPath: sortBy === "newest" ? "mark-nobg-white.svg" : undefined,
              onClick: sortNewest,
              title: "جدیدترین به قدیمی ترین",
              extraStyles: "border-b-gray-500 border-b",
            },
            {
              alt: "oldest",
              iconPath: sortBy === "oldest" ? "mark-nobg-white.svg" : undefined,
              onClick: sortOldest,
              title: "جدیدترین به قدیمی ترین",
            },
          ]}
          close={() => setOpenSortBy(false)}
        />
      )}
    </div>
  );
}

export default SinglePlaylistHeading;
