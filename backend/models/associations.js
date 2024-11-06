import User from "./User.js";
import Doctor from "./Doctor.js";
import Patient from "./Patient.js";
import Admin from "./Admin.js";
import Appointment from "./Appointment.js";
import Payment from "./Payment.js";
import Blog from "./Blog.js";

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
export { User, Doctor, Patient, Admin, Appointment, Payment, Blog };
