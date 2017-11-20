import React, { Component } from "react";

import { ReactMic } from "react-mic";
import { FloatingActionButton, MuiThemeProvider } from "material-ui";
import "./styles.css";
import MicrophoneOn from "material-ui/svg-icons/av/mic";
import MicrophoneOff from "material-ui/svg-icons/av/stop";

export default class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      blobURLs: [],
      isRecording: false
    };
  }

  startRecording = () => {
    this.setState({
      record: true,
      isRecording: true
    });
  };

  stopRecording = () => {
    this.setState({
      record: false,
      isRecording: false
    });
  };

  onStop(recordedBlob) {
    this.state.blobURLs.unshift(recordedBlob.blobURL);
    this.setState({
      blobURLs: this.state.blobURLs
    });
    this.props.state.cards[this.props.cardIndex].items = this.state.blobURLs;
    this.props.setState({ cards: this.props.state.cards });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="audio">
          <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop.bind(this)}
            strokeColor="#000000"
            backgroundColor="#FF4081"
            height={65}
            width={275}
          />
          <FloatingActionButton
            className="btn"
            secondary={true}
            disabled={this.state.isRecording}
            onClick={this.startRecording}
          >
            <MicrophoneOn />
          </FloatingActionButton>
          <FloatingActionButton
            className="btn"
            secondary={true}
            disabled={!this.state.isRecording}
            onClick={this.stopRecording}
          >
            <MicrophoneOff />
          </FloatingActionButton>
          <div>
            <ul className="board">
              {this.props.card.items.map((blobURL, i) => {
                return (
                  <div key={i} className="board__audio">
                    <audio
                      ref="audioSource"
                      controls="controls"
                      src={blobURL}
                    />
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
