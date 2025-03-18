"use client";

import { useVideo } from "@/app/_contexts/VideoContext";
import { Slider } from "@mui/material";
import styles from "./VideoProgress.module.css";

function VideoProgress() {
  const { videoRef, progressTime } = useVideo();

  const handleChangeInput:
    | ((event: Event, value: number | number[], activeThumb: number) => void)
    | undefined = (e, val) => {
    videoRef!.current!.currentTime = val as number;
  };

  return (
    <div className="mb-4" style={{ direction: "ltr" }}>
      <Slider
        key={progressTime}
        value={progressTime}
        onChange={handleChangeInput}
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
