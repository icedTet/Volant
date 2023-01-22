import { useEffect, useRef } from "react";

export const ScreenFeed = () => {
  const camRef = useRef<HTMLVideoElement>();
  useEffect(() => {
    let stream = (async () => {
      if (!camRef.current || !globalThis.navigator) {
        console.error("No navigator");
        return;
      }
      let captureStream: MediaStream;

      try {
        captureStream = await navigator.mediaDevices?.getDisplayMedia({
          audio: true,
          video: true,
        });
      } catch (err) {
        console.error(`Error: ${err}`);
      }
      //   const mediaRecorder = new MediaRecorder(captureStream);
      //   mediaRecorder.start();
      camRef.current.srcObject = captureStream;
      return captureStream;
    })();
    return () => {
      // stream.then(s=>)
    };
  }, [camRef]);
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
