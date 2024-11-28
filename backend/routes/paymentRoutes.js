const {
  createPayment,
  updatePayment,
  getAllPayments,
  getPaymentById,
  deletePayment,
} = require("../controllers/payment.js");
const express = require("express");

const router = express.Router();

// Create a new Payment
router.post("/", createPayment);

// Update a Payment
router.put("/:id", updatePayment);

// Get all Payments
router.get("/", getAllPayments);

// Get a Payment by ID
router.get("/:id", getPaymentById);

// Delete a Payment
router.delete("/:id", deletePayment);

module.exports = router;
