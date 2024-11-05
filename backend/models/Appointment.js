const { DataTypes } = require("sequelize");
const sequelize = require("../connect.js"); // Ensure this points to your Sequelize instance

// Define the Appointment model
const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    appointmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    appointmentTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    appointmentType: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    appointmentLocation: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    additionalInfo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    // Options
    timestamps: true, // Automatically manage createdAt and updatedAt
    tableName: "appointments", // Specify the table name
  }
);

// Associations
Appointment.associate = (models) => {
  // An Appointment belongs to a Patient
  Appointment.belongsTo(models.Patient, {
    foreignKey: "patientId", // Foreign key in the Appointment table
    as: "patient", // Alias for the association
    onDelete: "CASCADE", // Deletes appointments when the associated patient is deleted
  });

  // An Appointment belongs to a Doctor
  Appointment.belongsTo(models.Doctor, {
    foreignKey: "doctorId", // Foreign key in the Appointment table
    as: "doctor", // Alias for the association
    onDelete: "CASCADE", // Deletes appointments when the associated doctor is deleted
  });
};

module.exports = Appointment;
