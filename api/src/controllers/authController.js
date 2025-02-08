import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import key from "../auth/secretKey.js";
import { User } from "../database/user.js";

export const route = "/api/auth";
export const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(404).send("user is not available");
  }
  const token = jwt.sign({ id: user.id }, key, { expiresIn: "1h" });
  return res
    .status(200)
    .send({
      id: user.id,
      username: username,
      displayName: user.displayName,
      token: token,
    });
});

router.post("/register", async (req, res) => {
  const { username, displayName, password } = req.body;

  if (!username || !displayName || !password) {
    return res.sendStatus(400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username: username,
    displayName: displayName,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res.status(200).send({ message: "user created successfully" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
});

export default { route, router };
