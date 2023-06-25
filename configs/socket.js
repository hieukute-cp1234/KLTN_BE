import { Server } from "socket.io";
import { updateMessageToDatabase } from "../controllers/message.js";

export const connectSocket = () => {
  const io = new Server({
    cors: {
      origin: "*",
    },
  });

  io.listen(4000);

  io.on("connection", (socket) => {
    socket.on("statusTask", (task) => {
      io.emit("updateTask", task);
    });

    socket.on("userChat", async (message) => {
      const newMessage = await updateMessageToDatabase(message);
      io.emit("chatFeegback", newMessage);
    });
  });
};
