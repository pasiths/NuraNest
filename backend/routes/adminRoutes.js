const {
  createAdmin,
  getAdmin,
  getAdmins,
  deleteAdmin,
} = require("../controllers/admin.js");
const { verifyToken, isAdmin } = require("../middlewares/authRole.js");
const express = require("express");

const router = express.Router();

// Create a new Admin
router.post("/", verifyToken, createAdmin);

// Get all Admins
router.get("/", verifyToken, isAdmin, getAdmins);

// Get a single Admin
router.get("/:id", verifyToken, isAdmin, getAdmin);

// Delete a single Admin
router.delete("/:id", verifyToken, isAdmin, deleteAdmin);

module.exports = router;
