import { Router } from "express";

import authGuard from "../middlewares/authGuard.js";
import UserModel from "../database/user.js";

export const route = "/api/users";
export const router = Router();

router.get("/", authGuard(), async (req, res) => {
  const users = await UserModel.find({});
  return res.send(users);
});

export default { route, router };
