import { Router } from "express";

import { users } from "../utils/userConstant.js";

export const route = "/api/auth";
export const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (value) => value.username === username && value.password === password
  );

  if (!user) return res.sendStatus(404);

  req.session.user = user;

  return res.status(200).send(user);
});

export default { route, router };
