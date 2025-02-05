"use client";

import { Modal as MUIModal } from "@mui/material";
interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ onClose, open, children }: Props) {
  return (
    <MUIModal
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      open={open}
      onClose={onClose}
    >
      <div>{children}</div>
    </MUIModal>
  );
}

export default Modal;
