const catchAsync =  require('../utils/catchAsync');
const AppError =  require('../utils/AppError');

const Signal =  require('../models/signalModel');
const Factory  =  require('../controllers/factoryController')


exports.createSignal = catchAsync ( async (req,res,next) => {
    const  new_signal = await Signal.create(req.body);

    if(!new_signal){
        return next( new AppError("Failed to save new signal please try again",400))
    }

    res.status(201).json({
        status : "Success",
        message : "Signal saved succesfully",
        data : new_signal
    })
})

exports.readSignal = Factory.getAll(Signal)

exports.getCurrentSignal = Factory.getAll(Signal)