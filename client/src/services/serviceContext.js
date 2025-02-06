import { createContext } from "react";
import authService from "./authService.js";

export const serviceBuilder = {
  authService: authService,
};

export const ServiceContext = createContext(serviceBuilder);
