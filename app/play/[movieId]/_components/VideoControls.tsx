"use client";

import { useVideo } from "@/app/_contexts/VideoContext";
import VideoControlButton from "./VideoControlButton";
import videoPauseIcon from "../../../../public/icons/pause-white.svg";
import videoFullScreenExitIcon from "../../../../public/icons/fullscreen-exit-white.svg";
import videoMuteIcon from "../../../../public/icons/volume-mute.svg";
import cls from "classnames";
import {
  createTheme,
  Tooltip as MUITooltip,
  Slider,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import localFont from "next/font/local";
import styles from "./VideoControls.module.css";

function VideoControls() {
  const {
    isPlaying,
    togglePlay,
    toggleScreen,
    isFullScreen,
    muted,
    toggleMute,
    backwardTime,
    forwardTime,
    setVolume,
    volume,
  } = useVideo();

  const btnWrapperClasses = "flex items-center gap-4";

  const handleChangeVolumeRange:
    | ((event: Event, value: number | number[], activeThumb: number) => void)
    | undefined = (_e, value) => {
    setVolume(value as number);
  };

  return (
    <div className="flex items-center justify-between">
      <div className={cls(btnWrapperClasses, "justify-start")}>
        {/* FULLSCREEN button */}
        <Tooltip title="بزرگنمایی">
          <VideoControlButton
            alt="screen"
            iconPath={
              isFullScreen
                ? videoFullScreenExitIcon
                : "/icons/fullscreen-white.svg"
            }
            onClick={toggleScreen}
          />
        </Tooltip>
        <div className={styles["volume-container"]}>
          <div className={styles["volume-range-container"]}>
            {/* VOLUME RANGE */}
            <Slider
              onChange={handleChangeVolumeRange}
              min={0}
              max={100}
              value={volume}
              orientation="vertical"
              classes={{
                root: styles.slider,
                thumb: styles["slider-thumb"],
                track: styles["slider-track"],
                marked: styles["slider-marked"],
                rail: styles["slider-rail"],
              }}
            />
          </div>
          {/* VOLUME BUTTON */}
          <VideoControlButton
            alt="volume"
            iconPath={muted ? videoMuteIcon : "/icons/volume-white.svg"}
            onClick={toggleMute}
          />
        </div>
      </div>
      <div className={cls(btnWrapperClasses, "justify-end")}>
        {/* BACKWARD BUTTON */}
        <Tooltip title="ده ثانیه عقب تر">
          <VideoControlButton
            alt="forward"
            iconPath="/icons/forward-10-white.svg"
            onClick={forwardTime}
          />
        </Tooltip>
        {/* FORWARD BUTTON */}
        <Tooltip title="ده ثانیه جلوتر">
          <VideoControlButton
            alt="backward"
            iconPath="/icons/backward-10-white.svg"
            onClick={backwardTime}
          />
        </Tooltip>
        {/* PLAY BUTTON */}
        <Tooltip title={isPlaying ? "توقف" : "پخش"}>
          <VideoControlButton
            alt="play"
            iconPath={
              isPlaying ? videoPauseIcon : "/icons/small-play-white.svg"
            }
            onClick={togglePlay}
          />
        </Tooltip>
      </div>
    </div>
  );
}

// mui tooltip custom font
const customFont = localFont({
  src: "../../../_fonts/Qs_Iranyekan.ttf",
});

type TooltipProps = { children: React.ReactNode; title: string };

// mui tooltip
function Tooltip({ children, title }: TooltipProps) {
  const matches = useMediaQuery("(min-width:768px)");

  // adding custom font on mui tooltip
  const theme = createTheme({
    typography: {
      fontFamily: customFont.style.fontFamily,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MUITooltip
        title={title}
        classes={{
          tooltip: styles.tooltip,
          arrow: styles["tooltip-arrow"],
        }}
        arrow
        disableHoverListener={!matches}
      >
        <div>{children}</div>
      </MUITooltip>
      ;
    </ThemeProvider>
  );
}

export default VideoControls;
