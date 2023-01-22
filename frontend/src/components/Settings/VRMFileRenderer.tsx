import { VRM, VRMSchema } from "@pixiv/three-vrm";
import React from "react";
import { useEffect, useState } from "react";
import { AnimationClip, LoopRepeat, PerspectiveCamera, Vector3 } from "three";
import { VRMFile } from "../../utils/classes/VRMLoader";
import { useAnimations } from "@react-three/drei";
export const VRMFileRenderer = (props: {
  model: VRMFile;
  camera: React.MutableRefObject<PerspectiveCamera | null>;
}) => {
  const { model, camera } = props;
  const [modelData, setModelData] = useState(null as VRM | null);
  useEffect(() => {
    if (!model) return;
    model.getVRM().then((vrm) => {
      setModelData(vrm);
    });
  }, [model]);
  useEffect(() => {
    const newVector = new Vector3(0, 0, 0);
    if (!modelData) return;
    modelData.humanoid
      ?.getBoneNode(VRMSchema.HumanoidBoneName.Head)
      ?.getWorldPosition(newVector);
    console.log("newVector", newVector);
    if (newVector)
      camera?.current?.position.set(
        0,
        newVector.y,
        newVector.z + (newVector.y * 0.7) ** 0.8
      );
  }, [modelData]);
  if (!modelData) return null;

  return (
    <group>
      <primitive object={modelData?.scene} scale={1} />
    </group>
  );
};
