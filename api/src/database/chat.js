import mongoose from "mongoose";

import user from "./user.js";

const ChatSchema = new mongoose.Schema(
  {
    members: [
      { type: mongoose.Types.ObjectId, required: true, ref: user.modelName },
    ],
  },
  { timestamps: true }
);

const modelName = "chat";
export const Chat = mongoose.model(modelName, ChatSchema);

export default { modelName, Chat };
