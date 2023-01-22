import React from "react";
import { CameraFeed } from "../components/CameraFeed";
import { WeebFeed } from "../components/WeebFeed";

export const StreamPage = () => {
  return (
    <div className={`w-full h-screen`}>
      <div className={`h-1/2 w-full`}>
        <CameraFeed />
      </div>
      <div className={`h-1/2 w-full`}>
        <WeebFeed />
      </div>
    </div>
  );
};
export default StreamPage;
