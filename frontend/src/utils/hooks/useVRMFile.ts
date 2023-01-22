import { VRM } from "@pixiv/three-vrm";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { VRMFile, VRMLoader } from "../classes/VRMLoader";

export const useSelectedModel = () => {
  const [model, setModel] = useState(null as null | VRM | undefined); //undefined if not loaded, null if loaded but not set yet

  useEffect(() => {
    // const onLoaded = async () => {
    //   const model = VRMLoader.getInstance().getPrimaryModel();
    //   await model.getVRM();

    //   if (VRMLoader.getInstance()) setModel(model.model);
    // };
    // if (!VRMLoader.getInstance().ready) {
    //   VRMLoader.getInstance().on("ready", onLoaded);
    //   VRMLoader.getInstance().on("primaryModelChanged", onLoaded);
    // } else {
    //   onLoaded();
    // }
    // return () => {
    //   VRMLoader.getInstance().off("ready", onLoaded);
    //   VRMLoader.getInstance().off("primaryModelChanged", onLoaded);
    //   // cleanup
    // };
    const clas = new VRMFile(
      `possiblecuteanimegirl.vrm`,
      "cute anime girl",
      "cag"
    );
    clas.getVRM().then((vrm) => {
      setModel(vrm);
    });
  }, []);
  return model;
};
