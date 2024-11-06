import { DataTypes } from "sequelize";
import sequelize from "../connect.js";
import User from "./User.js";

// Define the doctor model
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

export default Doctor;
