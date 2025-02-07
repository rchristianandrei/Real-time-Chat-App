import { Router } from "express";

import authGuard from "../middlewares/authGuard.js";

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

router.get("/messages", authGuard(), async (req, res) => {
  const user = req.user;
  const { chatId } = req.body;
  try {
    const chat = await Chat.findById(chatId);

    if (!chat) return res.sendStatus(404);

    const messages = await Message.find({ chatId: chat.id });
    console.log(messages);
    return res.status(200).send(messages);
  } catch (e) {
    return res.sendStatus(500);
  }
});

router.post("/", authGuard(), async (req, res) => {
  const user = req.user;
  const { chatId, recepientId, message } = req.body;

  try {
    // Verify recipient
    const receiver = await User.findById(recepientId);
    if (!receiver)
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

    return res.status(201).send({
      message: "successfully sent message",
    });
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
});

export default { route, router };
