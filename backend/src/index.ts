import { Server } from "./server";

const server = new Server();

server.listen((port) => {
  console.log(`server is listening on http://localhost:${port}`);
});
