const { DataTypes } = require("sequelize");
const sequelize = require("../connect.js");
const Patient = require("./Patient.js");

// Define the Payment model

const Payment = sequelize.define(
  "Payment",
  {
    paymentMethod: {
      type: DataTypes.ENUM(
        "credit card",
        "debit card",
        "net banking",
        "wallet",
        "cash"
      ),
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.ENUM("pending", "success", "failed"),
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    patientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Patient,
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

module.exports = Payment;
