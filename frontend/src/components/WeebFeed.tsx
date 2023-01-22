import { PerspectiveCamera, Vector3 } from "three";
import { useSelectedModel } from "../utils/hooks/useVRMFile";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera as PCamera } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { ModelRenderer } from "./Weeb/ModelRender";
import React from "react";
import { StreamMerger } from "../utils/classes/StreamMerger";

export const WeebFeed = () => {
  const model = useSelectedModel();
  const camera = useRef<PerspectiveCamera>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // useeff
  // const orbitCamera = new PerspectiveCamera(
  //   35,
  //   window.innerWidth / window.innerHeight,
  //   0.1,
  //   1000
  // );
  // orbitCamera.position.set(0.0, 1.4, 0.7);

  // Import Character VRM
  // Import model from URL, add your own model here

  // Animate Rotation Helper function

  // let oldLookAt = new Euler();

  /* VRM Character Animator */
  const CLog = () => {
    useFrame(() => {
      console.log(
        "frame",
        camera.current?.position,
        camera.current?.zoom,
        camera.current?.rotation,
        model
      );
    });
    return null;
  };
  useEffect(() => {
    if (!camera.current) return;
    console.log("cam");
    console.log(camera.current);
    camera.current.position.set(0.23, 1.5, 1.2);
    camera.current.zoom = 2;
    camera.current.lookAt(0, 1.5, 0);
  }, [camera]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const stream = canvasRef.current.captureStream(60);
    StreamMerger.getInstance().setVideoStream(stream);
  }, []);

  return (
    <div className={`w-full h-full relative`}>
      {/* <CameraFeed /> */}
      <Canvas
        eventSource={globalThis?.document?.getElementById("root")!}
        eventPrefix="client"
        shadows={true}
        className={`bg-gray-500 w-full h-full absolute top-0 left-0`}
        frameloop="always"
        ref={canvasRef}
      >
        <PCamera
          position={new Vector3(0, 2, 3)}
          makeDefault
          zoom={1}
          ref={camera}
        ></PCamera>
        <CLog />
        <ambientLight intensity={2} /> {/* fix lighting later */}
        <OrbitControls camera={camera.current} />
        {model && <ModelRenderer model={model} />}
      </Canvas>
    </div>
  );
};
