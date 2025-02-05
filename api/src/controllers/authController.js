import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import key from "../auth/secretKey.js";
import UserModel from "../database/user.js";

export const route = "/api/auth";
export const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username: username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(404).send("user is not available");
  }
  const token = jwt.sign({ id: user.id }, key, { expiresIn: "1h" });
  return res
    .status(200)
    .send({ username: username, displayName: user.displayName, token: token });
});

router.post("/register", async (req, res) => {
  const { username, displayName, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    username: username,
    displayName: displayName,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res.status(200).send("user created successfully");
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
});

export default { route, router };
