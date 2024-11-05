const { ChildEntity, Column, OneToMany } = require("typeorm");
const { User } = require("./User.js");
const { Appointment } = require("./Appointment.js");
const { Payment } = require("./Payment.js");   

@ChildEntity()
class Patient extends User{
    @Column({ type: "varchar" })
    medicalHistory;

    @OneToMany(() => Appointment, (appointment) => appointment.patient)
    appointments;

    @OneToMany(() => Payment, (payment) => payment.patient)
    payments;
}

module.exports = Patient;