import React, { useEffect, useRef, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { CameraFeed } from "../components/CameraFeed";
import { ScreenFeed } from "../components/ScreenFeed";

export const StreamPage = () => {
  return (
    <>
      {/* <CameraFeed /> */}
      <ScreenFeed />
    </>
  );
};
export default StreamPage;
