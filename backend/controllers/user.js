const User = require("../models/User.js");
const Patient = require("../models/Patient.js");
const Doctor = require("../models/Doctor.js");
const Admin = require("../models/Admin.js");
const bcrypt = require("bcryptjs");
const logger = require("../middlewares/logger.js");

// Update a user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
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
  } = req.body;

  try {
    // Find the user by ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the fields if they are provided
    if (username) {
      user.username = username;
    }

    if (email) {
      user.email = email;
    }

    if (password) {
      const salt = bcrypt.genSaltSync(12);
      const hashedPassword = bcrypt.hashSync(password, salt);
      user.password = hashedPassword;
    }

    if (firstName) {
      user.firstName = firstName;
    }

    if (lastName) {
      user.lastName = lastName;
    }

    if (gender) {
      user.gender = gender;
    }

    if (dob) {
      user.dob = dob;
    }

    if (address) {
      user.address = address;
    }

    if (contactNo) {
      user.contactNo = contactNo;
    }

    // Save the updated user
    await user.save();

    logger.info("User updated successfully");
    return res.status(200).json({ message: "User updated", user });
  } catch (error) {
    logger.error("Error in updating a user: ", error);
    return res
      .status(500)
      .json({ message: "Unable to update user", error: error.message });
  }
};

// Get a user by ID
exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID
    const user = await User.findOne({ where: { id, status: true } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    logger.info("User fetched successfully");
    return res.status(200).json({ user });
  } catch (error) {
    logger.error("Error fetching the user", error);
    return res
      .status(500)
      .json({ message: "Unable to get the user", error: error.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    // Find all users
    const users = await User.findAll({ where: { status: true } });

    logger.info("Users fetched successfully");
    return res.status(200).json({ users });
  } catch (error) {
    logger.error("Error fetching the users", error);
    return res
      .status(500)
      .json({ message: "Unable to get the users", error: error.message });
  }
};

// Delete a user (set status to false)
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Set user status to inactive/false
    user.status = false;
    await user.save();

    // Find the associated patient and set status to false
    const patient = await Patient.findOne({ where: { userId: id } });
    if (patient) {
      patient.status = false;
      await patient.save();
    }

    // Find the associated doctor and set status to false
    const doctor = await Doctor.findOne({ where: { userId: id } });
    if (doctor) {
      doctor.status = false;
      await doctor.save();
    }

    // Find the associated admin and set status to false
    const admin = await Admin.findOne({ where: { userId: id } });
    if (admin) {
      admin.status = false;
      await admin.save();
    }

    logger.info("User deleted successfully");
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    logger.error("Error deleting the user", error);
    return res
      .status(500)
      .json({ message: "Unable to delete the user", error: error.message });
  }
};
