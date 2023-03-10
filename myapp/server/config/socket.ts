import { Socket } from "socket.io";
export const SocketServer = (socket: Socket) => {
  console.log("socketId ", socket.id, " connected");
  socket.on("joinRoom", (id) => {
    socket.join(id);
    console.log({ joinRoom: (socket as any).adapter.rooms });
  });
  socket.on("outRoom", (id) => {
    socket.leave(id);
    console.log({ outRoom: (socket as any).adapter.rooms });
  });
  socket.on("disconnect", () => {
    console.log("socket ", socket.id, " disconnected");
  });
};
