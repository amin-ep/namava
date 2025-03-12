import { Skeleton } from "@mui/material";
import React from "react";
import styles from "./NeonCard.module.css";
import cls from "classnames";

function NeonSkeleton() {
  return (
    <Skeleton
      animation="wave"
      className={cls(styles.img, "z-[1]")}
      sx={{
        bgcolor: "GrayText",
        width: "100%",
        height: "100%",
      }}
    />
  );
}

export default NeonSkeleton;
