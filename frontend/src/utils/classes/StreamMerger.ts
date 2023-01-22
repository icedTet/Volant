import { EventEmitter } from "events";
import { VideoStreamMerger } from "video-stream-merger";
export class StreamMerger extends EventEmitter {
  static instance: StreamMerger;
  static getInstance(): StreamMerger {
    if (!StreamMerger.instance) {
      StreamMerger.instance = new StreamMerger();
    }
    return StreamMerger.instance;
  }
  videoStream?: MediaStream;
  screenStream?: MediaStream;
  audioStream?: MediaStream;
  merger?: VideoStreamMerger;
  width?: number;
  height?: number;
  fps?: number;
  private constructor() {
    super();
    this.width = 1920;
    this.height = 1080;
    this.fps = 30;
  }
  setStreamResolution(width?: number, height?: number, fps?: number) {
    this.width = width ?? this.width;
    this.height = height ?? this.height;
    this.fps = fps ?? this.fps;
  }
  setVideoStream(stream: MediaStream) {
    this.videoStream = stream;
    this.emit("videoStream", stream);
  }
  setScreenStream(stream: MediaStream) {
    this.screenStream = stream;
    this.emit("screenStream", stream);
  }
  setAudioStream(stream: MediaStream) {
    this.audioStream = stream;
    this.emit("audioStream", stream);
  }
  renderStream() {
    if (!this.videoStream || !this.screenStream || ) {
      return;
    }
    // this.merger = new SimpleStreamMerger({
    //   width: this.width,
    //   height: this.height,
    //   fps: this.fps,
    // });
    // this.merger.addStream(this.screenStream, {
    //   x: 0,
    //   y: 0,
    //   width: this.width,
    //   height: this.height,
    // });
    // this.merger.addStream(this.videoStream, {
    //   x: 0,
    //   y: 0,
    //   width: this.videoStream,
    //   height: this.height,
    // });
    // this.emit("renderStream", this.merger.result);
  }
}
