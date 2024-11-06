const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { Op } = require("sequelize");

dotenv.config();

// Register a new user
exports.register = async (req, res) => {
  const { username, email, password, firstName, lastName, role } = req.body;

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
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
      status: true,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error in registering a user: ", error);
    return res
      .status(500)
      .json({ message: "Unable to create a user", error: error.message });
  }
};
