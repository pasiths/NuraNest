const { DataTypes } = require("sequelize");
const sequelize = require("../connect.js");
const User = require("./User.js");

// Define the Admin model

const Admin = sequelize.define(
  "Admin",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
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

module.exports = Admin;
