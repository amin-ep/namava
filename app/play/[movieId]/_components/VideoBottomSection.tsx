import React from "react";
import VideoControls from "./VideoControls";
import VideoTimeBar from "./VideoTimeBar";

function VideoBottomSection() {
  return (
    <div className="absolute bottom-5 left-0 right-0 px-6 lg:bottom-8 lg:px-8">
      {/* Duration */}
      <VideoTimeBar />
      {/* Progress bar */}
      <div></div>
      {/* Control buttons */}
      <VideoControls />
    </div>
  );
}

export default VideoBottomSection;
