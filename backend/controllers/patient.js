const User = require("../models/User.js");
const Patient = require("../models/Patient.js");
const Doctor = require("../models/Doctor.js");
const Appointment = require("../models/Appointment.js");
const Payment = require("../models/Payment.js");

// Create a patient profile using his/her userId from jwt payload after login
exports.createPatientProfile = async (req, res) => {
  const { userId } = req.user;
  const { medicalHistory } = req.body;

  try {
    const existingPatient = await Patient.findOne({ where: { userId } });

    if (existingPatient) {
      return res
        .status(400)
        .json({ message: "Patient profile already exists" });
    }

    const newPatient = await Patient.create({
      userId,
      medicalHistory,
      role: "patient",
    });

    console.log("Patient profile created successfully");
    return res.status(201).json({
      message: "Patient profile created successfully",
      patient: newPatient,
    });
  } catch (error) {
    console.error("Error in creating a patient profile: ", error);
    return res.status(500).json({
      message: "Unable to create a patient profile",
      error: error.message,
    });
  }
};

// Get the patient's profile
exports.getPatientProfile = async (req, res) => {
  const { userId } = req.user;

  try {
    const patient = await Patient.findOne({ where: { userId } });

    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    console.log("Patient profile found successfully");
    return res.status(200).json({ patient });
  } catch (error) {
    console.error("Error in getting patient profile: ", error);
    return res.status(500).json({
      message: "Unable to get patient profile",
      error: error.message,
    });
  }
};

// Update the patient's profile
exports.updatePatientProfile = async (req, res) => {
  const { userId } = req.user;
  const { medicalHistory } = req.body;

  try {
    const patient = await Patient.findOne({ where: { userId } });

    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    if (medicalHistory) {
      patient.medicalHistory = medicalHistory;
    }

    await patient.save();

    console.log("Patient profile updated successfully");
    return res.status(200).json({
      message: "Patient profile updated successfully",
      patient,
    });
  } catch (error) {
    console.error("Error in updating patient profile: ", error);
    return res.status(500).json({
      message: "Unable to update patient profile",
      error: error.message,
    });
  }
};

// Make a payment for an appointment
exports.makePayment = async (req, res) => {
  const { userId } = req.user;
  const { appointmentId, paymentMethod, amount } = req.body;

  try {
    const patient = await Patient.findOne({ where: { userId } });

    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    const appointment = await Appointment.findOne({
      where: { id: appointmentId, patientId: patient.id },
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.status === "completed") {
      return res
        .status(400)
        .json({ message: "Payment already made for this appointment" });
    }

    const payment = await Payment.create({
      paymentMethod,
      paymentStatus: "success",
      paymentDate: new Date(),
      amount,
      patientId: patient.id,
    });

    appointment.status = "completed";
    await appointment.save();

    console.log("Payment made successfully");
    return res.status(201).json({
      message: "Payment made successfully",
      payment,
    });
  } catch (error) {
    console.error("Error in making payment: ", error);
    return res.status(500).json({
      message: "Unable to make payment",
      error: error.message,
    });
  }
};

// Get the patient's payment history
exports.getPatientPayments = async (req, res) => {
  const { userId } = req.user;

  try {
    const patient = await Patient.findOne({ where: { userId } });

    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    const payments = await Payment.findAll({
      where: { patientId: patient.id },
    });

    console.log("Patient payments found successfully");
    return res.status(200).json({ payments });
  } catch (error) {
    console.error("Error in getting patient payments: ", error);
    return res.status(500).json({
      message: "Unable to get patient payments",
      error: error.message,
    });
  }
};

// View Doctor's profile
exports.viewDoctorProfile = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const doctor = await Doctor.findByPk(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    console.log("Doctor found successfully");
    return res.status(200).json({ doctor });
  } catch (error) {
    console.error("Error in viewing doctor profile: ", error);
    return res.status(500).json({
      message: "Unable to view doctor profile",
      error: error.message,
    });
  }
};

// View Doctors list
exports.viewDoctorsList = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();

    console.log("Doctors list found successfully");
    return res.status(200).json({ doctors });
  } catch (error) {
    console.error("Error in viewing doctors list: ", error);
    return res.status(500).json({
      message: "Unable to view doctors list",
      error: error.message,
    });
  }
};

// Book an appointment with a doctor
exports.bookAppointment = async (req, res) => {
  const { userId } = req.user;
  const {
    doctorId,
    appointmentDate,
    appointmentTime,
    appointmentType,
    appointmentLocation,
    additionalInfo,
  } = req.body;

  try {
    const patient = await Patient.findOne({ where: { userId } });

    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    const doctor = await Doctor.findByPk(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointment = await Appointment.create({
      appointmentDate,
      appointmentTime,
      appointmentType,
      appointmentLocation,
      additionalInfo,
      patientId: patient.id,
      doctorId,
      status: "active",
    });

    console.log("Appointment created successfully");
    return res.status(201).json({ appointment });
  } catch (error) {
    console.error("Error in creating appointment: ", error);
    return res.status(500).json({
      message: "Unable to create appointment",
      error: error.message,
    });
  }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
  const { userId } = req.user;
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
    const patient = await Patient.findOne({ where: { userId } });

    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    const appointment = await Appointment.findOne({
      where: { id, patientId: patient.id },
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

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

    await appointment.save();

    console.log("Appointment updated successfully");
    return res.status(200).json({ appointment });
  } catch (error) {
    console.error("Error in updating appointment: ", error);
    return res.status(500).json({
      message: "Unable to update appointment",
      error: error.message,
    });
  }
};

// Cancel an appointment
exports.cancelAppointment = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  try {
    const patient = await Patient.findOne({ where: { userId } });

    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    const appointment = await Appointment.findOne({
      where: { id, patientId: patient.id },
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    console.log("Appointment cancelled successfully");
    return res.status(200).json({ message: "Appointment cancelled" });
  } catch (error) {
    console.error("Error in cancelling appointment: ", error);
    return res.status(500).json({
      message: "Unable to cancel appointment",
      error: error.message,
    });
  }
};

// Reschedule an appointment
exports.rescheduleAppointment = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const { appointmentDate, appointmentTime } = req.body;

  try {
    const patient = await Patient.findOne({ where: { userId } });

    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    const appointment = await Appointment.findOne({
      where: { id, patientId: patient.id },
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.appointmentDate = appointmentDate;
    appointment.appointmentTime = appointmentTime;
    await appointment.save();

    console.log("Appointment rescheduled successfully");
    return res.status(200).json({ appointment });
  } catch (error) {
    console.error("Error in rescheduling appointment: ", error);
    return res.status(500).json({
      message: "Unable to reschedule appointment",
      error: error.message,
    });
  }
};

// Get the patient's upcoming appointments
exports.getUpcomingAppointments = async (req, res) => {
  const { userId } = req.user;

  try {
    const patient = await Patient.findOne({ where: { userId } });

    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    const appointments = await Appointment.findAll({
      where: {
        patientId: patient.id,
        appointmentDate: { [Op.gte]: new Date() },
      },
      include: [{ model: Doctor, as: "doctor" }],
    });

    console.log("Patient upcoming appointments found successfully");
    return res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error in getting patient upcoming appointments: ", error);
    return res.status(500).json({
      message: "Unable to get patient upcoming appointments",
      error: error.message,
    });
  }
};

// Get the patient's past appointments
exports.getPastAppointments = async (req, res) => {
  const { userId } = req.user;

  try {
    const patient = await Patient.findOne({ where: { userId } });

    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    const appointments = await Appointment.findAll({
      where: {
        patientId: patient.id,
        appointmentDate: { [Op.lt]: new Date() },
      },
      include: [{ model: Doctor, as: "doctor" }],
    });

    console.log("Patient past appointments found successfully");
    return res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error in getting patient past appointments: ", error);
    return res.status(500).json({
      message: "Unable to get patient past appointments",
      error: error.message,
    });
  }
};

// Get the patient's active appointments
exports.getActiveAppointments = async (req, res) => {
  const { userId } = req.user;

  try {
    const patient = await Patient.findOne({ where: { userId } });

    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    const appointments = await Appointment.findAll({
      where: { patientId: patient.id, status: "active" },
      include: [{ model: Doctor, as: "doctor" }],
    });

    console.log("Patient active appointments found successfully");
    return res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error in getting patient active appointments: ", error);
    return res.status(500).json({
      message: "Unable to get patient active appointments",
      error: error.message,
    });
  }
};

// Get the doctor's availability
exports.getDoctorAvailability = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const doctor = await Doctor.findByPk(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointments = await Appointment.findAll({
      where: {
        doctorId: doctor.id,
        appointmentDate: { [Op.gte]: new Date() },
      },
    });

    console.log("Doctor availability found successfully");
    return res.status(200).json({ appointments });
  } catch (error) {
    console.error("Error in getting doctor availability: ", error);
    return res.status(500).json({
      message: "Unable to get doctor availability",
      error: error.message,
    });
  }
};
