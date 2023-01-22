import express, { Application } from "express";
import socketIO, { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import { spawn } from "node:child_process";

export class Server {
  private app: Application;
  private io: SocketIOServer;

  private activeSockets: string[] = [];

  private readonly DEFAULT_PORT = 443;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.io = new SocketIOServer(this.app.listen(this.DEFAULT_PORT), {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    console.log(`Starting on ${this.DEFAULT_PORT}`);

    this.setupSocketHandlers();
  }

  private setupSocketHandlers(): void {
    this.io.on("connection", (socket) => {
      console.log(`Connection UUID: ${socket.id}`);

      const existingSocket = this.activeSockets.find(
        (existingSocket) => existingSocket === socket.id
      );

      if (!existingSocket) {
        this.activeSockets.push(socket.id);
      }

      const ffmpeg = spawn("ffmpeg", [
        "re",
        "-i",
        "-",
        `rtmp://a.rtmp.youtube.com/live2/***REMOVED***`,
      ]);

      this.io.on("message", (msg) => {
        if (Buffer.isBuffer(msg)) {
          ffmpeg.stdin.write(msg);
        }
      });

      // If the WebSocket connection goes away, clean up ffmpeg
      this.io.on("close", (e) => {
        ffmpeg.kill("SIGINT");
      });
    });
  }
}
