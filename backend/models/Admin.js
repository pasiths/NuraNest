const { ChildEntity, OneToMany } = require("typeorm");
const { User } = require("./User.js");
const { Appointment } = require("./Appointment.js");
const { Payment } = require("./Payment.js");
const { Blog } = require("./Blog.js");

@ChildEntity()
class Admin extends User {
  @OneToMany(() => Blog, (blog) => blog.author)
  blogs;
}

module.exports = Admin;