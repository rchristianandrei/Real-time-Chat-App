import express from "express";

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Export the app for testing or future extension
export default app;
