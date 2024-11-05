const {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} = require("typeorm");
const { Patient } = require("./Patient.js");

@Entity()
class Payment {
  @PrimaryGeneratedColumn({ type: "int" })
  id;

  @Column({ type: "varchar" })
  paymentMethod;

  @Column({ type: "varchar" })
  paymentStatus;

  @Column({ type: "varchar" })
  amount;

  @Column({ type: "date" })
  paymentDate;

  @Column({ type: "boolean", default: true })
  status;

  @CreateDateColumn()
  createdAt;

  @UpdateDateColumn()
  updatedAt;

  @ManyToOne(() => Patient, (patient) => patient.payments)
  patient;
}

module.exports = Payment;
