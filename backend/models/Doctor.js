const { DataTypes } = require("sequelize");
const sequelize = require("../connect.js"); // Ensure this points to your Sequelize instance
const User = require("./User.js"); // Adjust the path as necessary

// Define the Doctor model
const Doctor = sequelize.define("Doctor", {
  qualification: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  specialization: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  workplace: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  consultationFee: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
}, 
{
  // Options
  timestamps: true, // Automatically manage createdAt and updatedAt
  tableName: "doctors", // Specify the table name
});

// Associations
Doctor.associate = (models) => {
  // A Doctor belongs to a User
  Doctor.belongsTo(models.User, {
    foreignKey: "userId", // Foreign key in the Doctor table
    as: "user", // Alias for the association
  });

  // A Doctor can have many Appointments
  Doctor.hasMany(models.Appointment, {
    foreignKey: "doctorId", // Define the foreign key in the Appointment model
    as: "appointments",
  });
};

module.exports = Doctor;
