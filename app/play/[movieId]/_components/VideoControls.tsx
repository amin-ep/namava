"use client";

import { useVideo } from "@/app/_contexts/VideoContext";
import VideoControlButton from "./VideoControlButton";
import videoPauseIcon from "../../../../public/icons/pause-white.svg";
import videoFullScreenExitIcon from "../../../../public/icons/fullscreen-exit-white.svg";
import videoMuteIcon from "../../../../public/icons/volume-mute.svg";
import cls from "classnames";

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
  } = useVideo();

  const btnWrapperClasses = "flex items-center gap-4 xsm:gap-8";

  return (
    <div className="flex items-center justify-between">
      <div className={cls(btnWrapperClasses, "justify-start")}>
        <VideoControlButton
          alt="screen"
          iconPath={
            isFullScreen
              ? videoFullScreenExitIcon
              : "/icons/fullscreen-white.svg"
          }
          onClick={toggleScreen}
        />
        <VideoControlButton
          alt="volume"
          iconPath={muted ? videoMuteIcon : "/icons/volume-white.svg"}
          onClick={toggleMute}
        />
      </div>
      <div className={cls(btnWrapperClasses, "justify-end")}>
        <VideoControlButton
          alt="play"
          iconPath="/icons/forward-10-white.svg"
          onClick={forwardTime}
        />
        <VideoControlButton
          alt="backward"
          iconPath="/icons/backward-10-white.svg"
          onClick={backwardTime}
        />
        <VideoControlButton
          alt="play"
          iconPath={isPlaying ? videoPauseIcon : "/icons/small-play-white.svg"}
          onClick={togglePlay}
        />
      </div>
    </div>
  );
}

export default VideoControls;
