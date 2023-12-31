const ApiFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');


const response = (data, statusCode, res, message) => {

    res.status(statusCode).json({
        status: 'success',
        empty : false,
        message: message,
        results : data.length,
        data: {
            data
        }
    })
}

exports.deleteModel = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    response(doc, 204, res, 'Document deleted succesfull');
})

exports.getOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
        return next (new AppError('No document found with that ID', 404))
    }

    response(doc, 200, res, 'Document found succesfully');
} )


exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true
    })

    if (!doc) {
        return next(new AppError('Failed to update the document', 400));
    }

    response(doc, 201, res, 'Document updated succesfully')
})

exports.createOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    if (!doc) {
        return next(new AppError('Failed to create new document', 400));
    }

    response(doc, 201, res, 'New document created succesfully')
})


exports.getAll = Model => catchAsync(async (req, res, next) => {
      
    const features =  new ApiFeatures(Model.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    
    const doc = await features.query;

    if (!doc) {
        return next(new AppError('No document foundin this collection'));
    }

    response(doc, 200, res, 'Data found succesfully');

})

exports.getMyMessages = Model => catchAsync( async  (req,res,next)  => {
    const features  =   new ApiFeatures(Model.find({$or: [{ senderId: req.user.id }, { receiverId: req.user.id }]}), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    
    const doc = await features.query;
    if(!doc){
        return next(new AppError("No data found with the specified ID", 400))
    }

    response(doc,200,res, 'your messages')

})

exports.getMyAppointments = Model => catchAsync( async  (req,res,next)  => {
    const features  =   new ApiFeatures(Model.find({$or: [{ customer: req.user.id }, { doctor: req.user.id }]}), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    
    const doc = await features.query;
    if(!doc){
        return next(new AppError("No data found with the specified ID", 400))
    }

    response(doc,200,res, 'your messages')

})

exports.getDoctorAppointments = Model => catchAsync( async  (req,res,next)  => {
    const features  =   new ApiFeatures(Model.find({ doctor: req.params.id}), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    
    const doc = await features.query;
    if(!doc){
        return next(new AppError("No data found with the specified ID", 400))
    }

    response(doc,200,res, 'your messages')

})

exports.deactivateOne = Model => catchAsync(async (req, res, next) => {
    req.body.status = "deleted"
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true
    }) 

    if (!doc) {
        return next(new AppError('Failed to update the document', 400));
    }

    response(doc, 203, res, 'Document updated succesfully')
})