import express from "express";
import cors from "cors";
import session from "express-session";

import routes from "./routes.js";

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(
  session({
    secret: "asdiocjamwio2482394$@#$@#",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 },
  })
);

app.use(routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Export the app for testing or future extension
export default app;
