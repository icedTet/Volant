import { lerp, clamp } from "@mediapipe/drawing_utils";
import {
  VRMUtils,
  VRM,
  VRMHumanBoneName,
  VRMExpressionPresetName,
} from "@pixiv/three-vrm";
import THREE, {
  DirectionalLight,
  Euler,
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
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { ModelRig } from "../utils/rigBody";
import { CameraFeed } from "./CameraFeed";
import { ModelRenderer } from "./Weeb/ModelRender";
import React from "react";

export const WeebFeed = () => {
  const remap = Kalidokit.Utils.remap;
  const clamp = Kalidokit.Utils.clamp;
  const lerp = Kalidokit.Vector.lerp;

  const model = useSelectedModel();
  const camera = useRef();
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

  return (
    <div className={`w-screen h-screen`}>
      <CameraFeed />
      <Canvas
        eventSource={globalThis?.document?.getElementById("root")!}
        eventPrefix="client"
        shadows={true}
        className={`bg-gray-500 w-full h-full absolute top-0 left-0`}
      >
        <PerspectiveCamera
          position={new Vector3(-1, 2, 5)}
          makeDefault
          zoom={0.5}
          ref={camera}
        ></PerspectiveCamera>
        <ambientLight intensity={1} /> {/* fix lighting later */}
        <OrbitControls camera={camera.current} />
        <ModelRenderer model={model} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"orange"} />
        </mesh>
      </Canvas>
    </div>
  );
};
