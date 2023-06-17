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
    receiver  : {
        type : mongoose.Schema.ObjectId,
        ref :  'User',
        required : true
    },
    date_created : {
        type:Date,
        default : Date.now()
    }
})

Message  =  mongoose.model('Message', MessageSchema);

module.exports =  MessageSchema