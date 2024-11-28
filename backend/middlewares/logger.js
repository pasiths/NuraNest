const winston = require("winston");
const path = require("path");

// Define custom Log format
const { combine, timestamp, label, printf, errors } = winston.format;
const logFormat = printf(({ level, message, label, timestamp, stack }) => {
  return `${timestamp} [${label}] ${level}: ${stack || message}`;
});

// Create a logger instance
const logger = winston.createLogger({
  format: combine(
    label({ label: "Hotel Management System" }),
    timestamp(),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    // Log errors to a file
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error",
    }),
    // Log all other information and above logs to another file
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/combined.log"),
    }),
  ],
});

// If we are not in production then log to the console
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

module.exports = logger;
