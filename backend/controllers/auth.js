import User from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Op } from "sequelize";

dotenv.config();

// Register a new user
export const register = async (req, res) => {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    gender,
    dob,
    address,
    contactNo,
    role,
  } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      gender,
      dob,
      address,
      contactNo,
      role,
      status: true,
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to create user", error: error.message });
  }
};
