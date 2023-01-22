import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";
import { ModelData, VRMFile, VRMLoader } from "../../utils/classes/VRMLoader";
import { VRMFileRenderer } from "./VRMFileRenderer";
import { PerspectiveCamera as PCamera } from "@react-three/drei";
import { PerspectiveCamera } from "three";
export const AnimeGirlCard = (props: {
  data: ModelData;
  model: VRMFile;
  onClick: (model: VRMFile) => void;
}) => {
  const { data } = props;
  const camera = useRef<PerspectiveCamera>(null);
  return (
    <div
      className={`flex flex-col gap-4 h-[28rem] bg-gray-100 rounded-2xl shadow-md relative overflow-hidden`}
    >
      <div className={`w-full h-full`}>
        <Canvas
          frameloop="demand"
          className={`w-full h-full absolute top-0 left-0`}
        >
          <VRMFileRenderer model={props.model} camera={camera} />
          <ambientLight intensity={3} />
          <PCamera
            makeDefault
            position={[0, 3, 4]}
            zoom={1}
            near={0.1}
            far={1000}
            ref={camera}
          />
        </Canvas>
      </div>
      <div
        className={`absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-b from-transparent via-gray-200/50 to-gray-200`}
      />
      <div className={`absolute bottom-0 left-0 w-full h-fit p-4`}>
        <span className={`text-lg font-bold text-gray-600`}>{data.name}</span>
      </div>
    </div>
  );
};
