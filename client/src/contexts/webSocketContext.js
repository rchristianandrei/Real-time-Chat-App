import { createContext } from "react";

let delegates = [];

function add(item) {
  delegates.push(item);
}

function remove(item) {
  delegates = delegates.filter((v) => v !== item);
}

function get() {
  return delegates;
}

export const wsMethods = { add, remove, get };

export const WebSocketContext = createContext(wsMethods);
