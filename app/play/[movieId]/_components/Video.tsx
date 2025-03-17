"use client";

import { useVideo } from "@/app/_contexts/VideoContext";
import { IMovie } from "@/app/_types/movieTypes";
import { FILE_BASE_URL } from "@/app/_utils/constants";
import VideoBottomSection from "./VideoBottomSection";
import VideoTopSection from "./VideoTopSection";

type Props = { movie: IMovie };

function Video({ movie }: Props) {
  const { videoRef } = useVideo();

  return (
    <div className="relative h-screen w-full" id="video-container">
      <VideoTopSection movie={movie} />
      <video
        ref={videoRef}
        src={`${FILE_BASE_URL}/${movie.videoUrl}`}
        className="h-full w-full bg-black"
        poster={`${FILE_BASE_URL}/${movie.bannerImageUrl}`}
      />
      <VideoBottomSection />
    </div>
  );
}

export default Video;
