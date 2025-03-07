"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, useTransition } from "react";
import Modal from "../Modal";
import PlaylistModalTop from "../PlaylistModalTop";
import PlaylistTitleForm from "../PlaylistTitleForm";
import { IGetCurrentUserPlaylist } from "@/app/_types/playlistTypes";
import { API_BASE_URL, JWT_SECRET_KEY } from "@/app/_utils/constants";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import cls from "classnames";
import ListStackedImagesCard from "../ListStackedImagesCard/ListStackedImagesCard";
import { addSingleMovieToList } from "@/app/playlists/actions";
import { useToast } from "@/app/_hooks/useToast";
import MiniSpinner from "../MiniSpinner/MiniSpinner";

async function getCurrentUserList() {
  try {
    const token = Cookies.get(JWT_SECRET_KEY);
    const res: AxiosResponse<IGetCurrentUserPlaylist> = await axios.get(
      `${API_BASE_URL}/list/myList`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.data.status === "success") {
      return res.data.data;
    }
  } catch (err) {
    console.log(err);
  }
}

type Props = { isOpen: boolean; onClose: () => void; movieId: string };

function PlaylistModal({ isOpen, onClose, movieId }: Props) {
  const [newPlaylistIsOpen, setNewPlaylistIsOpen] = useState(false);
  const [isAdding, startTransition] = useTransition();

  const notify = useToast();

  // Get user playlist data
  const { data: playLists, isLoading } = useQuery({
    queryKey: ["playlists"],
    queryFn: getCurrentUserList,
  });
  const queryClient = useQueryClient();
  // some elements classes
  const listCardWrapperClasses =
    "flex h-[60px] w-[100px] xsm:h-[84px] xsm:w-[140px]";
  const buttonTitleClasses = "text-[10px] xsm:text-xs md:text-sm";
  const buttonClasses =
    "flex items-center gap-3 align-middle xsm:gap-4 md:gap-5";

  // add movie to playlist
  const handleAddMovieToPlaylist = async (id: string) => {
    startTransition(async () => {
      // check if movie is added send notification and return
      const targetPlaylist = playLists?.find((el) => el._id === id);
      const movieIsAddedToPlaylist = targetPlaylist?.movies.some(
        (movie) => movie._id === movieId,
      );
      if (movieIsAddedToPlaylist) {
        notify("error", "این عنوان قبلا به لیست افزوده شده است.");
        return;
      }

      // if movie is not added add it into target list
      const res = await addSingleMovieToList(id, movieId);
      if (res?.status === "success") {
        queryClient.invalidateQueries({
          queryKey: ["playlists"],
        });
        notify("success", res.message);
        onClose();
      } else {
        notify("success", res?.message as string);
      }
    });
  };

  useEffect(() => {
    if (document) {
      if (isAdding) {
        document.body.style.cursor = "progress";
      } else {
        document.body.style.cursor = "default";
      }
    }
  }, [isAdding]);

  return (
    <>
      <Modal onClose={onClose} open={isOpen}>
        <div className="flex h-[350px] w-80 flex-col rounded-xl bg-gray-900 px-3 pb-6 pt-2.5 text-xs text-white xsm:h-[442px] xsm:w-[452px] xsm:px-4 xsm:pb-6 xsm:pt-3.5 xsm:text-sm md:h-[446px] md:w-[600px] md:pt-5 xl:h-[458px] xl:pt-4">
          <PlaylistModalTop title="افزودن به لیست" onClose={onClose} />
          {!isLoading ? (
            <div className="gray-scroll flex h-full flex-col gap-5 overflow-auto">
              <button
                onClick={() => setNewPlaylistIsOpen(true)}
                className={buttonClasses}
              >
                <div
                  className={cls(
                    "items-center justify-center rounded-md bg-gray-700",
                    listCardWrapperClasses,
                  )}
                >
                  +
                </div>
                <p className={buttonTitleClasses}>ساخت لیست جدید</p>
              </button>
              {playLists?.map((pl) => (
                <button
                  onClick={() => handleAddMovieToPlaylist(pl._id)}
                  key={pl._id}
                  className={cls(buttonClasses, "relative")}
                >
                  <ListStackedImagesCard
                    playlist={pl}
                    extraStyles={listCardWrapperClasses}
                  />
                  <p>{pl.title}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <MiniSpinner color="primary" />
            </div>
          )}
        </div>
      </Modal>
      <PlaylistTitleForm
        type="create"
        movieId={movieId}
        isOpen={newPlaylistIsOpen}
        onClose={() => setNewPlaylistIsOpen(false)}
      />
    </>
  );
}

export default PlaylistModal;
