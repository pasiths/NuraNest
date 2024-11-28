const {
  createDoctor,
  updateDoctor,
  getAllDoctors,
  getDoctorById,
  deleteDoctor,
} = require("../controllers/doctor.js");
const express = require("express");

const router = express.Router();

// Create a new Doctor
router.post("/", createDoctor);

// Update a Doctor
router.put("/:id", updateDoctor);

// Get all Doctors
router.get("/", getAllDoctors);

// Get a single Doctor
router.get("/:id", getDoctorById);

// Delete a Doctor
router.delete("/:id", deleteDoctor);

module.exports = router;
