const {
  createDoctor,
  updateDoctor,
  getAllDoctors,
  getDoctorById,
  deleteDoctor,
  getDoctorByUserId,
} = require("../controllers/doctor.js");
const { verifyToken, isOwner, isAdmin } = require("../middlewares/authRole.js");
const express = require("express");

const router = express.Router();

// Create a new Doctor
router.post("/", verifyToken, createDoctor);

// Update a Doctor
router.put("/:id", verifyToken,  updateDoctor);

// Get all Doctors
router.get("/", verifyToken, getAllDoctors);

// Get a single Doctor
router.get("/:id", verifyToken, getDoctorById);

// Find Doctor by User ID
router.get("/user/:userId", verifyToken, getDoctorByUserId);

// Delete a Doctor
router.delete("/:id", verifyToken, isOwner, isAdmin, deleteDoctor);

module.exports = router;
