const mongoose =  require('mongoose');


const AppointmentSchema  =  mongoose.Schema({
    doctor : {
        type : mongoose.Schema.ObjectId,
        ref : 'Doctor',
        required : true
     },
     customer : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : true
     },
     status : {
        type: String,
        default : "Pending"
     },
     due_date : {
        type : Date,
        default  : Date.now()
     },
     date_created : {
        type : Date,
        default : Date.now()
     }
})

AppointmentSchema.pre(/^find/, function(next) {
    this.populate({
        path : 'customer',
        select : '-__v -password -role'
    })
    .populate({
        path : 'doctor',
        select  :'-__v  -bibliography  -date_registered'
    })
    next()
})


const Appointment  =  mongoose.model('Appointment', AppointmentSchema);

module.exports =  Appointment;