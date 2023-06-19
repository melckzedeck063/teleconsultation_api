const mongoose  =  require('mongoose');


const MessageSchema =  mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    sender :  {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    date_created : {
        type:Date,
        default : Date.now()
    },
    receiver  : {
        type: mongoose.Schema.ObjectId,
        ref: 'Doctor',
        required: true
    },
})

MessageSchema.pre(/^find/, function(next){
    this.populate({
        path : 'sender',
        select : '-__v  -password  -role'
    })
    .populate({
        path  :'receiver',
        select :'-__v -category -bibliography -date_registered -working_station'
    })
    

    next()
})

Message  =  mongoose.model('Message', MessageSchema);

module.exports =  Message