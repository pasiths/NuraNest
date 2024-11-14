const { getBlogs, getBlogById } = require("../controllers/blog.js");
const express = require("express");

const router = express.Router();

// Get all blogs
router.get("/", getBlogs);

// Get a blog by ID
router.get("/:id", getBlogById);

module.exports = router;
