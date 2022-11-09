import React, { useState } from "react";
import { createRef } from "react";
import videoPlaceHolder from "../assets/150.png";
import {
  Playlist,
  goToNextVideo,
  goToPreviousVideo,
} from "reactjs-video-playlist-player";

import "../styles/videoplayer.css";

import AdsData from "../AdsData";

function VideoPlayer() {
  const [videoList, setVideoList] = useState(AdsData);

  const [currentVideo, setCurrentVideo] = useState(0);
  const vidRef = createRef(null);

  const params = {
    videos: videoList,
    autoPlay: true,
    showQueue: true,
    playForward: true,
    defaultQueueItemPlaceholderThumbnail: videoPlaceHolder,
    currentVideo: currentVideo,
    setCurrentVideo: setCurrentVideo,
    vidRef: vidRef,
  };

  return (
    <div className="App">
      <h3 id="title">
        <span>Create a simple ads list from a json object</span> 🎥
      </h3>
      <div>
        <Playlist playlistParams={params} />
      </div>
    </div>
  );
}

export default VideoPlayer;
