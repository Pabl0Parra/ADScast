import React, { Component } from "react";
import { render } from "react-dom";

import "../styles/add-cast.css";

class App2 extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      videoSource: "",
    };
  }

  handleSelectVideo = (e) => {
    var input = document.getElementById("input-file");
    var video = document.getElementById("video");
    var source = document.getElementById("source");

    source.src = URL.createObjectURL(input.files[0]);
    this.setState({ videoSource: URL.createObjectURL(input.files[0]) });
    video.load();
    video.play();
  };

  receiverListener(availability) {
    console.log("receiverListener", availability);

    if (availability === chrome.cast.ReceiverAvailability.AVAILABLE) {
      //$(".button").removeAttr("disabled").text("Start");
    }
  }

  onSessionRequestSuccess(session) {
    console.log("onSessionRequestSuccess", session);

    var mediaInfo = new chrome.cast.media.MediaInfo(
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      this.state.videoSource,
      "video/mp4"
    );
    var request = new chrome.cast.media.LoadRequest(mediaInfo);
    session.loadMedia(request, this.onMediaLoadSuccess, this.onError);
  }

  onInitSuccess() {
    console.log("onInitSuccess");
  }

  onError(e) {
    console.log("onError", e);
  }

  sessionListener(e) {
    console.log("sessionListener", e);
  }

  onMediaLoadSuccess(e) {
    console.log("onMediaLoadSuccess", e);
  }

  handleCastVideo = () => {
    chrome.cast.requestSession(this.onSessionRequestSuccess, this.onError);
  };

  componentWillMount() {
    var initializeCastApi = function () {
      console.log("initializeCastApi");
      var sessionRequest = new chrome.cast.SessionRequest(
        chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
      );
      var apiConfig = new chrome.cast.ApiConfig(
        sessionRequest,
        this.sessionListener,
        this.receiverListener
      );
      chrome.cast.initialize(apiConfig, this.onInitSuccess, this.onError);
    };

    if (!chrome.cast || !chrome.cast.isAvailable) {
      setTimeout(initializeCastApi, 1000);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="video2-container-styles">
          <div className="file-input">
            <input
              className="file-input__label"
              type="file"
              id="input-file"
              accept="video/*"
              onChange={this.handleSelectVideo}
            ></input>
            {/* <label className="file-input__label" htmlFor="input-file">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="upload"
                class="svg-inline--fa fa-upload fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                ></path>
              </svg>
              <span>Upload file</span>
            </label> */}
          </div>

          <video className="video-styles" id="video" controls>
            <source src="" id="source" />
          </video>

          {this.state.videoSource && (
            <button is="google-cast-button" onClick={this.handleCastVideo}>
              cast video
            </button>
          )}
        </div>
      </div>
    );
  }
}

render(<App2 />, document.getElementById("root"));
export default App2;
