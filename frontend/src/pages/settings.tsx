import localforage from "localforage";
import React from "react";
import { useState } from "react";
import Button, {
  ButtonColor,
  ButtonRoundedness,
  ButtonSize,
} from "../components/Button";
import { AnimeGirlCard } from "../components/Settings/AnimeGirlCard";
import { AnimeGirlCreateYourOwn } from "../components/Settings/AnimeGirlCreateYourOwn";
import { AnimeGirlRenderer } from "../components/Settings/AnimeGirlRender";
import { VRMFile, VRMLoader } from "../utils/classes/VRMLoader";
import { useAllModelData } from "../utils/hooks/useAllModelData";
import { useSelectedModel } from "../utils/hooks/useVRMFile";

export const Settings = () => {
  const [streamURL, setStreamURL] = useState("");
  const [key, setKey] = useState("");
  const [streamWidth, setStreamWidth] = useState(1280);
  const [streamHeight, setStreamHeight] = useState(720);
  const [streamFPS, setStreamFPS] = useState(60);
  const [avatar, setAvatar] = useState(null as null | File);
  const [fileHovering, setFileHovering] = useState(false);
  const [performance, setPerformance] = useState(null);

  const handleChange = (avatar) => {
    setAvatar(avatar);
  };
  const model = useSelectedModel();
  const modelMap = useAllModelData();
  return (
    <div className={`grid grid-cols-10 gap-2 w-full min-h-screen`}>
      <div className={`col-span-5 bg-gray-200 p-16 max-h-screen overflow-auto`}>
        <div className="flex flex-col gap-12">
          <h1
            className={`text-6xl font-extrabold text-indigo-600 font-poppins`}
          >
            VTuber Online!
          </h1>
          <div className="flex flex-col gap-4">
            <h2
              className={`text-sm font-extrabold text-gray-900/20 font-poppins uppercase`}
            >
              Stream Connection Settings
            </h2>
            <div className={`flex flex-col gap-4 w-full`}>
              <input
                type={"text"}
                placeholder="Streaming URL (rtmp://example.com/live2)"
                className="basicinput"
                value={streamURL}
                onChange={(e) => setStreamURL(e.target.value)}
              />
              <input
                type={"text"}
                placeholder="Enter your stream key (xxxx-xxxx-xxxx-xxxx-xxxx)"
                className="basicinput"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <h3
              className={`text-sm font-extrabold text-gray-900/20 font-poppins uppercase`}
            >
              Stream Quality Settings
            </h3>
            <div className={`flex flex-row gap-4 items-center`}>
              <input
                type={"number"}
                placeholder="Stream Width"
                className="basicinput"
                value={streamWidth}
                onChange={(e) => setStreamWidth(e.target.value as any)}
              />
              <span className={`text-gray-900/20`}>x</span>
              <input
                type={"number"}
                placeholder="Stream Height"
                className="basicinput"
                value={streamHeight}
                onChange={(e) => setStreamHeight(e.target.value as any)}
              />
              <input
                type={"number"}
                placeholder="Stream FPS"
                className="basicinput"
                value={streamFPS}
                onChange={(e) => setStreamFPS(e.target.value as any)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2
              className={`text-sm font-extrabold text-gray-900/20 font-poppins uppercase`}
            >
              Avatar Settings
            </h2>
            <div className={`grid grid-cols-3 gap-4 w-full`}>
              {Array.from(modelMap?.keys() || []).map((key) => (
                <AnimeGirlCard
                  key={`anime-card-${key}`}
                  model={VRMLoader.getInstance().modelMap.get(key)!}
                  data={VRMLoader.getInstance().modelDataMap.get(key)!}
                  onClick={(model) => {
                    VRMLoader.getInstance().setPrimaryModel(model.id);
                  }}
                />
              ))}
              {/* <AnimeGirlCreateYourOwn /> */}
            </div>
          </div>
        </div>
      </div>
      <div className={`col-span-5`}>
        <AnimeGirlRenderer model={model} />
      </div>
    </div>
  );
};
export default Settings;
