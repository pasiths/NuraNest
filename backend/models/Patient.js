const { DataTypes } = require("sequelize");
const sequelize = require("../connect.js");
const User = require("./User.js");

// Define the Patient model

const Patient = sequelize.define("Patient", {
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
});

module.exports = Patient;
