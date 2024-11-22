const Doctor = require("../models/Doctor.js");
const Patient = require("../models/Patient.js");
const Appointment = require("../models/Appointment.js");

// Create his/her doctor profile using the doctor's userId from jwt payload after login
exports.createDoctorProfile = async (req, res) => {
  const { userId } = req.user;
  const { qualification, specialization, workplace, consultationFee } =
    req.body;

  try {
    const existingDoctor = await Doctor.findOne({ where: { userId } });

    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor profile already exists" });
    }

    const newDoctor = await Doctor.create({
      userId,
      qualification,
      specialization,
      workplace,
      consultationFee,
    });

    return res.status(201).json({
      message: "Doctor profile created successfully",
      doctor: newDoctor,
    });
  } catch (error) {
    console.error("Error in creating a doctor profile: ", error);
    return res.status(500).json({
      message: "Unable to create a doctor profile",
      error: error.message,
    });
  }
};

// Get the doctor's profile
exports.getDoctorProfile = async (req, res) => {
  const { userId } = req.user;

  try {
    const doctor = await Doctor.findOne({ where: { userId } });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    return res.status(200).json({ doctor });
  } catch (error) {
    console.error("Error in getting doctor profile: ", error);
    return res.status(500).json({
      message: "Unable to get doctor profile",
      error: error.message,
    });
  }
};

// Update the doctor's profile
exports.updateDoctorProfile = async (req, res) => {
  const { userId } = req.user;
  const { qualification, specialization, workplace, consultationFee } =
    req.body;

  try {
    const doctor = await Doctor.findOne({ where: { userId } });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

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

    await doctor.save();

    return res.status(200).json({
      message: "Doctor profile updated successfully",
      doctor,
    });
  } catch (error) {
    console.error("Error in updating doctor profile: ", error);
    return res.status(500).json({
      message: "Unable to update doctor profile",
      error: error.message,
    });
  }
};

// Get all the appointments of the doctor that's associated with the doctor's id
exports.getAppointments = async (req, res) => {
  const { userId } = req.user;

  try {
    const doctor = await Doctor.findOne({ where: { userId } });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const appointments = await Appointment.findAll({
      where: { doctorId: doctor.id },
      include: [
        {
          model: Patient,
          include: [{ model: User, attributes: ["name", "email"] }],
        },
      ],
    });

    return res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error in getting appointments: ", error);
    return res.status(500).json({
      message: "Unable to get appointments",
      error: error.message,
    });
  }
};

// Update the status of the appointment
exports.updateAppointmentStatus = async (req, res) => {
  const { userId } = req.user;
  const { appointmentId, status } = req.body;

  try {
    const doctor = await Doctor.findOne({ where: { userId } });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const appointment = await Appointment.findOne({
      where: { id: appointmentId, doctorId: doctor.id },
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    return res.status(200).json({
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error in updating appointment status: ", error);
    return res.status(500).json({
      message: "Unable to update appointment status",
      error: error.message,
    });
  }
};

// Reschedule the appointment
exports.rescheduleAppointment = async (req, res) => {
  const { userId } = req.user;
  const { appointmentId, appointmentDate, appointmentTime } = req.body;

  try {
    const doctor = await Doctor.findOne({ where: { userId } });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const appointment = await Appointment.findOne({
      where: { id: appointmentId, doctorId: doctor.id },
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.appointmentDate = appointmentDate;
    appointment.appointmentTime = appointmentTime;
    await appointment.save();

    return res.status(200).json({
      message: "Appointment rescheduled successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error in rescheduling appointment: ", error);
    return res.status(500).json({
      message: "Unable to reschedule appointment",
      error: error.message,
    });
  }
};

// View the patient's profile
exports.viewPatientProfile = async (req, res) => {
  const { userId } = req.user;
  const { patientId } = req.params;

  try {
    const doctor = await Doctor.findOne({ where: { userId } });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const patient = await Patient.findOne({ where: { id: patientId } });

    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    return res.status(200).json({ patient });
  } catch (error) {
    console.error("Error in viewing patient profile: ", error);
    return res.status(500).json({
      message: "Unable to view patient profile",
      error: error.message,
    });
  }
};
