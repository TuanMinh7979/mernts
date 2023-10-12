import { Socket } from "socket.io";
export const SocketServer = (socket: Socket) => {
  console.log("socketId ", socket.id, " connected");
  socket.on("joinRoom", (id) => {
    socket.join(id);
    console.log("JOIN ROOM and new socket.rooms", { joinRoom: (socket as any).adapter.rooms });
  });
  socket.on("outRoom", (id) => {
    socket.leave(id);
    console.log("OUT ROOM and new socket.rooms",  { outRoom: (socket as any).adapter.rooms });
  });
  socket.on("disconnect", () => {
    console.log("socket ", socket.id, " disconnected");
  });
};
