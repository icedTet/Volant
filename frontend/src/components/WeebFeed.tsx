import { lerp, clamp } from "@mediapipe/drawing_utils";
import { VRMUtils, VRM } from "@pixiv/three-vrm";
import THREE, {
  DirectionalLight,
  Euler,
  PerspectiveCamera,
  Quaternion,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { HumanoidBoneName } from "@pixiv/types-vrm-0.0";
import { useSelectedModel } from "../utils/hooks/useVRMFile";
import * as Kalidokit from "kalidokit";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera as PCamera } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { ModelRig } from "../utils/rigBody";
import { CameraFeed } from "./CameraFeed";
import { ModelRenderer } from "./Weeb/ModelRender";
import React from "react";

export const WeebFeed = () => {
  const remap = Kalidokit.Utils.remap;
  const clamp = Kalidokit.Utils.clamp;
  const lerp = Kalidokit.Vector.lerp;

  const model = useSelectedModel();
  const camera = useRef<PerspectiveCamera>();
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

  return (
    <div className={`w-full h-full relative`}>
      {/* <CameraFeed /> */}
      <Canvas
        eventSource={globalThis?.document?.getElementById("root")!}
        eventPrefix="client"
        shadows={true}
        className={`bg-gray-500 w-full h-full absolute top-0 left-0`}
      >
        <PCamera
          position={new Vector3(-1, 0, 4)}
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
