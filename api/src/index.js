import express from "express";
import routes from "./routes.js";

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

app.use(routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Export the app for testing or future extension
export default app;
