const Payment = require("../models/Payment.js");

// Create a payment
exports.createPayment = async (req, res) => {
  const { paymentMethod, paymentStatus, paymentDate, amount, patientId } =
    req.body;

  try {
    // Create a new payment
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

// Update a payment by ID
exports.updatePayment = async (req, res) => {
  const { id } = req.params;
  const { paymentMethod, paymentStatus, paymentDate, amount } = req.body;

  try {
    // Find the payment by ID
    const payment = await Payment.findByPk(id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Update the fields if they are provided
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

    // Save the updated payment
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

// Get payment by ID
exports.getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the payment by ID
    const payment = await Payment.findByPk(id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    console.log("Payment found successfully");
    return res.status(200).json({ payment });
  } catch (error) {
    console.error("Error getting the payment", error);
    return res.status(500).json({
      message: "Unable to get the payment",
      error: error.message,
    });
  }
};

// Delete a payment by ID
exports.deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the payment by ID
    const payment = await Payment.findByPk(id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Delete the payment
    await payment.destroy();

    console.log("Payment deleted successfully");
    return res.status(200).json({ message: "Payment deleted" });
  } catch (error) {
    console.error("Error deleting the payment", error);
    return res.status(500).json({
      message: "Unable to delete the payment",
      error: error.message,
    });
  }
};
