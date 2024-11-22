const User = require("../models/User.js");
const Admin = require("../models/Admin.js");
const Appointment = require("../models/Appointment.js");
const Blog = require("../models/Blog.js");
const Payment = require("../models/Payment.js");

// Create his/her admin profile using the admin's userId from jwt payload after login
exports.createAdminProfile = async (req, res) => {
  const { userId } = req.user;

  try {
    const existingAdmin = await Admin.findOne({ where: { userId } });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin profile already exists" });
    }

    const newAdmin = await Admin.create({
      userId,
    });

    return res.status(201).json({
      message: "Admin profile created successfully",
      admin: newAdmin,
    });
  } catch (error) {
    console.error("Error in creating an admin profile: ", error);
    return res.status(500).json({
      message: "Unable to create an admin profile",
      error: error.message,
    });
  }
};

// Delete the admin's profile from both patient and user data tables (soft delete setting status to 'false')
exports.deleteAdminProfile = async (req, res) => {
  const { userId } = req.user;

  try {
    const admin = await Admin.findOne({ where: { userId } });

    if (!admin) {
      return res.status(404).json({ message: "Admin profile not found" });
    }

    admin.status = false;
    await admin.save();

    // Find the user record and set the status to false
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = false;
    await user.save();

    console.log("Admin profile deleted successfully");
    return res
      .status(200)
      .json({ message: "Admin profile deleted successfully" });
  } catch (error) {
    console.error("Error in deleting admin profile: ", error);
    return res.status(500).json({
      message: "Unable to delete admin profile",
      error: error.message,
    });
  }
};

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

// Admin's blog management functions
// Create a new Blog post
exports.createBlog = async (req, res) => {
  const { title, body, tags, description, keywords } = req.body;

  try {
    // Create a new Blog post
    const blog = await Blog.create({
      title,
      body,
      tags,
      description,
      keywords,
      authorId: req.user.id,
      status: true,
    });

    console.log("Blog created successfully");
    return res.status(201).json({ blog });
  } catch (error) {
    console.error("Error creating the blog", error);
    return res.status(500).json({
      message: "Unable to create the blog",
      error: error.message,
    });
  }
};

// Update a Blog post
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, body, tags, description, keywords } = req.body;

  try {
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Update the Blog post
    if (title) {
      blog.title = title;
    }

    if (body) {
      blog.body = body;
    }

    if (tags) {
      blog.tags = tags;
    }

    if (description) {
      blog.description = description;
    }

    if (keywords) {
      blog.keywords = keywords;
    }

    await blog.save();

    console.log("Blog updated successfully");
    return res.status(200).json({ blog });
  } catch (error) {
    console.error("Error updating the blog", error);
    return res.status(500).json({
      message: "Unable to update the blog",
      error: error.message,
    });
  }
};

// Delete a Blog post (set status to false)
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Set the Blog status to inactive/false
    blog.status = false;
    await blog.save();

    console.log("Blog deleted successfully");
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting the blog", error);
    return res.status(500).json({
      message: "Unable to delete the blog",
      error: error.message,
    });
  }
};

// Admin payment management functions
// Get all payments
exports.getPayments = async (req, res) => {
  try {
    // Find all payments
    const payments = await Payment.findAll();

    console.log("Payments fetched successfully");
    return res.status(200).json({ payments });
  } catch (error) {
    console.error("Error fetching payments", error);
    return res
      .status(500)
      .json({ message: "Unable to get payments", error: error.message });
  }
};

// Get all payments where payment status is success
exports.getSuccessfulPayments = async (req, res) => {
  try {
    // Find all payments
    const payments = await Payment.findAll({
      where: { paymentStatus: "success" },
    });

    console.log("Payments fetched successfully");
    return res.status(200).json({ payments });
  } catch (error) {
    console.error("Error fetching payments", error);
    return res
      .status(500)
      .json({ message: "Unable to get payments", error: error.message });
  }
};

// Get all payments where payment status is failed
exports.getFailedPayments = async (req, res) => {
  try {
    // Find all payments
    const payments = await Payment.findAll({
      where: { paymentStatus: "failed" },
    });

    console.log("Payments fetched successfully");
    return res.status(200).json({ payments });
  } catch (error) {
    console.error("Error fetching payments", error);
    return res
      .status(500)
      .json({ message: "Unable to get payments", error: error.message });
  }
};

// Get all payments where payment status is pending
exports.getPendingPayments = async (req, res) => {
  try {
    // Find all payments
    const payments = await Payment.findAll({
      where: { paymentStatus: "pending" },
    });

    console.log("Payments fetched successfully");
    return res.status(200).json({ payments });
  } catch (error) {
    console.error("Error fetching payments", error);
    return res
      .status(500)
      .json({ message: "Unable to get payments", error: error.message });
  }
};
