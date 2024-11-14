const { DataTypes } = require("sequelize");
const sequelize = require("../connect.js");
const Patient = require("./Patient.js");
const Doctor = require("./Doctor.js");

// Define the Appointment model

const Appointment = sequelize.define(
  "Appointment",
  {
    appointmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    appointmentTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    appointmentType: {
      type: DataTypes.ENUM("online", "physical"),
      allowNull: false,
    },
    appointmentLocation: {
      type: DataTypes.STRING,
    },
    additionalInfo: {
      type: DataTypes.TEXT,
    },
    patientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Patient,
        key: "id",
      },
    },
    doctorId: {
      type: DataTypes.INTEGER,
      references: {
        model: Doctor,
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("active", "cancelled", "completed"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Appointment;
