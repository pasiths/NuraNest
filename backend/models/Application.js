const { DataTypes } = require("sequelize");
const sequelize = require("../connect.js");

// Define the Application model
const Application = sequelize.define(
  "Application",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qualification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workplace: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    consultationFee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    availableDays: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
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

module.exports = Application;
