const {
  createAppointment,
  updateAppointment,
  getAppointmentById,
  getAppointments,
  deleteAppointment,
  rescheduleAppointment,
  updateAppointmentStatus,
  getAppointmentsByPatient,
  getActiveAppointmentsByPatient,
  getUpcomingAppointmentsByPatient,
  getAppointmentsByDoctor,
  getActiveAppointmentsByDoctor,
  getUpcomingAppointmentsByDoctor,
} = require("../controllers/appointment.js");
const {
  verifyToken,
  isAdmin,
  isOwner,
  isDoctor,
  isOwnerOrAdmin,
  isOwnerOrDoctor,
} = require("../middlewares/authRole.js");
const express = require("express");

const router = express.Router();

// Create a new Appointment
router.post("/", verifyToken, createAppointment);

// Update an existing Appointment
router.put("/:id", verifyToken, isOwnerOrDoctor, isAdmin, updateAppointment);

// Get an Appointment by ID
router.get("/:id", verifyToken, isOwnerOrDoctor, isAdmin, getAppointmentById);

// Get all Appointments
router.get("/", verifyToken, isAdmin, isDoctor, getAppointments);

// Delete an Appointment
router.delete(
  "/:id",
  verifyToken,
  isOwnerOrAdmin,
  deleteAppointment
);

// Reschedule an Appointment
router.put(
  "/:id/reschedule",
  verifyToken,
  isOwner,
  isAdmin,
  isDoctor,
  rescheduleAppointment
);

// Update an Appointment's status
router.put(
  "/:id/status",
  verifyToken,
  isDoctor,
  isAdmin,
  updateAppointmentStatus
);

// Get all Appointments by Patient
router.get(
  "/patients/:patientId",
  verifyToken,
  isOwnerOrAdmin,
  isDoctor,
  getAppointmentsByPatient
);

// Get all Active Appointments by Patient
router.get(
  "/patients/:patientId/active",
  verifyToken,
  isOwner,
  isAdmin,
  isDoctor,
  getActiveAppointmentsByPatient
);

// Get all Upcoming Appointments by Patient
router.get(
  "/patients/:patientId/upcoming",
  verifyToken,
  isOwner,
  isAdmin,
  isDoctor,
  getUpcomingAppointmentsByPatient
);

// Get all Appointments by Doctor
router.get(
  "/doctors/:doctorId",
  verifyToken,
  isDoctor,
  isAdmin,
  getAppointmentsByDoctor
);

// Get all Active Appointments by Doctor
router.get(
  "/doctors/:doctorId/active",
  verifyToken,
  isDoctor,
  isAdmin,
  getActiveAppointmentsByDoctor
);

// Get all Upcoming Appointments by Doctor
router.get(
  "/doctors/:doctorId/upcoming",
  verifyToken,
  isDoctor,
  isAdmin,
  getUpcomingAppointmentsByDoctor
);

module.exports = router;
