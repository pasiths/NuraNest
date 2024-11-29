const Blog = require("../models/Blog.js");
const logger = require("../middlewares/logger.js");

// Create a Blog
exports.createBlog = async (req, res) => {
  const { title, body, tags, description, keywords, authorId } = req.body;

  try {
    // Create a new Blog
    const blog = await Blog.create({
      title,
      body,
      tags,
      description,
      keywords,
      authorId,
      status: true,
    });

    logger.info("Blog created successfully");
    return res.status(201).json({ blog });
  } catch (error) {
    logger.error("Error creating the blog", error);
    return res.status(500).json({
      message: "Unable to create the blog",
      error: error.message,
    });
  }
};

// Update a Blog
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, body, tags, description, keywords, authorId } = req.body;

  try {
    // Find the Blog by ID
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Update the Blog
    if (title) {
      blog.title = title;
    }

    if (body) {
      blog.body = body;
    }

    if (tags) {
      blog.tags = tags;
    }

    if (description) {
      blog.description = description;
    }

    if (keywords) {
      blog.keywords = keywords;
    }

    if (authorId) {
      blog.authorId = authorId;
    }

    await blog.save();

    logger.info("Blog updated successfully");
    return res.status(200).json({ blog });
  } catch (error) {
    logger.error("Error updating the blog", error);
    return res.status(500).json({
      message: "Unable to update the blog",
      error: error.message,
    });
  }
};

// Get a Blog by ID
exports.getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the Blog by ID
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    logger.info("Blog retrieved successfully");
    return res.status(200).json({ blog });
  } catch (error) {
    logger.error("Error getting the blog", error);
    return res.status(500).json({
      message: "Unable to get the blog",
      error: error.message,
    });
  }
};

// Get all Blogs
exports.getBlogs = async (req, res) => {
  try {
    // Find all Blogs
    const blogs = await Blog.findAll();

    logger.info("Blogs retrieved successfully");
    return res.status(200).json({ blogs });
  } catch (error) {
    logger.error("Error getting the blogs", error);
    return res.status(500).json({
      message: "Unable to get the blogs",
      error: error.message,
    });
  }
};

// Delete a Blog (Soft delete)
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the Blog by ID
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Soft delete the Blog
    blog.status = false;
    await blog.save();

    logger.info("Blog deleted successfully");
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    logger.error("Error deleting the blog", error);
    return res.status(500).json({
      message: "Unable to delete the blog",
      error: error.message,
    });
  }
};
