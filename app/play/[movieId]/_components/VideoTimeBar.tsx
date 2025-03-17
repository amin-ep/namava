"use client";

import { useVideo } from "@/app/_contexts/VideoContext";

function VideoTimeBar() {
  const { duration, progressTime } = useVideo();
  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const hours = Math.floor(time / 3600);
      const formatHours = hours < 1 ? `0${hours}` : hours.toString();
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
      return `${formatHours}:${formatMinutes}:${formatSeconds}`;
    } else {
      return "00:00:00";
    }
  };

  return (
    <div className="flex w-full items-center justify-between text-white">
      <span>{formatTime(duration)}</span>
      <span>{formatTime(progressTime)}</span>
    </div>
  );
}

export default VideoTimeBar;
