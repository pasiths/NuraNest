const {
  createPatient,
  updatePatient,
  getPatient,
  getPatients,
  deletePatient,
} = require("../controllers/patient.js");
const {
  verifyToken,
  isOwnerOrAdmin,
  isAdmin,
} = require("../middlewares/authRole.js");
const express = require("express");

const router = express.Router();

// Create a new Patient
router.post("/", verifyToken, createPatient);

// Update a Patient
router.put("/:id", verifyToken, isOwnerOrAdmin, updatePatient);

// Get all Patients
router.get("/", verifyToken, isAdmin, getPatients);

// Get a single Patient
router.get("/:id", verifyToken, isOwnerOrAdmin, getPatient);

// Delete a single Patient
router.delete("/:id", verifyToken, isOwnerOrAdmin, deletePatient);

module.exports = router;
