import {io, Socket as SocketIOClient} from "socket.io-client"

export class SocketConnection {
  private socket: SocketIOClient;

  constructor() {
    this.socket = io("http://localhost:3000");

    this.socket.emit("test");
    this.socket.on("test-cb", () => {
      console.log("test cb received")
    })
  }

  private handleConnected(): void {
    console.log("connected")
  }

  public getSocket() {
    return this.socket;
  }
}
