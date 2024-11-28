const {
  createPayment,
  updatePayment,
  getAllPayments,
  getPaymentById,
  deletePayment,
} = require("../controllers/payment.js");
const {
  verifyToken,
  isAdmin,
  isOwnerOrAdmin,
} = require("../middlewares/authRole.js");
const express = require("express");

const router = express.Router();

// Create a new Payment
router.post("/", verifyToken, createPayment);

// Update a Payment
router.put("/:id", verifyToken, isOwnerOrAdmin, updatePayment);

// Get all Payments
router.get("/", verifyToken, isAdmin, getAllPayments);

// Get a Payment by ID
router.get("/:id", verifyToken, isOwnerOrAdmin, getPaymentById);

// Delete a Payment
router.delete("/:id", verifyToken, isOwnerOrAdmin, deletePayment);

module.exports = router;
