import express from "express";
import passport from "passport";
import cors from "cors";
import mongoose from "mongoose";

import { createWebSocketServer } from "./websocket.js";
import routes from "./routes.js";

import "./auth/jwt-strategy.js";

const app = express();
const port = 3000;

mongoose
  .connect("mongodb://localhost/realtimeChat")
  .then(() => {
    console.log("successfully connected to mongodb");
  })
  .catch((reason) => {
    console.log(reason);
  });

// Middleware to parse JSON requests
app.use(express.json());
app.use(passport.initialize());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// WS
createWebSocketServer();

app.use(routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Export the app for testing or future extension
export default app;
