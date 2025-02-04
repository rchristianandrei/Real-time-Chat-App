import { Router } from "express";

import authGuard from "../middlewares/authGuard.js";
import { users } from "../utils/userConstant.js";

export const route = "/api/users";
export const router = Router();

router.get("/", authGuard(), (req, res) => {
  return res.send(users);
});

export default { route, router };
