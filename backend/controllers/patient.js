const Patient = require("../models/Patient.js");
const logger = require("../middlewares/logger.js");

// Create a new Patient
exports.createPatient = async (req, res) => {
  const { userId, medicalHistory } = req.body;

  try {
    const patient = await Patient.create({
      userId,
      medicalHistory,
      role: "patient",
      status: true,
    });

    logger.info("Patient has been created successfully");
    return res.status(201).json({ patient });
  } catch (error) {
    logger.error("Error creating the patient", error);
    return res.status(500).json({
      message: "Unable to create the patient",
      error: error.message,
    });
  }
};

// Update a Patient
exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  const { medicalHistory } = req.body;

  try {
    const patient = await Patient.findByPk(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    if (medicalHistory) {
      patient.medicalHistory = medicalHistory;
    }

    await patient.save();

    logger.info("Patient has been updated successfully");
    return res.status(200).json({ patient });
  } catch (error) {
    logger.error("Error updating the patient", error);
    return res.status(500).json({
      message: "Unable to update the patient",
      error: error.message,
    });
  }
};

// Get all Patients
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();

    logger.info("Patients have been retrieved successfully");
    return res.status(200).json({ patients });
  } catch (error) {
    logger.error("Error getting the patients", error);
    return res.status(500).json({
      message: "Unable to get the patients",
      error: error.message,
    });
  }
};

// Get a single Patient
exports.getPatient = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findByPk(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    logger.info("Patient has been retrieved successfully");
    return res.status(200).json({ patient });
  } catch (error) {
    logger.error("Error getting the patient", error);
    return res.status(500).json({
      message: "Unable to get the patient",
      error: error.message,
    });
  }
};

// Delete a Patient (soft-delete)
exports.deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findByPk(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    patient.status = false;
    await patient.save();

    logger.info("Patient has been deleted successfully");
    return res.status(200).json({ patient });
  } catch (error) {
    logger.error("Error deleting the patient", error);
    return res.status(500).json({
      message: "Unable to delete the patient",
      error: error.message,
    });
  }
};
