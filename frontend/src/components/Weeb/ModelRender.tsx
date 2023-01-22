import { VRM, VRMSchema } from "@pixiv/three-vrm";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import React from "react";
import { KalidokitController } from "../../utils/classes/KalidokitController";
import { PerspectiveCamera, Vector3 } from "three";
export const ModelRenderer = (props: {
  model: VRM;
  camera: React.MutableRefObject<PerspectiveCamera | null>;
}) => {
  const { model, camera } = props;
  console.log("ModelRenderer", model);
  const threeData = useThree();

  useEffect(() => {
    console.log("ModelRenderear", model);
    if (!model) {
      console.log("Modle no exist!");
      return () => {};
    }
    const controller = new KalidokitController(model);
    return () => {
      controller.dispose();
    };
  }, [model, threeData]);
  useEffect(() => {
    const newVector = new Vector3(0, 0, 0);
    if (!model) return;
    model.humanoid
      ?.getBoneNode(VRMSchema.HumanoidBoneName.Head)
      ?.getWorldPosition(newVector);
    console.log("newVector", newVector);
    if (newVector)
      camera?.current?.position.set(
        0,
        newVector.y,
        newVector.z + (newVector.y * 1) ** 0.7
      );
    camera.current.rotation.set(0, 0, Math.PI*0.05);
  }, [model]);
  useFrame((state, delta, xrFrame) => {
    model?.update(delta);
    // const newVector = new Vector3(0, 0, 0);
    // const pos = model.humanoid
    // ?.getBoneNode(VRMSchema.HumanoidBoneName.Head)
    // ?.getWorldPosition(newVector);
    // if (pos) {
    //   camera.current.lookAt(pos);
    // }
    // console.log("update", model);
  });
  return (
    <group>
      <primitive object={model?.scene} />
    </group>
  );
};
