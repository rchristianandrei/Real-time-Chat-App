import { createContext } from "react";
import authService from "./authService.js";
import chatService from "./chatService.js";
import userService from "./userService.js";

export const serviceBuilder = {
  authService: authService,
  chatService: chatService,
  userService: userService,
};

export const ServiceContext = createContext(serviceBuilder);
