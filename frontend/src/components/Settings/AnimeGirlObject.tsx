import { VRM } from "@pixiv/three-vrm";
import { AnimationClip, LoopRepeat } from "three";
import { useAnimations } from "@react-three/drei";
import React, { useEffect } from "react";
export const AnimeGirlObject = (props: {
  model: VRM;
  animation: AnimationClip[];
}) => {
  const { model, animation } = props;
  const { actions, clips, names, mixer, ref } = useAnimations(
    animation,
    model.scene
  );
  useEffect(() => {
    actions?.vrmAnimation?.reset();
    actions?.vrmAnimation?.setLoop(LoopRepeat,999999)
    actions?.vrmAnimation?.play();
    console.log("PLAYING", actions?.vrmAnimation);
  }, []);
  return (
    <group>
      <primitive object={model.scene} />
    </group>
  );
};
