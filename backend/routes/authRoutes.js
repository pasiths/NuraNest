const { register, login, logout } = require("../controllers/auth.js");
const express = require("express");

const router = express.Router();

// Register route for a new user
router.post("/register", register);

// Login route for an existing user
router.post("/login", login);

// Logout route for an existing user
router.post("/logout", logout);

module.exports = router;
