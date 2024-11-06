const { register } = require("../controllers/auth.js");
const express = require("express");

const router = express.Router();

// Register route for a new user
router.post("/register", register);

module.exports = router;
