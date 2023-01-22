import React from "react";
import { CameraFeed } from "../components/CameraFeed";
import { ScreenFeed } from "../components/ScreenFeed";
import { WeebFeed } from "../components/WeebFeed";

export const StreamPage = () => {
  return (
    <div className={`w-screen h-screen relative`}>
      <div className={`absolute top-0 left-0 w-full h-full z-0`}>
        <ScreenFeed />
      </div>
      <div className={`absolute bottom-4 right-4 w-96 h-72 z-10 rounded-2xl shadow-md overflow-hidden`}>
        <CameraFeed />
      </div>
      <div className={`absolute bottom-80 right-4 w-96 h-72 z-10 rounded-2xl shadow-md overflow-hidden`}>
        <WeebFeed />
      </div>
    </div>
  );
};
export default StreamPage;
