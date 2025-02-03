import { Router } from "express";
import userController from "./controllers/userController.js";

const router = Router();

router.use(userController.route, userController.router);

router.get("/", (req, res) => {
  res.send("Hello, Express!");
});

export default router;
