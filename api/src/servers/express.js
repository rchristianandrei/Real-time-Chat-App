import express from "express";
import passport from "passport";
import cors from "cors";
import mongoose from "mongoose";

import routes from "../routes.js";

import "../auth/jwt-strategy.js";

export const app = express();

const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(passport.initialize());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

mongoose
  .connect("mongodb://localhost/realtimeChat")
  .then(() => {
    console.log("successfully connected to mongodb");
  })
  .catch((reason) => {
    console.log(reason);
  });
