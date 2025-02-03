import { Router } from "express";

export const route = "/api/user";
export const router = Router();

router.get("/", (req, res) => {
  return res.send("Get all users");
});

router.post("/register", (req, res) => {
  return res.send("Register endpoint");
});

export default { route, router };
