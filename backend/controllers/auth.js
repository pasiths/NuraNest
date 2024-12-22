const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const logger = require("../middlewares/logger.js");
const Admin = require("../models/Admin.js");
const Doctor = require("../models/Doctor.js");
const Patient = require("../models/Patient.js");

dotenv.config();

const JWT_SECRET = process.env.JWT;

// Register a new user
exports.register = async (req, res) => {
  const { username, email, password, contactNo, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      contactNo,
      role,
      status: true,
    });

    // Check and insert the user into the respective role table
    if (role === "admin") {
      await Admin.create({ userId: newUser.id });
    } else if (role === "doctor") {
      await Doctor.create({ userId: newUser.id });
    } else if (role === "patient") {
      await Patient.create({ userId: newUser.id });
    }

    // Generate a JWT Token
    const token = jwt.sign(
      {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    logger.info("User created successfully");
    return res
      .cookie("accessToken", token, { httpOnly: true, secure: true })
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    logger.error("Error in registering a user: ", error);
    return res
      .status(500)
      .json({ message: "Unable to create a user", error: error.message });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email, status: true } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect credentials" });
    }

    // Generate a JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send the token and user details (without the password)
    const { password: userPassword, ...userData } = user.toJSON();

    logger.info("User logged in successfully");
    res
      .cookie("accessToken", token, { httpOnly: true, secure: true })
      .status(200)
      .json({ message: "User logged in successfully!", token, user: userData });
  } catch (error) {
    logger.error("Error logging in user: ", error);
    return res
      .status(500)
      .json({ message: "Unable to login user", error: error.message });
  }
};

// Logout a user
exports.logout = (req, res) => {
  res.clearCookie("accessToken");
  logger.info("User logged out successfully");
  res.status(200).json({ message: "User logged out successfully!" });
};
