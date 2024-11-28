const {
  createPatient,
  updatePatient,
  getPatient,
  getPatients,
  deletePatient,
} = require("../controllers/patient.js");
const express = require("express");

const router = express.Router();

// Create a new Patient
router.post("/", createPatient);

// Update a Patient
router.put("/:id", updatePatient);

// Get all Patients
router.get("/", getPatients);

// Get a single Patient
router.get("/:id", getPatient);

// Delete a single Patient
router.delete("/:id", deletePatient);

module.exports = router;
