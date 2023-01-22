import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { ModelData, VRMFile, VRMLoader } from "../../utils/classes/VRMLoader";
import { VRMFileRenderer } from "./VRMFileRenderer";
import { PerspectiveCamera as PCamera } from "@react-three/drei";
import { AnimationClip, PerspectiveCamera } from "three";
import { loadMixamoAnimation } from "../../utils/loadFBX";
import { usePrimaryModel } from "../../utils/hooks/usePrimaryModel";
export const AnimeGirlCard = (props: {
  data: ModelData;
  model: VRMFile;
  onClick: (model: VRMFile) => void;
}) => {
  const { data, model } = props;
  const pmodel = usePrimaryModel();
  const camera = useRef<PerspectiveCamera>(null);
  return (
    <div
      className={`flex flex-col gap-4 h-[28rem] bg-gray-100 rounded-2xl shadow-md relative overflow-hidden hover:bg-gray-50 group cursor-pointer hover:shadow-lg transition-all ${pmodel === data.id ? `ring-2 ring-purple-500 hover:ring-4`: `hover:ring-2`} duration-300`}
    >
      <div className={`w-full h-full`}>
        <Canvas
          frameloop="demand"
          className={`w-full h-full absolute top-0 left-0`}
        >
          <VRMFileRenderer model={model} camera={camera} />
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
        className={`absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-b from-transparent via-gray-200/50 to-gray-200 group-hover:opacity-80 transition-all duration-300`}
      />
      <div className={`absolute bottom-0 left-0 w-full h-fit p-4`}>
        <span className={`text-lg font-bold text-gray-600`}>{data.name}</span>
      </div>
    </div>
  );
};
