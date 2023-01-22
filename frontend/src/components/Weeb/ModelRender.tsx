import { VRM } from "@pixiv/three-vrm";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Euler } from "three";
import { ModelRig } from "../../utils/rigBody";
import * as Kalidokit from "kalidokit";
import { NormalizedLandmarkList, Results } from "@mediapipe/holistic";
import { FaceAI } from "../../utils/classes/FaceAI";
import { useEffect } from "react";
import React from "react";
const prepAnimate = (model: VRM) => {
  const modelRig = new ModelRig(model);
  const oldLookAt = new Euler();
  return (
    results: Results & {
      ea: NormalizedLandmarkList;
    }
  ) => {
    if (!model) {
      return;
    }
    // Take the results from `Holistic` and animate character based on its Face, Pose, and Hand Keypoints.
    let riggedPose, riggedLeftHand, riggedRightHand, riggedFace;

    const faceLandmarks = results.faceLandmarks;
    // Pose 3D Landmarks are with respect to Hip distance in meters
    const pose3DLandmarks = results.ea;
    // Pose 2D landmarks are with respect to videoWidth and videoHeight
    const pose2DLandmarks = results.poseLandmarks;
    // Be careful, hand landmarks may be reversed
    const leftHandLandmarks = results.rightHandLandmarks;
    const rightHandLandmarks = results.leftHandLandmarks;

    // Animate Face
    if (faceLandmarks) {
      riggedFace = Kalidokit.Face.solve(faceLandmarks, {
        runtime: "mediapipe",
        // video: document.getElementById("input_video") as HTMLVideoElement,
      });
    //   console.log(oldLookAt);
      modelRig.rigFace(riggedFace, oldLookAt);
    }
    // Animate Pose
    if (pose2DLandmarks && pose3DLandmarks) {
      riggedPose = Kalidokit.Pose.solve(pose3DLandmarks, pose2DLandmarks, {
        runtime: "mediapipe",
        // video: document.getElementById("input_video") as HTMLVideoElement,
      });
      modelRig.rigRotation("Hips", riggedPose.Hips.rotation, 0.7);
      modelRig.rigPosition(
        "Hips",
        {
          x: -riggedPose.Hips.position.x, // Reverse direction
          y: riggedPose.Hips.position.y + 1, // Add a bit of height
          z: -riggedPose.Hips.position.z, // Reverse direction
        },
        1,
        0.07
      );

      modelRig.rigRotation("Chest", riggedPose.Spine, 0.25, 0.3);
      modelRig.rigRotation("Spine", riggedPose.Spine, 0.45, 0.3);

      modelRig.rigRotation("RightUpperArm", riggedPose.RightUpperArm, 1, 0.3);
      modelRig.rigRotation("RightLowerArm", riggedPose.RightLowerArm, 1, 0.3);
      modelRig.rigRotation("LeftUpperArm", riggedPose.LeftUpperArm, 1, 0.3);
      modelRig.rigRotation("LeftLowerArm", riggedPose.LeftLowerArm, 1, 0.3);

      modelRig.rigRotation("LeftUpperLeg", riggedPose.LeftUpperLeg, 1, 0.3);
      modelRig.rigRotation("LeftLowerLeg", riggedPose.LeftLowerLeg, 1, 0.3);
      modelRig.rigRotation("RightUpperLeg", riggedPose.RightUpperLeg, 1, 0.3);
      modelRig.rigRotation("RightLowerLeg", riggedPose.RightLowerLeg, 1, 0.3);
    }

    // Animate Hands
    if (leftHandLandmarks) {
      riggedLeftHand = Kalidokit.Hand.solve(leftHandLandmarks, "Left");
      modelRig.rigRotation("LeftHand", {
        // Combine pose rotation Z and hand rotation X Y
        z: riggedPose.LeftHand.z,
        y: riggedLeftHand.LeftWrist.y,
        x: riggedLeftHand.LeftWrist.x,
      });
      modelRig.rigRotation("LeftRingProximal", riggedLeftHand.LeftRingProximal);
      modelRig.rigRotation(
        "LeftRingIntermediate",
        riggedLeftHand.LeftRingIntermediate
      );
      modelRig.rigRotation("LeftRingDistal", riggedLeftHand.LeftRingDistal);
      modelRig.rigRotation(
        "LeftIndexProximal",
        riggedLeftHand.LeftIndexProximal
      );
      modelRig.rigRotation(
        "LeftIndexIntermediate",
        riggedLeftHand.LeftIndexIntermediate
      );
      modelRig.rigRotation("LeftIndexDistal", riggedLeftHand.LeftIndexDistal);
      modelRig.rigRotation(
        "LeftMiddleProximal",
        riggedLeftHand.LeftMiddleProximal
      );
      modelRig.rigRotation(
        "LeftMiddleIntermediate",
        riggedLeftHand.LeftMiddleIntermediate
      );
      modelRig.rigRotation("LeftMiddleDistal", riggedLeftHand.LeftMiddleDistal);
      modelRig.rigRotation(
        "LeftThumbProximal",
        riggedLeftHand.LeftThumbProximal
      );
      modelRig.rigRotation(
        "LeftThumbIntermediate",
        riggedLeftHand.LeftThumbIntermediate
      );
      modelRig.rigRotation("LeftThumbDistal", riggedLeftHand.LeftThumbDistal);
      modelRig.rigRotation(
        "LeftLittleProximal",
        riggedLeftHand.LeftLittleProximal
      );
      modelRig.rigRotation(
        "LeftLittleIntermediate",
        riggedLeftHand.LeftLittleIntermediate
      );
      modelRig.rigRotation("LeftLittleDistal", riggedLeftHand.LeftLittleDistal);
    }
    if (rightHandLandmarks) {
      riggedRightHand = Kalidokit.Hand.solve(rightHandLandmarks, "Right");
      modelRig.rigRotation("RightHand", {
        // Combine Z axis from pose hand and X/Y axis from hand wrist rotation
        z: riggedPose.RightHand.z,
        y: riggedRightHand.RightWrist.y,
        x: riggedRightHand.RightWrist.x,
      });
      modelRig.rigRotation(
        "RightRingProximal",
        riggedRightHand.RightRingProximal
      );
      modelRig.rigRotation(
        "RightRingIntermediate",
        riggedRightHand.RightRingIntermediate
      );
      modelRig.rigRotation("RightRingDistal", riggedRightHand.RightRingDistal);
      modelRig.rigRotation(
        "RightIndexProximal",
        riggedRightHand.RightIndexProximal
      );
      modelRig.rigRotation(
        "RightIndexIntermediate",
        riggedRightHand.RightIndexIntermediate
      );
      modelRig.rigRotation(
        "RightIndexDistal",
        riggedRightHand.RightIndexDistal
      );
      modelRig.rigRotation(
        "RightMiddleProximal",
        riggedRightHand.RightMiddleProximal
      );
      modelRig.rigRotation(
        "RightMiddleIntermediate",
        riggedRightHand.RightMiddleIntermediate
      );
      modelRig.rigRotation(
        "RightMiddleDistal",
        riggedRightHand.RightMiddleDistal
      );
      modelRig.rigRotation(
        "RightThumbProximal",
        riggedRightHand.RightThumbProximal
      );
      modelRig.rigRotation(
        "RightThumbIntermediate",
        riggedRightHand.RightThumbIntermediate
      );
      modelRig.rigRotation(
        "RightThumbDistal",
        riggedRightHand.RightThumbDistal
      );
      modelRig.rigRotation(
        "RightLittleProximal",
        riggedRightHand.RightLittleProximal
      );
      modelRig.rigRotation(
        "RightLittleIntermediate",
        riggedRightHand.RightLittleIntermediate
      );
      modelRig.rigRotation(
        "RightLittleDistal",
        riggedRightHand.RightLittleDistal
      );
    }
  };
};
export const ModelRenderer = (props: { model?: VRM | null }) => {
  const { model } = props;
  const oldLookat = useRef(new Euler());

  useFrame((state, delta, xrFrame) => {
    model?.update(delta);
  });
  useEffect(() => {
    if (!model) return;
    const preprig = prepAnimate(model);
    FaceAI.getInstance().on("results", preprig);
    return () => {
      FaceAI.getInstance().off("results", preprig);
    };
  }, [model]);
  if (!model) return null;

  return (
    <group>
      <primitive object={model.scene} />
    </group>
  );
};
