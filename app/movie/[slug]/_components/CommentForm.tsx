"use client";

import MiniSpinner from "@/app/_components/MiniSpinner/MiniSpinner";
import { ICreateCommentPayload } from "@/app/_types/commentTypes";
import Checkbox from "@/app/_components/Checkbox/Checkbox";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { createComment } from "../actions";

type Props = { movieId: string };

function CommentForm({ movieId }: Props) {
  const [isPending, startTransition] = useTransition();
  const [spoils, setSpoils] = useState(false);
  const pathname = usePathname();

  // spoils checkbox on change function
  const handleSpoilsChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSpoils(target.checked);
  };

  const {
    register,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ICreateCommentPayload>({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      movie: movieId,
      spoils: spoils,
    });
  }, [movieId, reset, spoils]);

  // if comment is sending set the cursor on progress
  useEffect(() => {
    if (document) {
      if (isPending) {
        document.body.style.cursor = "progress";
      } else {
        document.body.style.cursor = "default";
      }
    }
  }, [isPending]);

  // send comment
  const onSubmit = (data: ICreateCommentPayload) => {
    data.spoils = Boolean(data.spoils);
    startTransition(async () => {
      const res = await createComment(data, pathname.split("/")[2]);

      if (res === "success") {
        reset({ movie: movieId, spoils: false, text: "" });
        setSpoils(false);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-[2rem_1fr] items-start gap-3 md:grid-cols-[2.5rem_1fr]">
        <Image
          className="mt-1 aspect-square w-full rounded-full md:mt-2"
          src="/user-icon.png"
          alt="user"
          width={32}
          height={32}
        />
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[1fr_2rem] items-center gap-2 md:grid-cols-[1fr_2.5rem] md:gap-6">
            {/* COMMENT TEXT INPUT */}
            <input
              type="text"
              {...register("text", {
                required: true,
                minLength: 1,
              })}
              placeholder="نظرتان درباره این فیلم چیست؟"
              className="h-10 rounded-xl bg-white px-2 py-3 text-xs text-gray-900 outline-none placeholder:text-gray-500 md:h-[52px] md:py-4 xl:px-6 xl:py-6"
            />
            {/* COMMENT MOVIE INPUT */}
            <input type="hidden" {...register("movie", { required: true })} />
            {/* COMMENT SPOIL INPUT */}
            <input type="hidden" {...register("spoils")} />
            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={!isValid}
              className="flex aspect-square w-8 cursor-pointer items-center justify-center rounded-full bg-[#99c14d] disabled:cursor-default disabled:bg-gray-500 md:w-10"
            >
              {isPending ? (
                <MiniSpinner color="black" />
              ) : (
                <Image
                  src="/icons/send-left.svg"
                  alt="send"
                  width={32}
                  height={32}
                  className="w-8 md:w-9"
                />
              )}
            </button>
          </div>
          {/* SPOILS CHECKBOX */}
          <div>
            <Checkbox
              checked={spoils}
              setChecked={setSpoils}
              onChangeCallback={handleSpoilsChange}
              label="این نظر حاوی اسپویلر است و داستان فیلم را لو می‌دهد."
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default CommentForm;
