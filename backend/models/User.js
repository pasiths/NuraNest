const { DataTypes } = require("sequelize");
const sequelize = require("../connect.js"); // Ensure this points to your Sequelize instance

// Define the User model
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  contactNo: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("admin", "patient", "doctor"), // Inheritance type
    defaultValue: "patient",
  },
}, 
{
  // Options
  timestamps: true, // Automatically manage createdAt and updatedAt
  tableName: "users", // Specify the table name
});

// Associations
User.associate = (models) => {
  User.hasMany(models.Appointment, {
    foreignKey: "userId", 
    as: "appointments",
  });
  User.hasMany(models.Blog, {
    foreignKey: "userId", 
    as: "blogs",
  });
  User.hasMany(models.Payment, {
    foreignKey: "userId", 
    as: "payments",
  });
};

module.exports = User;
