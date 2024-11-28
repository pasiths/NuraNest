const {
  createAdmin,
  getAdmin,
  getAdmins,
  deleteAdmin,
} = require("../controllers/admin.js");
const express = require("express");

const router = express.Router();

// Create a new Admin
router.post("/", createAdmin);

// Get all Admins
router.get("/", getAdmins);

// Get a single Admin
router.get("/:id", getAdmin);

// Delete a single Admin
router.delete("/:id", deleteAdmin);

module.exports = router;
