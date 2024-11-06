const { DataTypes } = require("sequelize");
const sequelize = require("../connect.js");
const User = require("./User.js");

// Define the Doctor model

const Doctor = sequelize.define("Doctor", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  qualification: {
    type: DataTypes.STRING,
  },
  specialization: {
    type: DataTypes.STRING,
  },
  workplace: {
    type: DataTypes.STRING,
  },
  consultationFee: {
    type: DataTypes.DECIMAL(10, 2),
  },
});

module.exports = Doctor;
