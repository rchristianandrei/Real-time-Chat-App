import { createContext } from "react";

const user = null;
function setUser(user) {}

export const GlobalContext = createContext({
  user,
  setUser,
});
