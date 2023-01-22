import { useState } from "react";
import Button, {
  ButtonColor,
  ButtonRoundedness,
  ButtonSize,
} from "../components/Button";

export const Settings = () => {
  const [key, setKey] = useState("");
  const [avatar, setAvatar] = useState(null as null | File);
  return (
    <div className="container flex items-top mx-auto min-h-screen justify-left">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <h1 className="text-1xl font-bold">Enter Stream Key</h1>
        <input
          type={"text"}
          placeholder="Enter your stream key"
          className="basicinput"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <h1 className="text-1xl font-bold">Upload Avatar</h1>
        <input
          type={"file"}
          className={`hidden`}
          onInput={(e) => {
            const newAvatar = (
              document.getElementById("avatar") as HTMLInputElement
            )?.files?.item(0);

            setAvatar(newAvatar);
          }}
        />
        <Button
          onClick={(e) => {
            const newAvatar = (
              document.getElementById("avatar") as HTMLInputElement
            )?.files?.item(0);
          }}
          roundedNess={ButtonRoundedness.sm}
          size={ButtonSize.xl}
          color={ButtonColor.light}
        >
          Upload Model
        </Button>
      </div>
    </div>
  );
};
export default Settings;
