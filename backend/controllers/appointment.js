const Appointment = require("../models/Appointment.js");

// Create a new appointment
exports.creatAppointment = async (req, res) => {
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
    // Create a new appointment
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

    console.log("Appointment created successfully");
    return res.status(201).json({ appointment });
  } catch (error) {
    console.error("Error creating the appointment", error);
    return res.status(500).json({
      message: "Unable to create the appointment",
      error: error.message,
    });
  }
};

// Update an appointment by ID
exports.updateAppointment = async (req, res) => {
  const { id } = req.params;
  const {
    appointmentDate,
    appointmentTime,
    appointmentType,
    appointmentLocation,
    additionalInfo,
    status,
  } = req.body;

  try {
    // Find the appointment by ID
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Update the fields if they are provided
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

    if (status) {
      appointment.status = status;
    }

    // Save the updated appointment
    await appointment.save();

    console.log("Appointment updated successfully");
    return res
      .status(200)
      .json({ message: "Appointment updated", appointment });
  } catch (error) {
    console.error("Error updating the appointment", error);
    return res.status(500).json({
      message: "Unable to update the appointment",
      error: error.message,
    });
  }
};

// Get an appointment by ID
exports.getAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the appointment by ID
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    console.log("Appointment fetched successfully");
    return res.status(200).json({ appointment });
  } catch (error) {
    console.error("Error fetching the appointment", error);
    return res.status(500).json({
      message: "Unable to get the appointment",
      error: error.message,
    });
  }
};

// Delete an appointment by ID(set status to false)
exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the appointment by ID
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Set the status to false
    appointment.status = false;
    await appointment.save();

    console.log("Appointment deleted successfully");
    return res
      .status(200)
      .json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting the appointment", error);
    return res.status(500).json({
      message: "Unable to delete the appointment",
      error: error.message,
    });
  }
};
