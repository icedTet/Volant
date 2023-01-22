import localforage from "localforage";
import { useState } from "react";
import Button, {
  ButtonColor,
  ButtonRoundedness,
  ButtonSize,
} from "../components/Button";

export const Settings = () => {
  const [key, setKey] = useState("");
  const [avatar, setAvatar] = useState(null as null | File);
  const [fileHovering, setFileHovering] = useState(false);
  const [performance, setPerformance] = useState(null);
  const handleChange = (avatar) => {
    setAvatar(avatar);
  };
  return (
    <div className={`grid grid-cols-10 gap-2 w-full min-h-screen`}>
      <div className={`col-span-6 bg-gray-100 p-16 flex flex-col gap-4`}>
        <h1 className={`text-6xl font-bold`}>Settings</h1>
      </div>
      <div className={`col-span-4`}></div>
    </div>

    // <div className="container flex items-top mx-auto min-h-screen justify-left">
    //   <div>
    //     <h1 className="text-3xl font-bold">Settings</h1>
    //     <h1 className="text-1xl font-bold">Enter Stream Key</h1>
    //     <input
    //       type={"text"}
    //       placeholder="Enter your stream key"
    //       className="basicinput"
    //       value={key}
    //       onChange={(e) => setKey(e.target.value)}
    //     />
    //     <h1 className="text-1xl font-bold">Upload Avatar</h1>
    //     <input
    //       id={"avatar"}
    //       type={"file"}
    //       className={`hidden`}
    //       onInput={(e) => {
    //         const newAvatar = (
    //           document.getElementById("avatar") as HTMLInputElement
    //         )?.files?.item(0);

    //         setAvatar(newAvatar);
    //       }}
    //     />
    //     <div
    //     className={`flex-grow
    //     ${
    //       fileHovering && `bg-gray-800 z-40`
    //     } transition-all relative overflow-auto flex flex-row items-center justify-center pointer-events-auto w-64 h-64`}
    //     onDragOver={e => {
    //       setFileHovering(true)
    //       e.preventDefault()
    //     }}
    //     onDragLeave={() => setFileHovering(false)}
    //     onDrop={e => {
    //       e.preventDefault()
    //       setFileHovering(false)
    //       const files = e.dataTransfer.files
    //       const filesToAdd = Array.from(files)
    //       localforage.setItem("avatar", filesToAdd[0])
    //     }}
    //   />
    //     <Button
    //       onClick={(e) => {
    //         const newAvatar = (
    //           document.getElementById("avatar") as HTMLInputElement
    //         ).click()
    //       }}
    //       roundedNess={ButtonRoundedness.sm}
    //       size={ButtonSize.lg}
    //       color={ButtonColor.light}
    //     >
    //       Upload Model
    //     </Button>
    //     <h1 className="text-1xl font-bold">Set Performance Value</h1>
    //     <input
    //       type={"text"}
    //       disabled = {true}
    //       placeholder="Performance Value"
    //       className="basicinput"
    //       value={performance}
    //       onChange={(e) => setPerformance(e.target.value)}
    //     />
    //     <input
    //       type={"range"}
    //       placeholder="How high do you want performance to be?"
    //       className="range"
    //       max={2}
    //       value={performance}
    //       onChange={(e) => setPerformance(e.target.value)}
    //     />
    //   </div>
    // </div>
  );
};
export default Settings;
