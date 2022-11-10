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
      <>
        <div className="App">
          <div className="video2-container-styles">
            <div className="file-input">
              <h2 id="title">
                Insert a video from your device & cast it via Chromecast
              </h2>
            </div>

            <video className="video-styles" id="video" controls>
              <source src="" id="source" />
            </video>
            <div className="btn-input-file">
              <input
                className="file-input__label"
                type="file"
                id="input-file"
                accept="video/*"
                onChange={this.handleSelectVideo}
              ></input>
              {this.state.videoSource && (
                <button
                  className="btn-cast"
                  is="google-cast-button"
                  onClick={this.handleCastVideo}
                >
                  Cast Video
                </button>
              )}
            </div>
          </div>
        </div>
        <hr />
      </>
    );
  }
}

render(<App2 />, document.getElementById("root"));
export default App2;
