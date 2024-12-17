const {
  updateUser,
  getUser,
  getUsers,
  getUserByRole,
  deleteUser,
} = require("../controllers/user.js");
const { verifyToken, isAdmin, isOwner } = require("../middlewares/authRole.js");
const express = require("express");

const router = express.Router();

// Update a user
router.put("/:id", verifyToken, isOwner, isAdmin, updateUser);

// Get a user by ID
router.get("/:id", verifyToken, isOwner, isAdmin, getUser);

// Get all users
router.get("/", verifyToken, isAdmin, getUsers);

// Get user by role
router.get("/role/:role", verifyToken, isAdmin, getUserByRole);

// Delete a user
router.delete("/:id", verifyToken, isOwner, isAdmin, deleteUser);

module.exports = router;
