const {
  createPatient,
  updatePatient,
  getPatient,
  getPatients,
  deletePatient,
} = require("../controllers/patient.js");
const { verifyToken, isAdmin, isOwner } = require("../middlewares/authRole.js");
const express = require("express");

const router = express.Router();

// Create a new Patient
router.post("/", verifyToken, createPatient);

// Update a Patient
router.put("/:id", verifyToken, isOwner, isAdmin, updatePatient);

// Get all Patients
router.get("/", verifyToken, isAdmin, getPatients);

// Get a single Patient
router.get("/:id", verifyToken, isOwner, isAdmin, getPatient);

// Delete a single Patient
router.delete("/:id", verifyToken, isOwner, isAdmin, deletePatient);

module.exports = router;
