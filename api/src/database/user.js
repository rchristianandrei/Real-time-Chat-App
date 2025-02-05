import mongoose from "mongoose";

const UserScheme = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  password: { type: String, required: true },
});

const modelName = "user";
export const User = mongoose.model(modelName, UserScheme);

export default { modelName, user: User };
