const User = require("../models/User.js");
const Appointment = require("../models/Appointment.js");
const Blog = require("../models/Blog.js");
const Payment = require("../models/Payment.js");

// Admin's user management functions
// Get all users
exports.getUsers = async (req, res) => {
  try {
    // Find the user with the status filter
    const users = await User.findAll({ where: { status: true } });

    console.log("Users fetched successfully");
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users", error);
    return res
      .status(500)
      .json({ message: "Unable to get users", error: error.message });
  }
};

// Get a user by ID
exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User fetched successfully");
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching the user", error);
    return res
      .status(500)
      .json({ message: "Unable to get the user", error: error.message });
  }
};

// Get a User by role
exports.getUserByRole = async (req, res) => {
  const { role } = req.params;

  try {
    // Find the user by role
    const users = await User.findAll({ where: { role, status: true } });

    console.log("Users fetched successfully");
    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users", error);
    return res
      .status(500)
      .json({ message: "Unable to get users", error: error.message });
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

    console.log("User deleted successfully");
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting the user", error);
    return res
      .status(500)
      .json({ message: "Unable to delete the user", error: error.message });
  }
};

// Admin's appointment management functions
// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    // Find all appoinments
    const appointments = await Appointment.findAll();

    console.log("Appoinments fetched successfully");
    return res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching appoinments", error);
    return res
      .status(500)
      .json({ message: "Unable to get appoinments", error: error.message });
  }
};

// Get all appointments where status is active
exports.getActiveAppointments = async (req, res) => {
  try {
    // Find all appointments
    const appointments = await Appointment.findAll({
      where: { status: "active" },
    });

    console.log("Appoinments fetched successfully");
    return res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching appoinments", error);
    return res
      .status(500)
      .json({ message: "Unable to get appoinments", error: error.message });
  }
};

// Get all appointments where status is cancelled
exports.getCancelledAppointments = async (req, res) => {
  try {
    // Find all appointments
    const appointments = await Appointment.findAll({
      where: { status: "cancelled" },
    });

    console.log("Appoinments fetched successfully");
    return res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching appoinments", error);
    return res
      .status(500)
      .json({ message: "Unable to get appoinments", error: error.message });
  }
};

// Get all appointments where status is completed
exports.getCompletedAppointments = async (req, res) => {
  try {
    // Find all appoinments
    const appointments = await Appointment.findAll({
      where: { status: "completed" },
    });

    console.log("Appoinments fetched successfully");
    return res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error fetching appoinments", error);
    return res
      .status(500)
      .json({ message: "Unable to get appoinments", error: error.message });
  }
};
