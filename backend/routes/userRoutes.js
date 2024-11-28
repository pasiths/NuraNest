const {
  updateUser,
  getUser,
  getUsers,
  deleteUser,
} = require("../controllers/user.js");
const {
  verifyToken,
  isOwnerOrAdmin,
  isAdmin,
} = require("../middlewares/authRole.js");
const express = require("express");

const router = express.Router();

// Update a user
router.put("/:id", verifyToken, isOwnerOrAdmin, updateUser);

// Get a user by ID
router.get("/:id", verifyToken, isOwnerOrAdmin, getUser);

// Get all users
router.get("/", verifyToken, isAdmin, getUsers);

// Delete a user
router.delete("/:id", verifyToken, isOwnerOrAdmin, deleteUser);

module.exports = router;
