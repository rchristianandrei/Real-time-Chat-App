import { Router } from "express";
import authController from "./controllers/authController.js";
import userController from "./controllers/userController.js";

const router = Router();

router.use(authController.route, authController.router);
router.use(userController.route, userController.router);

router.get("/", (req, res) => {
  res.send("Hello, Express!");
});

export default router;
