import { useEffect, useRef } from "react";
import { KalidokitController } from "../utils/classes/KalidokitController";

export const thiswillfixeverything = () => {
  const input_video = useRef();
  const guides = useRef();
  useEffect(() => {
    const kc = new KalidokitController(input_video.current!, ``, guides.current);
  }, []);
};
