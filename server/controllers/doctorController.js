const catchAsync = require('../utils/catchAsync');
const AppError =  require('../utils/AppError');

const Factory  =   require('../controllers/factoryController');
const Doctor = require('../models/doctorModel');


exports.registerDoctor = catchAsync( async  (req,res,next) => {
    if(!req.body.account) req.body.account =  req.user.id
    const  doctor =  await Doctor.create(req.body)

    if(!doctor) {
        return next(new AppError('Request failed please try again'))
    }

    res.status(201).json({
        status : 'success',
        message: 'New doctor  registered succesfully',
        data :  {
            doctor
        }
    })
})

exports.getCategoryDoctors =  catchAsync( async (req,res, next) => {
    const doctors = await Doctor.find({category : req.params.id});

    if(!doctors){
        return next(new AppError('No data found with the specidfied ID', 404));
    }

    res.status(200).json({
        status : 'success',
        message: 'Category doctors found succesfully',
        data :  {
            doctors
        }
    })
})

exports.getAllDoctors =  Factory.getAll(Doctor);

exports.getDoctor  =  Factory.getOne(Doctor);

exports.updateDoctor  =  Factory.updateOne(Doctor);

exports.deactivateDoctor =   Factory.deactivateOne(Doctor);

exports.deleteDoctor =   Factory.deleteModel(Doctor)