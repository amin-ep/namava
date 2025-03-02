"use client";

import { IComment } from "@/app/_types/commentTypes";
import { cryptEmail, jalaaliDateString } from "@/app/_utils/helpers";
import Image from "next/image";
import React, { useState } from "react";

type Props = { comment: IComment };

function CommentListItem({ comment }: Props) {
  const [textIsOpen, setTextIsOpen] = useState(false);

  const handleOpenText = () => setTextIsOpen(true);
  return (
    <li className="grid grid-cols-[32px_1fr] gap-2 md:grid-cols-[40px_1fr] md:gap-4">
      <div className="flex items-start justify-start">
        <Image
          src="/user-icon.png"
          width={32}
          height={32}
          alt="user"
          className="aspect-square w-8 rounded-full md:w-10"
        />
      </div>
      <div className="mt-2 border-b border-gray-700 md:mt-2.5">
        <div className="mb-[22px] text-gray-400 md:mb-4">
          <span>{cryptEmail(comment.user.email)}</span>
          <span> - </span>
          <span>{jalaaliDateString(comment.createdAt as string)}</span>
        </div>
        {comment.spoils && !textIsOpen ? (
          <OpenSpoiledCommentButton onClick={handleOpenText} />
        ) : (
          <p className="mb-5 leading-[1.75]">{comment.text}</p>
        )}
      </div>
    </li>
  );
}

function OpenSpoiledCommentButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mb-5 grid grid-cols-[20px_1fr_20px] items-center rounded-xl bg-gray-700 px-2 py-3 md:w-[468px] md:grid-cols-[24px_1fr_24px] md:px-3 md:py-4 lg:w-[500px] xl:grid-cols-[28px_1fr_32px]"
    >
      <Image
        src="/icons/yellow-warning.svg"
        alt="warning"
        width={20}
        height={20}
        className="w-5 md:w-6 xl:w-7"
      />
      <div className="inline-block px-3 text-right text-xs leading-[1.75] md:px-2.5 xl:text-sm">
        این نظر حاوی اسپویلر است و داستان فیلم را لو می‌دهد.
      </div>
      <Image
        src="/icons/keyboard-arrow-down-white.svg"
        alt="keyboard-arrow-down"
        width={12}
        height={7}
        className="w-5 md:w-6 xl:w-8"
      />
    </button>
  );
}

export default CommentListItem;
