const {
  createAdmin,
  getAdmin,
  getAdmins,
  deleteAdmin,
} = require("../controllers/admin.js");
const { verifyToken } = require("../middlewares/authRole.js");
const express = require("express");

const router = express.Router();

// Create a new Admin
router.post("/", verifyToken, createAdmin);

// Get all Admins
router.get("/", verifyToken, getAdmins);

// Get a single Admin
router.get("/:id", verifyToken, getAdmin);

// Delete a single Admin
router.delete("/:id", verifyToken, deleteAdmin);

module.exports = router;
