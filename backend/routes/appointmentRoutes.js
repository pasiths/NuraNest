const {
  createAppointment,
  updateAppointment,
  getAppointmentById,
  getAppointments,
  deleteAppointment,
} = require("../controllers/appointment.js");
const express = require("express");

const router = express.Router();

// Create a new Appointment
router.post("/", createAppointment);

// Update an existing Appointment
router.put("/:id", updateAppointment);

// Get an Appointment by ID
router.get("/:id", getAppointmentById);

// Get all Appointments
router.get("/", getAppointments);

// Delete an Appointment
router.delete("/:id", deleteAppointment);

module.exports = router;
