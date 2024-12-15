const {
  createApplication,
  updateApplication,
  getApplicationById,
  getApplications,
  deleteApplication,
} = require("../controllers/application.js");
const express = require("express");

const router = express.Router();

// Create a new Application
router.post("/", createApplication);

// Update an existing Application
router.put("/:id", updateApplication);

// Get an Application by ID
router.get("/:id", getApplicationById);

// Get all Applications
router.get("/", getApplications);

// Delete an Application
router.delete("/:id", deleteApplication);

module.exports = router;
