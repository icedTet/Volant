import { io, Socket as SocketIOClient } from "socket.io-client";

export class SocketConnection {
  private socket: SocketIOClient;

  constructor() {
    this.socket = io("http://***REMOVED***:443", {transports: ["websocket"]});

    this.socket.emit("test");
    this.socket.on("test-cb", () => {
      console.log("test cb received");
    });
  }

  public getSocket() {
    return this.socket;
  }
}

export default SocketConnection