const sequelize = require("./connect.js");
const express = require("express");

const app = express();

// Load the environment variables
require("dotenv").config();

// Initialize the database
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connection has been established successfully.");

    // Synchronize the models
    await sequelize.sync({ force: false });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Call the function to initialize the database
initializeDatabase();

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
