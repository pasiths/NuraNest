import { DataTypes } from "sequelize";
import sequelize from "../connect.js";
import User from "./User.js";

// Define the admin model
const Admin = sequelize.define("Admin", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

export default Admin;
