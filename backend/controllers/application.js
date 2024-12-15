const Application = require("../models/Application.js");
const logger = require("../middlewares/logger.js");
const { Op } = require("sequelize");

// Create a new application
exports.createApplication = async (req, res) => {
  const {
    name,
    email,
    address,
    contactNo,
    qualification,
    specialization,
    workplace,
    consultationFee,
    availableDays,
  } = req.body;

  try {
    // Create a new Application
    const application = await Application.create({
      name,
      email,
      address,
      contactNo,
      qualification,
      specialization,
      workplace,
      consultationFee,
      availableDays,
      status: true,
    });

    logger.info("Application created successfully");
    return res.status(201).json({ application });
  } catch (error) {
    logger.error("Error creating the application", error);
    return res.status(500).json({
      message: "Unable to create the application",
      error: error.message,
    });
  }
};

// Update an Application
exports.updateApplication = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    address,
    contactNo,
    qualification,
    specialization,
    workplace,
    consultationFee,
    availableDays,
  } = req.body;

  try {
    // Find the Application by ID
    const application = await Application.findByPk(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the Application
    if (name) {
      application.name = name;
    }

    if (email) {
      application.email = email;
    }

    if (address) {
      application.address = address;
    }

    if (contactNo) {
      application.contactNo = contactNo;
    }

    if (qualification) {
      application.qualification = qualification;
    }

    if (specialization) {
      application.specialization = specialization;
    }

    if (workplace) {
      application.workplace = workplace;
    }

    if (consultationFee) {
      application.consultationFee = consultationFee;
    }

    if (availableDays) {
      application.availableDays = availableDays;
    }

    // Save the updated Application
    await application.save();

    logger.info("Application updated successfully");
    return res.status(200).json({ application });
  } catch (error) {
    logger.error("Error updating the application", error);
    return res.status(500).json({
      message: "Unable to update the application",
      error: error.message,
    });
  }
};

// Get an Appointment by ID
exports.getApplicationById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the Application by ID
    const application = await Application.findByPk(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    logger.info("Application has been retrieved successfully");
    return res.status(200).json({ application });
  } catch (error) {
    logger.error("Error getting the application", error);
    return res.status(500).json({
      message: "Unable to get the application",
      error: error.message,
    });
  }
};

// Get all Applications
exports.getApplications = async (req, res) => {
  try {
    // Find all Applications
    const application = await Application.findAll();

    logger.info("Applications have been retrieved successfully");
    return res.status(200).json({ application });
  } catch (error) {
    logger.error("Error getting the applications", error);
    return res.status(500).json({
      message: "Unable to get the applications",
      error: error.message,
    });
  }
};

// Delete an Application (Soft delete)
exports.deleteApplication = async (req, res) => {
  const { id } = req.params;

  try {
    const application = await Application.findByPk(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = false;
    await application.save();

    logger.info("Application deleted successfully");
    return res.status(200).json({ application });
  } catch (error) {
    logger.error("Error deleting the application", error);
    return res.status(500).json({
      message: "Unable to delete the application",
      error: error.message,
    });
  }
};
