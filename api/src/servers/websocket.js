import { WebSocketServer } from "ws";
import { User } from "../database/user.js";

export const users = new Map();

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws) => {
  ws.on("message", (rawData) => {
    const data = JSON.parse(rawData.toString());

    if (data.type !== "register" || !data.id) return;

    if (users.get(data.id.toString())) return;

    User.findById(data.id.toString()).then((user) => {
      if (!user) return;
      users.set(user.id.toString(), ws);

      ws.on("close", () => {
        console.log("gone");
        users.delete(user.id.toString());
      });
    });
  });
});
