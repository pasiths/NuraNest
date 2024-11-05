const { DataTypes } = require("sequelize");
const sequelize = require("../connect.js"); // Ensure this points to your Sequelize instance

// Define the Payment model
const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    paymentMethod: {
      type: DataTypes.STRING(100),
      allowNull: true, // Assuming it can be null
    },
    paymentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.STRING(100),
      allowNull: true, // Assuming it can be null
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
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
    tableName: "payments", // Specify the table name
  }
);

// Associations
Payment.associate = (models) => {
  // A Payment belongs to a Patient
  Payment.belongsTo(models.Patient, {
    foreignKey: "patientId", // Foreign key in the Payment table
    as: "patient", // Alias for the association
    onDelete: "CASCADE", // Deletes payments when the associated patient is deleted
  });
};

module.exports = Payment;
