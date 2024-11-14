const {
  creatAppointment,
  updateAppointment,
  getAppointment,
  deleteAppointment,
} = require("../controllers/appointment.js");
const express = require("express");

const router = express.Router();

// Create a new appointment
router.post("/", creatAppointment);

// Update an appointment by ID
router.put("/:id", updateAppointment);

// Get an appointment by ID
router.get("/:id", getAppointment);

// Delete an appointment by ID
router.delete("/:id", deleteAppointment);

module.exports = router;
