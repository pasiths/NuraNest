const {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} = require("typeorm");
const { Admin } = require("./Admin.js");

@Entity()
class Blog {
  @PrimaryGeneratedColumn({ type: "int" })
  id;

  @Column({ type: "varchar" })
  title;

  @Column({ type: "text" })
  body;

  @Column({ type: "simple-array" })
  tags;

  @Column({ type: "varchar" })
  description;

  @Column({ type: "simple-array" })
  keywords;

  @Column({ type: "boolean", default: true })
  status;

  @CreateDateColumn()
  createdAt;

  @UpdateDateColumn()
  updatedAt;

  @ManyToOne(() => Admin, (admin) => admin.blogs)
  author;
}

module.exports = Blog;
