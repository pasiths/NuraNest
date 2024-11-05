const {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  TableInheritance,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} = require("typeorm");
const { Appointment } = require("./Appointment.js");
const { Blog } = require("./Blog.js");
const { Payment } = require("./Payment.js");

@Entity()
@TableInheritance({ column: { type: "varchar", name: "role" } })
class User {
  @PrimaryGeneratedColumn({ type: "int" })
  id;

  @Column({ type: "varchar" })
  username;

  @Column({ type: "varchar" })
  firstName;

  @Column({ type: "varchar" })
  lastName;

  @Column({ type: "varchar" })
  email;

  @Column({ type: "varchar" })
  password;

  @Column({ type: "varchar" })
  gender;

  @Column({ type: "date" })
  dob;

  @Column({ type: "varchar" })
  address;

  @Column({ type: "varchar" })
  contactNo;

  @Column({ type: "boolean", default: true })
  status;

  @CreateDateColumn()
  createdAt;

  @UpdateDateColumn()
  updatedAt;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments;

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs;

  @OneToMany(() => Payment, (payment) => payment.user)
  payments;
}

module.exports = User;
