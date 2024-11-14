const {
  createPayment,
  updatePayment,
  getPaymentById,
  deletePayment,
} = require("../controllers/payment.js");
const express = require("express");

const router = express.Router();

// Create a new payment
router.post("/", createPayment);

// Update a payment by ID
router.put("/:id", updatePayment);

// Get a payment by ID
router.get("/:id", getPaymentById);

// Delete a payment by ID
router.delete("/:id", deletePayment);

module.exports = router;
