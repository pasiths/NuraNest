const {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} = require("typeorm");
const { Patient } = require("./Patient.js");
const { Doctor } = require("./Doctor.js");

@Entity()
class Appointment {
  @PrimaryGeneratedColumn({ type: "int" })
  id;

  @Column({ type: "date" })
  appointmentDate;

  @Column({ type: "time" })
  appointmentTime;

  @Column({ type: "varchar" })
  appointmentType;

  @Column({ type: "varchar" })
  appointmentLocation;

  @Column({ type: "varchar" })
  additionalInfo;

  @Column({ type: "boolean", default: true })
  status;

  @CreateDateColumn()
  createdAt;

  @UpdateDateColumn()
  updatedAt;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  doctor;
}

module.exports = Appointment;
