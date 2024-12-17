const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./connect.js");
const cookieParser = require("cookie-parser");
require("./models/associations.js");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const doctorRoutes = require("./routes/doctorRoutes.js");
const patientRoutes = require("./routes/patientRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const appointmentRoutes = require("./routes/appointmentRoutes.js");
const paymentRoutes = require("./routes/paymentRoutes.js");
const applicationRoutes = require("./routes/applicationRoutes.js");
const logger = require("./middlewares/logger.js");

dotenv.config();

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connection has been established successfully.");

    await sequelize.sync({ force: false });
    logger.info("All models were synchronized successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
};

initializeDatabase();

const app = express();
const IP = process.env.IP || "localhost";
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to enable CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from the frontend URL
  credentials: true,               // Allow credentials (cookies, tokens, etc.)
};
app.use(cors());

// Middleware to parse cookies
app.use(cookieParser());

// setup the routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/admins", adminRoutes);
app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);
app.use("/blogs", blogRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/payments", paymentRoutes);
app.use("/applications", applicationRoutes);

app.listen(PORT, IP, () => {
  console.log(`Server is running on port ${PORT}`);
});
