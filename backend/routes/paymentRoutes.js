const {
  createPayment,
  updatePayment,
  getAllPayments,
  getPaymentById,
  deletePayment,
  getPaymentsByPatientId,
} = require("../controllers/payment.js");
const { verifyToken, isAdmin, isOwner } = require("../middlewares/authRole.js");
const express = require("express");

const router = express.Router();

// Create a new Payment
router.post("/", verifyToken, createPayment);

// Update a Payment
router.put("/:id", verifyToken, isOwner, isAdmin, updatePayment);

// Get all Payments
router.get("/", verifyToken, isAdmin, getAllPayments);

// Get a Payment by ID
router.get("/:id", verifyToken, isOwner, isAdmin, getPaymentById);

// Get Payments by Patient ID
router.get(
  "/patients/:patientId",
  verifyToken,
  isOwner,
  isAdmin,
  getPaymentsByPatientId
);

// Delete a Payment
router.delete("/:id", verifyToken, isOwner, isAdmin, deletePayment);

module.exports = router;
