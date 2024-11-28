const {
  createDoctor,
  updateDoctor,
  getAllDoctors,
  getDoctorById,
  deleteDoctor,
} = require("../controllers/doctor.js");
const { verifyToken, isOwnerOrAdmin } = require("../middlewares/authRole.js");
const express = require("express");

const router = express.Router();

// Create a new Doctor
router.post("/", verifyToken, createDoctor);

// Update a Doctor
router.put("/:id", verifyToken, isOwnerOrAdmin, updateDoctor);

// Get all Doctors
router.get("/", verifyToken, getAllDoctors);

// Get a single Doctor
router.get("/:id", verifyToken, getDoctorById);

// Delete a Doctor
router.delete("/:id", verifyToken, isOwnerOrAdmin, deleteDoctor);

module.exports = router;
