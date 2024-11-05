const { DataTypes } = require("sequelize");
const sequelize = require("../connect.js"); // Ensure this points to your Sequelize instance

// Define the Blog model
const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Use ARRAY for simple-array equivalent in PostgreSQL
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    keywords: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Use ARRAY for simple-array equivalent in PostgreSQL
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    // Options
    timestamps: true, // Automatically manage createdAt and updatedAt
    tableName: "blogs", // Specify the table name
  }
);

// Associations
Blog.associate = (models) => {
  // A Blog belongs to an Admin
  Blog.belongsTo(models.Admin, {
    foreignKey: "adminId", // Foreign key in the Blog table
    as: "admin", // Alias for the association
    onDelete: "CASCADE", // Deletes blogs when the associated admin is deleted
  });
};

module.exports = Blog;
