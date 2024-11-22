const {
  createDoctorProfile,
  getDoctorProfile,
  updateDoctorProfile,
  deleteDoctorProfile,
  getAppointments,
  updateAppointmentStatus,
  rescheduleAppointment,
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

// Delete the doctor's profile
router.delete("/profile", deleteDoctorProfile);

// Get all appointments of the doctor
router.get("/appointments", getAppointments);

// Update the status of an appointment
router.put("/appointments/:appointmentId", updateAppointmentStatus);

// Reschedule an appointment
router.put("/appointments/:appointmentId/reschedule", rescheduleAppointment);

// View the patient's profile
router.get("/patients/:patientId", viewPatientProfile);

module.exports = router;
