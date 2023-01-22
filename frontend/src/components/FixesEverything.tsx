import React from "react";
import { useEffect, useRef } from "react";
import { KalidokitController } from "../utils/classes/KalidokitController";

export const FixesEverything = () => {
  const input_video = useRef<HTMLVideoElement>(null);
  const guides = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const kc = new KalidokitController(
      input_video.current!,
      `possiblecuteanimegirl.vrm`,
      guides.current!
    );
    kc.init(() => {});
  }, []);

  return (
    <div className={`w-96 h-72 absolute bottom-0 right-0 z-10`}>
      <div className={`-scale-x-100 w-96 h-72 relative`}>
        <video
          ref={input_video}
          autoPlay
          muted
          playsInline
          className={`w-full h-full absolute top-0 left-0`}
          id="input_video"
        ></video>
        <canvas
          ref={guides}
          className={`w-full h-full absolute top-0 left-0`}
        />
      </div>
    </div>
  );
};
