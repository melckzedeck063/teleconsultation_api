const  mongoose = require('mongoose');

const DoctorSchema =  mongoose.Schema({
    licenseNo : {
        type : String,
        required : true,
        trim : true
    },
    checkNo : {
        type : String,
        required : true,
        trim : true
    },
    experience : {
        type : String,
        required : true,
        trim  : true
    },
    bibliography : String,
    photo : String,
    account :  {
        type :  mongoose.Schema.ObjectId,
        ref :  'User'
    },
    category : {
        type : mongoose.Schema.ObjectId,
        ref: 'Disease'
    },
    working_station : {
        type : String,
        default : ""
    },
    deleted : false,
    date_registered : {
        type : Date,
        default : Date.now()
    }
})

DoctorSchema.pre(/^find/, function(next){
    this.populate({
        path : 'account',
        select : '-__v -password -role'
    })
    .populate({
        path :  'category',
        select : '-__v -created_by -date_created'
    })

    next();
})

const Doctor =  mongoose.model('Doctor', DoctorSchema);
module.exports =  Doctor