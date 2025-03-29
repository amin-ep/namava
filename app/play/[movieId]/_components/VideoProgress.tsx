"use client";

import { useVideo } from "@/app/_contexts/VideoContext";
import { Slider } from "@mui/material";
import styles from "./VideoProgress.module.css";

function VideoProgress() {
  const { videoRef, progressTime } = useVideo();

  const handleChangeInput = (
    e: Event | React.SyntheticEvent,
    val: number | number[],
  ) => {
    if (videoRef?.current) {
      videoRef.current.currentTime = val as number;
    }
  };

  return (
    <div className="mb-4" style={{ direction: "ltr" }}>
      <Slider
        value={progressTime}
        onChange={handleChangeInput}
        onChangeCommitted={handleChangeInput}
        min={0}
        max={videoRef?.current?.duration}
        classes={{
          root: styles.slider,
          thumb: styles["slider-thumb"],
          track: styles["slider-track"],
          marked: styles["slider-marked"],
          rail: styles["slider-rail"],
        }}
      />
    </div>
  );
}

export default VideoProgress;
