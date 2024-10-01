import express from "express";
import { AppDataSource } from "./config/db";
import habitRoutes from "./routes/habitRoutes";
import dayRoutes from "./routes/dayRoutes";

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Use the habitRoutes for any routes that start with /habits
app.use('/habits', habitRoutes);

app.use('/Days', dayRoutes)

// Start the server
AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("Error during Data Source initialization:", err);
});

