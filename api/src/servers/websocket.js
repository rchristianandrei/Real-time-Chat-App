import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import key from "../auth/secretKey.js";
import { User } from "../database/user.js";

export const users = new Map();

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws, req) => {
  const raw = req.url.split("=");

  if (raw.length < 2) {
    ws.close();
    return;
  }

  const token = raw[1];

  try {
    const id = jwt.verify(token, key).id;

    if (users.get(id)) {
      ws.close();
      return;
    }

    users.set(id, ws);

    ws.on("close", () => {
      users.delete(id);
    });
  } catch (e) {
    console.log(e);
    ws.close();
    return;
  }
});
