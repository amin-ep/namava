"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useFormAction } from "../_hooks/useFormAction";
import { ICreatePlaylistPayload } from "../_types/playlistTypes";
import { createPlaylist, editPlaylistTitle } from "../playlists/actions";
import LinkButton from "./LinkButton";
import MiniSpinner from "./MiniSpinner/MiniSpinner";
import Modal from "./Modal";
import PlaylistModalTop from "./PlaylistModalTop";
import { useToast } from "../_hooks/useToast";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  type: "create" | "editTitle";
  editId?: string;
  currentTitle?: string;
  movieId?: string;
};

function PlaylistTitleForm({
  onClose,
  isOpen,
  type,
  editId,
  currentTitle,
  movieId,
}: Props) {
  const [isEditing, startTransition] = useTransition();

  const notify = useToast();

  const {
    register,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ICreatePlaylistPayload>({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const { action: formAction, isPending: isCreating } = useFormAction({
    formAction: createPlaylist,
    shouldNotifyOnError: true,
    shouldNotifyOnSuccess: true,
    onSuccess: () => {
      onClose();
    },
  });

  useEffect(() => {
    if (type === "editTitle") {
      reset({
        title: currentTitle,
      });
    } else if (type === "create") {
      reset({
        movies: [movieId],
      });
    }
  }, [currentTitle, movieId, reset, type]);

  const onSubmit = (data: ICreatePlaylistPayload) => {
    startTransition(async () => {
      const editRes = await editPlaylistTitle(data.title, editId as string);
      if (editRes?.status === "success") {
        onClose();
        notify("success", editRes.message);
      } else if (editRes?.status === "error") {
        notify("error", editRes.message);
      }
    });
  };

  return (
    <Modal onClose={onClose} open={isOpen}>
      <div className="w-[296px] rounded-xl bg-gray-900 px-3 pb-6 pt-2.5 text-xs text-white xsm:w-[428px] xsm:px-4 xsm:pb-6 xsm:pt-3.5 xsm:text-sm md:w-[500px] md:px-4 md:pb-6 md:pt-5 xl:w-[500px] xl:px-4 xl:pb-6 xl:pt-4 xl:text-base">
        <PlaylistModalTop
          onClose={onClose}
          title={
            type === "create"
              ? "ساخت لیست جدید"
              : type === "editTitle"
                ? "تغییر نام لیست"
                : ""
          }
        />
        <form
          className="text-center base:mx-auto base:w-80"
          {...(type === "create" && { action: formAction })}
          {...(type === "editTitle" && { onSubmit: handleSubmit(onSubmit) })}
        >
          <label htmlFor="title">نام لیست</label>
          <input
            {...register("title", {
              required: true,
              minLength: 1,
            })}
            type="text"
            id="title"
            className="mt-2 inline-block h-10 w-full rounded-xl border-none bg-gray-700 px-3 py-2 text-center text-xs leading-[21px] text-white focus:bg-white focus:text-gray-700 md:h-[42px] md:text-sm md:leading-[24px]"
          />
          <input type="hidden" {...register("movies")} />
          <LinkButton
            extraStyles="w-full mt-5 xsm:mt-6"
            color="glassy"
            variation="button"
            buttonType="submit"
            disabled={!isValid}
          >
            {isCreating || isEditing ? (
              <MiniSpinner color="white" />
            ) : type === "create" ? (
              "ساخت لیست"
            ) : (
              "ثبت"
            )}
          </LinkButton>
        </form>
      </div>
    </Modal>
  );
}

export default PlaylistTitleForm;
