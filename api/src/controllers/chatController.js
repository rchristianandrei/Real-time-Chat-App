import { Router } from "express";

import authGuard from "../middlewares/authGuard.js";

import { users } from "../servers/websocket.js";

import { User } from "../database/user.js";
import { Chat } from "../database/chat.js";
import { Message } from "../database/message.js";

export const route = "/api/chat";
export const router = Router();

router.get("/", authGuard(), async (req, res) => {
  const user = req.user;

  try {
    const chats = await Chat.find({ members: user.id });

    const newChats = [];

    for (let i = 0; i < chats.length; i++) {
      const temp = chats[i].members.find((v) => !v.equals(user.id));
      const target = await User.findById(temp);
      const message = await Message.findOne({ chatId: chats[i].id })
        .sort({ createdAt: -1 })
        .limit(1);

      newChats.push({
        id: chats[i].id,
        displayName: target.displayName,
        sender: message.sender.equals(user.id)
          ? user.displayName
          : target.displayName,
        message: message.message,
      });
    }

    return res.status(200).send(newChats);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
});

router.get("/messages/:id", authGuard(), async (req, res) => {
  const user = req.user;
  const chatId = req.params.id;

  try {
    const chat = await Chat.findById(chatId);

    if (!chat.members.find((v) => v.toString() === user.id))
      return res.sendStatus(401);

    const members = [];
    for (let i = 0; i < chat.members.length; i++) {
      members.push(await User.findById(chat.members[i]));
    }

    if (!chat) return res.sendStatus(404);

    const messages = await Message.find({ chatId: chat.id }).sort({
      createdAt: -1,
    });

    const data = {
      chatId: chatId,
      messages: [],
    };
    for (let i = 0; i < messages.length; i++) {
      const sender = members.find(
        (v) => v.id === messages[i].sender.toString()
      );

      data.messages.push({
        you: user.id === sender.id,
        sender: sender.displayName,
        content: messages[i].message,
      });
    }

    return res.status(200).send(data);
  } catch (e) {
    return res.sendStatus(400);
  }
});

router.post("/", authGuard(), async (req, res) => {
  const user = req.user;
  const { chatId, recepientId, message } = req.body;

  if (!chatId && !recepientId) return res.sendStatus(400);

  try {
    // Verify recipient
    const receiver = await User.findById(recepientId);
    if (!chatId && !recepientId)
      return res.status(400).send({ message: "user does not exist" });

    // Verify Chat Id
    const chatModel = chatId
      ? await Chat.findById(chatId)
      : new Chat({ members: [user.id, receiver.id] });
    if (!chatModel)
      return res.status(404).send({ message: "chat id not found" });

    if (!chatId) await chatModel.save();

    const newMessage = new Message({
      chatId: chatModel.id,
      sender: user.id,
      message: message,
    });

    await newMessage.save();

    // Announce new message to chat members
    for (let i = 0; i < chatModel.members.length; i++) {
      const memberId = chatModel.members[i];

      const ws = users.get(memberId.toString());

      if (!ws) continue;

      ws.send(JSON.stringify({ type: "chat", message: "New Message!" }));
    }

    return res.status(201).send({
      message: "successfully sent message",
    });
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
});

export default { route, router };
