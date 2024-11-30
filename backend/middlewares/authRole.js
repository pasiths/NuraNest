const jwt = require("jsonwebtoken");
const logger = require("./logger.js");

const JWT = process.env.JWT;

// Middleware to verify the token and extract user information
exports.verifyToken = (req, res, next) => {
  const token =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied! No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error("Error verifying the token", error);
    return res
      .status(401)
      .json({ message: "Unable to verify token", error: error.message });
  }
};

// Middleware to check if the user is an admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied! Admin only" });
  }

  next();
};

// Middleware to check if the user is the owner of the resource
exports.isOwner = (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json({ message: "Access Denied! Unauthorized" });
  }

  next();
};

// Middleware to check if the user is a doctor
exports.isDoctor = (req, res, next) => {
  if (req.user.role !== "doctor") {
    return res.status(403).json({ message: "Access Denied! Doctor only" });
  }

  next();
};
