"use client";

import { Modal as MUIModal } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  justifyContent?: string;
  alignItems?: string;
  padding?: string;
  backgroundColor?: string;
}

function Modal({
  onClose,
  open,
  children,
  justifyContent = "center",
  alignItems = "center",
  padding = "0",
  backgroundColor,
}: Props) {
  return (
    <MUIModal
      sx={{
        display: "flex",
        justifyContent: justifyContent,
        alignItems: alignItems,
        padding: padding,
        "& .MuiModal-backdrop": {
          backgroundColor: backgroundColor,
        },
      }}
      open={open}
      onClose={onClose}
    >
      <div>{children}</div>
    </MUIModal>
  );
}

export default Modal;
