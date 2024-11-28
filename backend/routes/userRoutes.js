const {
  updateUser,
  getUser,
  getUsers,
  deleteUser,
} = require("../controllers/user.js");
const express = require("express");

const router = express.Router();

// Update a user
router.put("/:id", updateUser);

// Get a user by ID
router.get("/:id", getUser);

// Get all users
router.get("/", getUsers);

// Delete a user
router.delete("/:id", deleteUser);

module.exports = router;
