import { useSinglePlaylist } from "@/app/_contexts/SinglePlaylistContext";
import { useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { BiSolidTrashAlt } from "react-icons/bi";
import { HiOutlineXMark } from "react-icons/hi2";
import DeleteItemModal from "./DeleteItemModal";
import cls from "classnames";

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  icon: React.ReactNode;
  onClick: () => void;
  extraStyles?: string;
};

function DeletingOptions() {
  const [warning, setWarning] = useState(false);
  const { endDeleting, selectedMoviesToDelete } = useSinglePlaylist();
  const isLargeWindow = useMediaQuery("(min-width:768px)");

  return (
    <>
      <DeleteItemModal isOpen={warning} onClose={() => setWarning(false)} />
      <div className="flex w-full items-center justify-between md:w-auto md:justify-end md:gap-5 xl:gap-6">
        <Button
          onClick={() => setWarning(true)}
          disabled={selectedMoviesToDelete.length === 0}
          icon={<BiSolidTrashAlt size={isLargeWindow ? 40 : 32} />}
          extraStyles="text-red-light hover:text-red-dark"
        >
          حذف
        </Button>
        <Button
          onClick={endDeleting}
          icon={<HiOutlineXMark size={isLargeWindow ? 22 : 18} />}
        >
          لغو
        </Button>
      </div>
    </>
  );
}

function Button({
  children,
  disabled,
  icon,
  onClick,
  extraStyles,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cls(
        "flex items-center justify-between gap-2 text-white disabled:text-gray-500",
        extraStyles,
      )}
    >
      <span className={cls(disabled && "text-gray-500")}>{icon}</span>
      <span className={cls(disabled && "text-gray-500")}>{children}</span>
    </button>
  );
}

export default DeletingOptions;
