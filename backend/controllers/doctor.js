const Doctor = require("../models/Doctor.js");

// Create a new Doctor
exports.createDoctor = async (req, res) => {
  const {
    userId,
    qualification,
    specialization,
    workplace,
    consultationFee,
    availableDays,
  } = req.body;

  try {
    const doctor = await Doctor.create({
      userId,
      qualification,
      specialization,
      workplace,
      consultationFee,
      availableDays,
      role: "doctor",
      status: true,
    });

    console.log("Doctor has been created successfully");
    return res.status(201).json({ doctor });
  } catch (error) {
    console.error("Error creating the doctor", error);
    return res.status(500).json({
      message: "Unable to create the doctor",
      error: error.message,
    });
  }
};

// Update a Doctor
exports.updateDoctor = async (req, res) => {
  const { id } = req.params;
  const {
    qualification,
    specialization,
    workplace,
    consultationFee,
    availableDays,
  } = req.body;

  try {
    const doctor = await Doctor.findByPk(id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Update the Doctor
    if (qualification) {
      doctor.qualification = qualification;
    }

    if (specialization) {
      doctor.specialization = specialization;
    }

    if (workplace) {
      doctor.workplace = workplace;
    }

    if (consultationFee) {
      doctor.consultationFee = consultationFee;
    }

    if (availableDays) {
      doctor.availableDays = availableDays;
    }

    await doctor.save();

    console.log("Doctor has been updated successfully");
    return res.status(200).json({ doctor });
  } catch (error) {
    console.error("Error updating the doctor", error);
    return res.status(500).json({
      message: "Unable to update the doctor",
      error: error.message,
    });
  }
};

// Get all Doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();

    console.log("Fetched all doctors successfully");
    return res.status(200).json({ doctors });
  } catch (error) {
    console.error("Error fetching doctors", error);
    return res.status(500).json({
      message: "Unable to fetch doctors",
      error: error.message,
    });
  }
};

// Get a Doctor by ID
exports.getDoctorById = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findByPk(id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    console.log("Doctor fetched successfully");
    return res.status(200).json({ doctor });
  } catch (error) {
    console.error("Error fetching the doctor", error);
    return res.status(500).json({
      message: "Unable to fetch the doctor",
      error: error.message,
    });
  }
};

// Delete a Doctor (Soft delete)
exports.deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findByPk(id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    doctor.status = false;
    await doctor.save();

    console.log("Doctor has been deleted successfully");
    return res.status(200).json({ doctor });
  } catch (error) {
    console.error("Error deleting the doctor", error);
    return res.status(500).json({
      message: "Unable to delete the doctor",
      error: error.message,
    });
  }
};
