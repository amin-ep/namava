"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface IContext {
  isPlaying: boolean;
  isFullScreen: boolean;
  togglePlay: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null> | null;
  toggleScreen: () => void;
  duration: number;
  progressRef: React.RefObject<HTMLInputElement | null> | null;
  progressTime: number;
  muted: boolean;
  toggleMute: () => void;
  forwardTime: () => void;
  backwardTime: () => void;
  changeSpeed: (n: number) => void;
  playingSpeed: number;
}

const VideoContext = createContext({
  isPlaying: false,
  isFullScreen: false,
  togglePlay: () => {},
  videoRef: null,
  toggleScreen() {},
  duration: 0,
  progressRef: null,
  progressTime: 0,
  muted: false,
  toggleMute() {},
  backwardTime() {},
  forwardTime() {},
  changeSpeed() {},
  playingSpeed: 1,
} as IContext);

export function VideoProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [progressTime, setProgressTime] = useState(0);
  const [playingSpeed, setPlayingSpeed] = useState<number>(1);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<null | HTMLInputElement>(null);
  const playAnimationRef = useRef<number | null>(null);

  const handleTogglePlaying = () =>
    setIsPlaying((playingState) => !playingState);

  // Toggle Fullscreen
  const toggleScreen = () => setFullScreen((scrn) => !scrn);

  const toggleMute = () => setMuted((m) => !m);

  const handleChangePlayingSpeed = (value: number) => {
    setPlayingSpeed(value);
  };

  const handleForwardTime = () => {
    videoRef.current!.currentTime += 10;
  };

  const handleBackwardTime = () => {
    videoRef.current!.currentTime -= 10;
  };

  const updateProgress = useCallback(() => {
    if (!videoRef.current) return;

    const currentTime = videoRef.current.currentTime;
    setProgressTime(currentTime);
    if (progressRef.current) progressRef.current.value = currentTime.toString();

    if (isPlaying)
      playAnimationRef.current = requestAnimationFrame(updateProgress);
  }, [isPlaying]);

  // handle isPlaying
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
        playAnimationRef.current = requestAnimationFrame(updateProgress);
      } else {
        videoRef.current.pause();
        cancelAnimationFrame(playAnimationRef.current!);
      }
    }
  }, [isPlaying, fullScreen, updateProgress, videoRef]);

  // handle fullscreen
  useEffect(() => {
    if (document) {
      const element = document.getElementById("video-container");
      if (fullScreen) {
        element?.requestFullscreen();
      } else if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  }, [fullScreen]);

  useEffect(() => {
    videoRef.current!.playbackRate = playingSpeed;
  }, [playingSpeed]);

  useEffect(() => {
    // setting duration
    if (videoRef.current) {
      const seconds = videoRef.current.duration;
      setDuration(seconds);
      if (progressRef.current) {
        progressRef.current.max = seconds.toString();
      }
    }
    // handle fullscreen change event
    if (document) {
      const handleOnFullScreenChange = () => {
        setFullScreen(!!document.fullscreenElement);
      };
      document.addEventListener("fullscreenchange", handleOnFullScreenChange);

      return () =>
        document.removeEventListener(
          "fullscreenchange",
          handleOnFullScreenChange,
        );
    }
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    if (muted) {
      videoRef.current.muted = true;
    } else {
      videoRef.current.muted = false;
    }
  }, [muted]);

  return (
    <VideoContext
      value={{
        isPlaying,
        togglePlay: handleTogglePlaying,
        videoRef: videoRef,
        toggleScreen: toggleScreen,
        isFullScreen: fullScreen,
        duration,
        progressRef,
        progressTime,
        muted,
        backwardTime: handleBackwardTime,
        forwardTime: handleForwardTime,
        toggleMute,
        changeSpeed: handleChangePlayingSpeed,
        playingSpeed: playingSpeed,
      }}
    >
      {children}
    </VideoContext>
  );
}

export const useVideo = () => {
  const context = useContext(VideoContext);

  if (context === undefined) {
    throw new Error("context is used outside the provider");
  }

  return context;
};
