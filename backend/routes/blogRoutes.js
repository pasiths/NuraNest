const {
  createBlog,
  updateBlog,
  getBlogs,
  getBlogById,
  deleteBlog,
} = require("../controllers/blog.js");
const { verifyToken, isAdmin } = require("../middlewares/authRole.js");
const express = require("express");

const router = express.Router();

// Create a blog
router.post("/", verifyToken, isAdmin, createBlog);

// Update a blog
router.put("/:id", verifyToken, isAdmin, updateBlog);

// Get all blogs
router.get("/", verifyToken, getBlogs);

// Get a blog by ID
router.get("/:id", verifyToken, getBlogById);

// Delete a blog
router.delete("/:id", verifyToken, isAdmin, deleteBlog);

module.exports = router;
