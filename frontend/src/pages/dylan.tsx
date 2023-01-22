import React, { useEffect, useRef } from "react";
import { Camera } from "@mediapipe/camera_utils";
import {
  FACEMESH_TESSELATION,
  HAND_CONNECTIONS,
  POSE_CONNECTIONS,
} from "@mediapipe/holistic";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { FaceAI } from "../utils/classes/FaceAI";
import { SocketConnection } from "../utils/classes/SocketStreamer";
import { Sidebar } from "../components/Sidebar";

export const dylan = () => {
  const input_video = useRef<any>();
  const guides = useRef<any>();
  const random = useRef(0);
  useEffect(() => {
    const videoElement = input_video.current!;
    let rando = ~~(Math.random() * 1000000000);
    random.current = parseInt(`${rando}`);
    const drawResults = (results) => {
      const guideCanvas = guides.current!;

      guideCanvas.width = videoElement.videoWidth;
      guideCanvas.height = videoElement.videoHeight;
      let canvasCtx = guideCanvas.getContext("2d")!;
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, guideCanvas.width, guideCanvas.height);
      // Use `Mediapipe` drawing functions
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: "#00cff7",
        lineWidth: 4,
      });
      drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: "#ff0364",
        lineWidth: 2,
      });
      drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION, {
        color: "#C0C0C070",
        lineWidth: 1,
      });
      if (results.faceLandmarks && results.faceLandmarks.length === 478) {
        //draw pupils
        drawLandmarks(
          canvasCtx,
          [results.faceLandmarks[468], results.faceLandmarks[468 + 5]],
          {
            color: "#ffe603",
            lineWidth: 2,
          }
        );
      }
      drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
        color: "#eb1064",
        lineWidth: 5,
      });
      drawLandmarks(canvasCtx, results.leftHandLandmarks, {
        color: "#00cff7",
        lineWidth: 2,
      });
      drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, {
        color: "#22c3e3",
        lineWidth: 5,
      });
      drawLandmarks(canvasCtx, results.rightHandLandmarks, {
        color: "#ff0364",
        lineWidth: 2,
      });
    };

    let cam = new Camera(videoElement, {
      onFrame: async () => {
        rando === random.current &&
          (await FaceAI.getInstance().send({ image: videoElement }));
        // console.log("send3");
      },
      width: 640,
      height: 480,
    });
    cam.start();
    FaceAI.getInstance().on("results", drawResults);

    return () => {
      cam.stop();
      // cam
      FaceAI.getInstance().off("results", drawResults);
    };
  }, []);

  const dylanSocketTest = () => {
    const server = new SocketConnection();
    console.log("create socket connection");

    const mediaStream = input_video.current.captureStream(30);
    const mediaRecorder = new MediaRecorder(mediaStream, {
      mimeType: "video/webm",
      videoBitsPerSecond: 3000000,
    });

    console.log(mediaStream);

    mediaRecorder.ondataavailable = (e: BlobEvent) => {
      console.log("data avaliable" + e.data);
      server.getSocket().emit("message", e.data);
    };

    mediaRecorder.start(100);

    console.log(mediaRecorder);
  };

  return (
    <div className={`w-full h-full`}>
      <Sidebar/>
      <div className={`w-96 h-72 absolute bottom-0 right-0 z-10`}>
        <div className={`-scale-x-100 w-96 h-72 relative`}>
          <video
            ref={input_video}
            autoPlay
            muted
            playsInline
            className={`w-full h-full absolute top-0 left-0`}
          ></video>
          <canvas
            ref={guides}
            className={`w-full h-full absolute top-0 left-0`}
          />
        </div>
      </div>
      <button onClick={dylanSocketTest}>socket</button>
    </div>
  );
};

export default dylan;
