import { Socket } from "socket.io";
export const SocketServer = (socket: Socket) => {
  console.log("socketId ", socket.id, " connected");
  socket.on("joinRoom", (id) => {

    
    socket.join(id);
   
  });
  socket.on("outRoom", (id) => {

    socket.leave(id);
  
  });
  socket.on("disconnect", () => {
  
  });
};
