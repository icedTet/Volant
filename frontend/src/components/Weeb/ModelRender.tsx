import { VRM } from "@pixiv/three-vrm";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import React from "react";
import { KalidokitController } from "../../utils/classes/KalidokitController";
export const ModelRenderer = (props: { model: VRM }) => {
  const { model } = props;
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
  useFrame((state, delta, xrFrame) => {
    model?.update(delta);
    // console.log("update", model);
  });
  return (
    <group>
      <primitive object={model?.scene} />
    </group>
  );
};
