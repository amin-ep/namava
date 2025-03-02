"use client";

import { ICreateCommentPayload } from "@/app/_types/commentTypes";
import cls from "classnames";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { createComment } from "../actions";
import styles from "./CommentForm.module.css";
import MiniSpinner from "@/app/_components/MiniSpinner/MiniSpinner";

type Props = { movieId: string };

function CommentForm({ movieId }: Props) {
  const [isPending, startTransition] = useTransition();
  const [spoils, setSpoils] = useState(false);
  const [checkmarkLength, setCheckmarkLength] = useState<null | number>(null);
  const checkboxRef = useRef<null | HTMLInputElement>(null);

  const pathname = usePathname();

  const handleInputChange = (e: React.ChangeEvent) => {
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    reset({
      spoils: spoils,
    });
  }, [spoils, reset]);

  useEffect(() => {
    reset({
      movie: movieId,
      spoils: false,
    });
  }, [movieId, reset]);

  useEffect(() => {
    if (document) {
      if (isPending) {
        document.body.style.cursor = "progress";
      } else {
        document.body.style.cursor = "default";
      }
    }
  }, [isPending]);

  const onSubmit = (data: ICreateCommentPayload) => {
    data.spoils = Boolean(data.spoils);
    startTransition(async () => {
      const res = await createComment(data, pathname.split("/")[2]);

      if (res === "success") {
        reset({ movie: movieId, spoils: false, text: "" });
        if (checkboxRef.current) {
          checkboxRef.current.checked = false;
        }
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
            <input
              type="text"
              {...register("text", {
                required: true,
                minLength: 1,
              })}
              placeholder="نظرتان درباره این فیلم چیست؟"
              className="h-10 rounded-xl bg-white px-2 py-3 text-xs text-gray-900 outline-none placeholder:text-gray-500 md:h-[52px] md:py-4 xl:px-6 xl:py-6"
            />
            <input type="hidden" {...register("movie", { required: true })} />
            <input type="hidden" {...register("spoils")} />
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
          <div>
            <SpoilerCheckbox
              checkmarkLength={checkmarkLength}
              spoils={spoils}
              onChange={handleInputChange}
              ref={checkboxRef}
              setCheckmarkLength={setCheckmarkLength}
              label="این نظر حاوی اسپویلر است و داستان فیلم را لو می‌دهد."
            />
          </div>
        </div>
      </div>
    </form>
  );
}

function SpoilerCheckbox({
  label,
  onChange,
  ref,
  spoils,
  checkmarkLength,
  setCheckmarkLength,
}: {
  label: string;
  onChange: (e: React.ChangeEvent) => void;
  ref: React.Ref<null | HTMLInputElement>;
  spoils: boolean;
  checkmarkLength: number | null;
  setCheckmarkLength: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  return (
    <div className="flex items-center gap-2 text-white">
      <div>
        <input
          id="spoiler-checkbox"
          type="checkbox"
          className={styles.input}
          onChange={onChange}
          ref={ref}
        />
        <svg
          className={cls(
            styles.checkbox,
            spoils ? styles["checkbox-active"] : "",
          )}
          aria-hidden="true"
          viewBox="0 0 17 10"
          fill="none"
        >
          <path
            className={styles["checkbox-path"]}
            d="M1 4.5L5 9L14 1"
            strokeWidth="2"
            stroke={spoils ? "#000" : "none"}
            strokeDasharray={checkmarkLength as number}
            strokeDashoffset={spoils ? 0 : (checkmarkLength as number)}
            ref={(ref) => {
              if (ref) {
                setCheckmarkLength(ref.getTotalLength());
              }
            }}
          />
        </svg>
      </div>
      <label
        className="cursor-pointer text-sm leading-[18px]"
        htmlFor="spoiler-checkbox"
      >
        {label}
      </label>
    </div>
  );
}

export default CommentForm;
