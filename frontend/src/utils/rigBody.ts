import {
  VRM,
  VRMExpressionPresetName,
  VRMHumanBoneName,
} from "@pixiv/three-vrm";
import { Euler, Quaternion, Vector3 } from "three";
import * as Kalidokit from "kalidokit";
export const rigPosition = (
  model: VRM,
  name,
  position = { x: 0, y: 0, z: 0 },
  dampener = 1,
  lerpAmount = 0.3
) => {
  if (!model) {
    return;
  }
  const Part = model.humanoid.getBoneNode(VRMHumanBoneName[name]);
  if (!Part) {
    return;
  }
  let vector = new Vector3(
    position.x * dampener,
    position.y * dampener,
    position.z * dampener
  );
  Part.position.lerp(vector, lerpAmount); // interpolate
};
export const rigRotation = (
  model: VRM,
  name,
  rotation = { x: 0, y: 0, z: 0 },
  dampener = 1,
  lerpAmount = 0.3
) => {
  if (!model) {
    return;
  }
  const Part = model.humanoid.getBoneNode(VRMHumanBoneName[name]);
  if (!Part) {
    return;
  }

  let euler = new Euler(
    rotation.x * dampener,
    rotation.y * dampener,
    rotation.z * dampener
  );
  let quaternion = new Quaternion().setFromEuler(euler);
  Part.quaternion.slerp(quaternion, lerpAmount); // interpolate
};
export const rigFace = (riggedFace, model: VRM, oldLookTarget: Euler) => {
  //   const remap = Kalidokit.Utils.remap;
  const clamp = Kalidokit.Utils.clamp;
  const lerp = Kalidokit.Vector.lerp;

  if (!model) {
    return;
  }
  rigRotation(model, "Neck", riggedFace.head, 0.7);

  // Blendshapes and Preset Name Schema
  const Blendshape = model.expressionManager!;
  const PresetName = VRMExpressionPresetName;

  // Simple example without winking. Interpolate based on old blendshape, then stabilize blink with `Kalidokit` helper function.
  // for VRM, 1 is closed, 0 is open.
  riggedFace.eye.l = lerp(
    clamp(1 - riggedFace.eye.l, 0, 1),
    Blendshape.getValue(PresetName.Blink)!,
    0.5
  );
  riggedFace.eye.r = lerp(
    clamp(1 - riggedFace.eye.r, 0, 1),
    Blendshape.getValue(PresetName.Blink)!,
    0.5
  );
  riggedFace.eye = Kalidokit.Face.stabilizeBlink(
    riggedFace.eye,
    riggedFace.head.y
  );
  Blendshape.setValue(PresetName.Blink, riggedFace.eye.l);

  // Interpolate and set mouth blendshapes
  Blendshape.setValue(
    PresetName.Ih,
    lerp(riggedFace.mouth.shape.I, Blendshape.getValue(PresetName.Ih), 0.5)
  );
  Blendshape.setValue(
    PresetName.Aa,
    lerp(riggedFace.mouth.shape.A, Blendshape.getValue(PresetName.Aa), 0.5)
  );
  Blendshape.setValue(
    PresetName.Ee,
    lerp(riggedFace.mouth.shape.E, Blendshape.getValue(PresetName.Ee), 0.5)
  );
  Blendshape.setValue(
    PresetName.Oh,
    lerp(riggedFace.mouth.shape.O, Blendshape.getValue(PresetName.Oh), 0.5)
  );
  Blendshape.setValue(
    PresetName.Ou,
    lerp(riggedFace.mouth.shape.U, Blendshape.getValue(PresetName.Ou), 0.5)
  );

  //PUPILS
  //interpolate pupil and keep a copy of the value
  let lookTarget = new Euler(
    lerp(oldLookTarget.x, riggedFace.pupil.y, 0.4),
    lerp(oldLookTarget.y, riggedFace.pupil.x, 0.4),
    0,
    "XYZ"
  );
  oldLookTarget.copy(lookTarget);
  // console.log(model.scene);
  model.lookAt!.applier.lookAt(lookTarget); // !!TO-DO: Fix this
};
export class ModelRig {
  model: VRM;
  constructor(model: VRM) {
    this.model = model;
  }
  rigPosition = (
    name,
    position = { x: 0, y: 0, z: 0 },
    dampener = 1,
    lerpAmount = 0.3
  ) => {
    rigPosition(this.model, name, position, dampener, lerpAmount);
  };
  rigRotation = (
    name,
    rotation = { x: 0, y: 0, z: 0 },
    dampener = 1,
    lerpAmount = 0.3
  ) => {
    rigRotation(this.model, name, rotation, dampener, lerpAmount);
  };
  rigFace = (riggedFace, oldLookTarget: Euler) => {
    rigFace(riggedFace, this.model, oldLookTarget);
  };
}
