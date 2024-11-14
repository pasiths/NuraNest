const {
  getUsers,
  getUser,
  getUserByRole,
  getAppointments,
  getActiveAppointments,
  getCompletedAppointments,
  getCancelledAppointments,
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

module.exports = router;
