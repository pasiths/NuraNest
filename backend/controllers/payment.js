const Payment = require("../models/Payment.js");

// Create a Payment
exports.createPayment = async (req, res) => {
  const { paymentMethod, paymentStatus, paymentDate, amount, patientId } =
    req.body;

  try {
    // Create a new Payment
    const payment = await Payment.create({
      paymentMethod,
      paymentStatus,
      paymentDate,
      amount,
      patientId,
      status: true,
    });

    console.log("Payment created successfully");
    return res.status(201).json({ payment });
  } catch (error) {
    console.error("Error creating the payment", error);
    return res.status(500).json({
      message: "Unable to create the payment",
      error: error.message,
    });
  }
};

// Update a Payment
exports.updatePayment = async (req, res) => {
  const { id } = req.params;
  const { paymentMethod, paymentStatus, paymentDate, amount, patientId } =
    req.body;

  try {
    // Find the Payment by ID
    const payment = await Payment.findByPk(id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Update the Payment
    if (paymentMethod) {
      payment.paymentMethod = paymentMethod;
    }

    if (paymentStatus) {
      payment.paymentStatus = paymentStatus;
    }

    if (paymentDate) {
      payment.paymentDate = paymentDate;
    }

    if (amount) {
      payment.amount = amount;
    }

    if (patientId) {
      payment.patientId = patientId;
    }

    await payment.save();

    console.log("Payment updated successfully");
    return res.status(200).json({ payment });
  } catch (error) {
    console.error("Error updating the payment", error);
    return res.status(500).json({
      message: "Unable to update the payment",
      error: error.message,
    });
  }
};

// Get all Payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();

    console.log("Payments retrieved successfully");
    return res.status(200).json({ payments });
  } catch (error) {
    console.error("Error getting the payments", error);
    return res.status(500).json({
      message: "Unable to get the payments",
      error: error.message,
    });
  }
};

// Get a Payment by ID
exports.getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findByPk(id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    console.log("Payment retrieved successfully");
    return res.status(200).json({ payment });
  } catch (error) {
    console.error("Error getting the payment", error);
    return res.status(500).json({
      message: "Unable to get the payment",
      error: error.message,
    });
  }
};

// Delete a Payment (Soft delete)
exports.deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findByPk(id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.status = false;
    await payment.save();

    console.log("Payment deleted successfully");
    return res.status(200).json({ id });
  } catch (error) {
    console.error("Error deleting the payment", error);
    return res.status(500).json({
      message: "Unable to delete the payment",
      error: error.message,
    });
  }
};
