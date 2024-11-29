const Appointment = require("../models/Appointment.js");
const logger = require("../middlewares/logger.js");

// Create an Appointment
exports.createAppointment = async (req, res) => {
  const {
    appointmentDate,
    appointmentTime,
    appointmentType,
    appointmentLocation,
    additionalInfo,
    patientId,
    doctorId,
  } = req.body;

  try {
    // Create a new Appointment
    const appointment = await Appointment.create({
      appointmentDate,
      appointmentTime,
      appointmentType,
      appointmentLocation,
      additionalInfo,
      patientId,
      doctorId,
      status: "active",
    });

    logger.info("Appointment created successfully");
    return res.status(201).json({ appointment });
  } catch (error) {
    logger.error("Error creating the appointment", error);
    return res.status(500).json({
      message: "Unable to create the appointment",
      error: error.message,
    });
  }
};

// Update an Appointment
exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const {
    appointmentDate,
    appointmentTime,
    appointmentType,
    appointmentLocation,
    additionalInfo,
    patientId,
    doctorId,
  } = req.body;

  try {
    // Find the Appointment by ID
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Update the Appointment
    if (appointmentDate) {
      appointment.appointmentDate = appointmentDate;
    }

    if (appointmentTime) {
      appointment.appointmentTime = appointmentTime;
    }

    if (appointmentType) {
      appointment.appointmentType = appointmentType;
    }

    if (appointmentLocation) {
      appointment.appointmentLocation = appointmentLocation;
    }

    if (additionalInfo) {
      appointment.additionalInfo = additionalInfo;
    }

    if (patientId) {
      appointment.patientId = patientId;
    }

    if (doctorId) {
      appointment.doctorId = doctorId;
    }

    // Save the updated Appointment
    await appointment.save();

    logger.info("Appointment updated successfully");
    return res.status(200).json({ appointment });
  } catch (error) {
    logger.error("Error updating the appointment", error);
    return res.status(500).json({
      message: "Unable to update the appointment",
      error: error.message,
    });
  }
};

// Get an Appointment by ID
exports.getAppointmentById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the Appointment by ID
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    logger.info("Appointment has been retrieved successfully");
    return res.status(200).json({ appointment });
  } catch (error) {
    logger.error("Error getting the appointment", error);
    return res.status(500).json({
      message: "Unable to get the appointment",
      error: error.message,
    });
  }
};

// Get all Appointments
exports.getAppointments = async (req, res) => {
  try {
    // Find all Appointments
    const appointments = await Appointment.findAll();

    logger.info("Appointments have been retrieved successfully");
    return res.status(200).json({ appointments });
  } catch (error) {
    logger.error("Error getting the appointments", error);
    return res.status(500).json({
      message: "Unable to get the appointments",
      error: error.message,
    });
  }
};

// Delete an Appointment (Soft delete)
exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the Appointment by ID
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Soft delete the Appointment
    await appointment.update({ status: "cancelled" });

    logger.info("Appointment cancelled successfully");
    return res.status(200).json({ message: "Appointment cancelled" });
  } catch (error) {
    logger.error("Error cancelling the appointment", error);
    return res.status(500).json({
      message: "Unable to cancel the appointment",
      error: error.message,
    });
  }
};
