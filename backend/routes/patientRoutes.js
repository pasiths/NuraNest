const {
  createPatientProfile,
  getPatientProfile,
  updatePatientProfile,
  deletePatientProfile,
  makePayment,
  getPatientPayments,
  viewDoctorProfile,
  viewDoctorsList,
  bookAppointment,
  updateAppointment,
  cancelAppointment,
  rescheduleAppointment,
  getUpcomingAppointments,
  getPastAppointments,
  getActiveAppointments,
  getDoctorAvailability,
} = require("../controllers/patient.js");
const express = require("express");

const router = express.Router();

// Create a patient profile
router.post("/profile", createPatientProfile);

// Get the patient's profile
router.get("/profile", getPatientProfile);

// Update the patient's profile
router.put("/profile", updatePatientProfile);

// Delete the patient's profile
router.delete("/profile", deletePatientProfile);

// Make a payment
router.post("/payments", makePayment);

// Get all payments of the patient
router.get("/payments", getPatientPayments);

// View the doctor's profile
router.get("/doctors/:doctorId", viewDoctorProfile);

// View the list of doctors
router.get("/doctors", viewDoctorsList);

// Book an appointment
router.post("/appointments", bookAppointment);

// Update an appointment
router.put("/appointments/:appointmentId", updateAppointment);

// Cancel an appointment
router.delete("/appointments/:appointmentId", cancelAppointment);

// Reschedule an appointment
router.put("/appointments/:appointmentId/reschedule", rescheduleAppointment);

// Get all upcoming appointments of the patient
router.get("/appointments/upcoming", getUpcomingAppointments);

// Get all past appointments of the patient
router.get("/appointments/past", getPastAppointments);

// Get all active appointments of the patient
router.get("/appointments/active", getActiveAppointments);

// Get the availability of a doctor
router.get("/doctors/:doctorId/availability", getDoctorAvailability);

module.exports = router;
