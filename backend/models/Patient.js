const { DataTypes } = require("sequelize");
const sequelize = require("../connect.js"); // Ensure this points to your Sequelize instance
const User = require("./User.js"); // Adjust the path as necessary

// Define the Patient model
const Patient = sequelize.define(
  "Patient",
  {
    // Include the medicalHistory specific to the Patient model
    medicalHistory: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    // Options
    timestamps: true, // Automatically manage createdAt and updatedAt
    tableName: "patients", // Specify the table name
  }
);

// Associations
Patient.associate = (models) => {
  // A Patient belongs to a User
  Patient.belongsTo(models.User, {
    foreignKey: "userId", // Foreign key in the Patient table
    as: "user", // Alias for the association
  });

  // A Patient can have many Appointments
  Patient.hasMany(models.Appointment, {
    foreignKey: "patientId", // Define the foreign key in the Appointment model
    as: "appointments",
  });

  // A Patient can have many Payments
  Patient.hasMany(models.Payment, {
    foreignKey: "patientId", // Define the foreign key in the Payment model
    as: "payments",
  });
};

module.exports = Patient;
