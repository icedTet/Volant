import React, { useEffect, useRef, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { Holistic } from "@mediapipe/holistic";

export const CameraFeed = () => {
  const camRef = useRef<HTMLVideoElement>();

  const onResults = (results) => {};

  useEffect(() => {
    const holistic = new Holistic({
      locateFile: (file) => {
        return `assets/mediapipe/${file}`;
      },
    });
    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
      refineFaceLandmarks: true,
    });
    holistic.onResults(onResults);

    let videoElement = camRef.current;
    if (camRef.current) {
      const cam = new Camera(videoElement, {
        onFrame: async () => {
          await holistic.send({ image: videoElement });
        },
        width: 640,
        height: 480,
      });
      cam.start();
    }
  }, []);

  return (
    <video
      className="input_video"
      ref={camRef}
      width="1280px"
      height="720px"
      autoPlay
      muted
      playsInline
    />
  );
};
