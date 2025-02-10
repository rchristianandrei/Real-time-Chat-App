import { Router } from "express";

import authGuard from "../middlewares/authGuard.js";
import { User } from "../database/user.js";

export const route = "/api/users";
export const router = Router();

router.get("/", authGuard(), async (req, res) => {
  const users = await User.find({});
  return res.send(users);
});

router.get("/find", authGuard(), async (req, res) => {
  const user = req.user;
  const { keyword } = req.query;

  if (!keyword) return res.sendStatus(400);

  try {
    let users = await User.find({
      displayName: { $regex: keyword, $options: "i" },
    });

    users = users.filter((v) => v.id !== user.id);

    if (!users) return res.sendStatus(404);

    return res
      .status(200)
      .send(users.map((v) => ({ id: v.id, displayName: v.displayName })));
  } catch (ex) {
    console.log(ex);
    return res.sendStatus(500);
  }
});

export default { route, router };
