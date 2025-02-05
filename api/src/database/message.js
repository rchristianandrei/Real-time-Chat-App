import mongoose, { mongo } from "mongoose";

import chat from "./chat.js";

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: chat.modelName,
    },
    sender: { type: mongoose.Types.ObjectId, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const modelName = "message";
export const Message = mongoose.model(modelName, messageSchema);

export default { modelName, Message };
