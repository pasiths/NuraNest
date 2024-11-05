require("dotenv").config();

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    require("./models/User.js"),
    require("./models/Admin.js"),
    require("./models/Doctor.js"),
    require("./models/Patient.js"),
    require("./models/Appointment.js"),
    require("./models/Payment.js"),
    require("./models/Blog.js"),
  ],
  synchronize: true,
  logging: true,
};
