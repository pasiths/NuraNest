import express from "express";
import dotenv from "dotenv";
import sequelize from "./connect.js";
import "./models/associations.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

// Initialize the database
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Synchronize the models
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

initializeDatabase();

const app = express();
const PORT = process.env.PORT || 8080;

// Setup the routes
app.use("auth", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
