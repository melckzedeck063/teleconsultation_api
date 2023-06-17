
const catchAsync =  require('../utils/catchAsync');
const AppError =  require('../utils/AppError');

const Message =   require('../models/messageModel');

const Factory  =   require('../controllers/factoryController');

exports.sendMessage = catchAsync( async (req,res,next) => {
    if(!req.body.sender) req.body.sender = req.user.id;

    const message = await Message.create(req.body);

    if(!message){
        return next(new AppError("Request  failed please try again", 400))
    }

    res.status(201).json({
        status: 'success',
        message:"message sent",
        data : {
            message
        }
    })
})

exports.getMyMessages = catchAsync( async (req,res,next) => {
    const messages  =   await Message.find({sender : req.user.id})

    if(!messages){
        return next(new AppError("No data found with the specified ID", 400))
    }

    res.status(200).json({
        status: 'success',
        message:"message sent",
        data : {
            messages
        }
    })
})

exports.getAllMessages = Factory.getAll(Message);

exports.getChatMessage =  catchAsync( async (req,res,next) => {
    const messages = await Message.find({sender :  req.user.id, receiver : req.params.id});

    if(!messages){
        return next(new AppError('No data  found  with the  specified ID', 404))
    }

    res.status(200).json({
        status: 'success',
        message:"message sent",
        data : {
            messages
        }
    })

} )