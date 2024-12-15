const User = require("./User.js");
const Doctor = require("./Doctor.js");
const Patient = require("./Patient.js");
const Admin = require("./Admin.js");
const Appointment = require("./Appointment.js");
const Payment = require("./Payment.js");
const Blog = require("./Blog.js");
const Application = require("./Application.js");

// User associations
User.hasOne(Admin, { foreignKey: "userId" });
Admin.belongsTo(User, { foreignKey: "userId" });

User.hasOne(Doctor, { foreignKey: "userId" });
Doctor.belongsTo(User, { foreignKey: "userId" });

User.hasOne(Patient, { foreignKey: "userId" });
Patient.belongsTo(User, { foreignKey: "userId" });

// Patient and Doctor Association with Appointment
Patient.hasMany(Appointment, { foreignKey: "patientId" });
Appointment.belongsTo(Patient, { foreignKey: "patientId" });

Doctor.hasMany(Appointment, { foreignKey: "doctorId" });
Appointment.belongsTo(Doctor, { foreignKey: "doctorId" });

// Admin association with Blog
Admin.hasMany(Blog, { foreignKey: "authorId" });
Blog.belongsTo(Admin, { foreignKey: "authorId" });

// Patient association with Payment
Patient.hasMany(Payment, { foreignKey: "patientId" });
Payment.belongsTo(Patient, { foreignKey: "patientId" });

// Export all models to use in other parts of the app
module.exports = {
  User,
  Doctor,
  Patient,
  Admin,
  Appointment,
  Payment,
  Blog,
  Application,
};
