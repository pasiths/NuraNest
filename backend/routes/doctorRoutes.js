const {
  createDoctorProfile,
  getDoctorProfile,
  updateDoctorProfile,
  getAppointments,
  updateAppointmentStatus,
  viewPatientProfile,
} = require("../controllers/doctor.js");
const express = require("express");

const router = express.Router();

// Create the doctor's profile
router.post("/profile", createDoctorProfile);

// Get the doctor's profile
router.get("/profile", getDoctorProfile);

// Update the doctor's profile
router.put("/profile", updateDoctorProfile);

// Get all appointments of the doctor
router.get("/appointments", getAppointments);

// Update the status of an appointment
router.put("/appointments/:appointmentId", updateAppointmentStatus);

// View the patient's profile
router.get("/patients/:patientId", viewPatientProfile);

module.exports = router;
