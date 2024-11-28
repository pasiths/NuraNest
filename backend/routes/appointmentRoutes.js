const {
  createAppointment,
  updateAppointment,
  getAppointmentById,
  getAppointments,
  deleteAppointment,
} = require("../controllers/appointment.js");
const {
  verifyToken,
  isOwnerOrAdmin,
  isAdmin,
} = require("../middlewares/authRole.js");
const express = require("express");

const router = express.Router();

// Create a new Appointment
router.post("/", verifyToken, createAppointment);

// Update an existing Appointment
router.put("/:id", verifyToken, isOwnerOrAdmin, updateAppointment);

// Get an Appointment by ID
router.get("/:id", verifyToken, isOwnerOrAdmin, getAppointmentById);

// Get all Appointments
router.get("/", verifyToken, isAdmin, getAppointments);

// Delete an Appointment
router.delete("/:id", verifyToken, isOwnerOrAdmin, deleteAppointment);

module.exports = router;
