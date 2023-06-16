
const catchAsync =  require('../utils/catchAsync');
const AppError =  require('../utils/AppError');

const Disease =   require('../models/diseaseModel');
const Factory  = require('../controllers/factoryController')


exports.createDisease = catchAsync ( async (req,res,next) => {
    if(!req.body.created_by) req.body.created_by = req.user.id
    const  disease = await Disease.create(req.body)

    if(!disease){
        return  next(new AppError('Request failed please try again', 400))
    }

    res.status(201).json({
        status : "success",
        message :  "New disease added succesfully",
        data : {
            disease
        }
    })
})

exports.getAllDiseases = Factory.getAll(Disease);

exports.getDisease = Factory.getOne(Disease);

exports.updateDisease =  Factory.updateOne(Disease)

exports.deleteDisease = Factory.deleteModel(Disease);

exports.deactivateDisease =  Factory.deactivateOne(Disease)