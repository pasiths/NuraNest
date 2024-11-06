import { DataTypes } from "sequelize";
import sequelize from "../connect.js";
import User from "./User.js";

// Define the patient model
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

export default Patient;
