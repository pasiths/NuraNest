const { DataTypes } = require("sequelize");
const sequelize = require("../connect.js"); // Ensure this points to your Sequelize instance
const User = require("./User.js"); // Adjust the path as necessary

// Define the Admin model
const Admin = sequelize.define("Admin", {
  // You can add admin-specific fields here if needed
}, 
{
  // Options
  timestamps: true, // Automatically manage createdAt and updatedAt
  tableName: "admins", // Specify the table name
});

// Associations
Admin.associate = (models) => {
  // An Admin belongs to a User
  Admin.belongsTo(models.User, {
    foreignKey: "userId", // Foreign key in the Admin table
    as: "user", // Alias for the association
  });

  // An Admin can manage many Blogs
  Admin.hasMany(models.Blog, {
    foreignKey: "adminId", // Define the foreign key in the Blog model
    as: "blogs",
  });
};

module.exports = Admin;
