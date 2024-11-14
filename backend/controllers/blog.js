const Blog = require("../models/Blog.js");

// Get a Blog by ID
exports.getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the Blog by ID
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    console.log("Blog retrieved successfully");
    return res.status(200).json({ blog });
  } catch (error) {
    console.error("Error getting the blog", error);
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

    console.log("Blogs retrieved successfully");
    return res.status(200).json({ blogs });
  } catch (error) {
    console.error("Error getting the blogs", error);
    return res.status(500).json({
      message: "Unable to get the blogs",
      error: error.message,
    });
  }
};
