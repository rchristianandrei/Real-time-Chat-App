import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import key from "../auth/secretKey.js";
import { users } from "../utils/userConstant.js";

export const route = "/api/auth";
export const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((value) => value.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(404).send("user is not available");
  }

  const token = jwt.sign({ id: user.id }, key, { expiresIn: "1h" });
  return res.status(200).send(token);
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (users.find((u) => u.username === username)) {
    return res.status(400).send("user is not available");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    username: username,
    password: hashedPassword,
  };

  users.push(newUser);

  return res.status(200).send("user created successfully");
});

export default { route, router };
