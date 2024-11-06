import { DataTypes } from "sequelize";
import sequelize from "../connect.js";
import Patient from "./Patient.js";
import Doctor from "./Doctor.js";

// Define the appointment model
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
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Appointment;
