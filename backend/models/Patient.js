const { DataTypes } = require("sequelize");
const sequelize = require("../connect.js");
const User = require("./User.js");

// Define the Patient model

const Patient = sequelize.define(
  "Patient",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    medicalHistory: {
      type: DataTypes.TEXT,
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

module.exports = Patient;
