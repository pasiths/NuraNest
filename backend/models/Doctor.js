const { ChildEntity, Column, OneToMany } = require("typeorm");
const { User } = require("./User.js");
const { Appointment } = require("./Appointment.js");

@ChildEntity()
class Doctor extends User {
  @Column({ type: "varchar" })
  qualification;

  @Column({ type: "varchar" })
  speciality;

  @Column({ type: "varchar" })
  workplace;

  @Column({ type: "double" })
  consultationFee;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments;
}

module.exports = Doctor;