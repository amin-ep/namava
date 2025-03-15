"use client";

import React from "react";
import structureStyles from "./ActorBiographySection.module.css";
import { Skeleton, useMediaQuery } from "@mui/material";

function ActorBiographySectionSkeleton() {
  const isXsmWindow = useMediaQuery("(min-width:500px)");
  const isBaseWindow = useMediaQuery("(min-width:900px)");
  const isXlWindow = useMediaQuery("(min-width:1280px)");

  return (
    <div className={structureStyles.container}>
      <div className={structureStyles["image-wrapper"]}>
        <Skeleton
          variant="circular"
          sx={{
            width: isXlWindow
              ? "180px"
              : isBaseWindow
                ? "140px"
                : isXsmWindow
                  ? "150px"
                  : "200px",
            height: isXlWindow
              ? "180px"
              : isBaseWindow
                ? "140px"
                : isXsmWindow
                  ? "150px"
                  : "200px",
            aspectRatio: "1/1",
            bgcolor: "GrayText",
          }}
        />
      </div>
      <div className={structureStyles["text-container"]}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: isBaseWindow ? "36px" : "30px",
            bgcolor: "GrayText",
            borderRadius: "12px",
            marginBottom: isBaseWindow ? "18px" : "16px",
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: isXlWindow ? "168px" : isBaseWindow ? "214px" : "240px",
            bgcolor: "GrayText",
            borderRadius: "12px",
          }}
        />
      </div>
    </div>
  );
}

export default ActorBiographySectionSkeleton;
