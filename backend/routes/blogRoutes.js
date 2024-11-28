const { createBlog, updateBlog, getBlogs, getBlogById, deleteBlog } = require("../controllers/blog.js");
const express = require("express");

const router = express.Router();

// Create a blog
router.post("/", createBlog);

// Update a blog
router.put("/:id", updateBlog);

// Get all blogs
router.get("/", getBlogs);

// Get a blog by ID
router.get("/:id", getBlogById);

// Delete a blog
router.delete("/:id", deleteBlog);

module.exports = router;
