import { createContext } from "react";
import authService from "./authService.js";
import chatService from "./chatService.js";

export const serviceBuilder = {
  authService: authService,
  chatService: chatService,
};

export const ServiceContext = createContext(serviceBuilder);
