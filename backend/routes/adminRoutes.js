const {
  getUsers,
  getUser,
  getUserByRole,
  getAppointments,
  getActiveAppointments,
  getCompletedAppointments,
  getCancelledAppointments,
  createBlog,
  updateBlog,
  deleteBlog,
  getPayments,
  getSuccessfulPayments,
  getFailedPayments,
  getPendingPayments,
} = require("../controllers/admin.js");
const express = require("express");

const router = express.Router();

// Get all users
router.get("/users", getUsers);

// Get a user by ID
router.get("/users/:id", getUser);

// Get a user by role
router.get("/users/role/:role", getUserByRole);

// Get all appointments
router.get("/appointments", getAppointments);

// Get all active appointments
router.get("/appointments/active", getActiveAppointments);

// Get all completed appointments
router.get("/appointments/completed", getCompletedAppointments);

// Get all cancelled appointments
router.get("/appointments/cancelled", getCancelledAppointments);

// Create a blog
router.post("/blogs", createBlog);

// Update a blog
router.put("/blogs/:id", updateBlog);

// Delete a blog
router.delete("/blogs/:id", deleteBlog);

// Get all payments
router.get("/payments", getPayments);

// Get all successful payments
router.get("/payments/successful", getSuccessfulPayments);

// Get all failed payments
router.get("/payments/failed", getFailedPayments);

// Get all pending payments
router.get("/payments/pending", getPendingPayments);

module.exports = router;
