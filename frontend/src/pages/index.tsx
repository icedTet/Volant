import { useRouter } from "next/router";
import React from "react";

export default function Home() {
  const router = useRouter();
  return (
    <div className="container flex items-center p-4 mx-auto min-h-screen justify-center">
      <main>
        <h1 className="font-poppins font-bold text-5xl code">
          Welcome to <span className="text-purple-700">Voutube</span>
        </h1>
        <button
          className="bg-purple-700 text-white rounded-md p-2"
          onClick={() => router.push("/stream")}
        >
          Go to Stream
        </button>

        <button
          className="bg-purple-700 text-white rounded-md p-2"
          onClick={() => router.push("/stream")}
        >
          Go to Stream
        </button>
        <button
          className="bg-purple-700 text-white rounded-md p-2"
          onClick={() => router.push("/cameraonly")}
        >
          Go to cameraonly
        </button>
      </main>
    </div>
  );
}
