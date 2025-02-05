import mongoose from "mongoose";

const UserScheme = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  password: { type: String, required: true },
});

const user = mongoose.model("user", UserScheme);

export default user;
