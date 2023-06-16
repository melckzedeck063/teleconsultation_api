const catchAsync =  require('../utils/catchAsync');
const AppError =   require('../utils/AppError');

const {SystemUser}=  require('../models/userModel');


const sendResponse =  (data, message, res, statusCode)  => {
    res.status(statusCode).json({
        status  :  "successfull",
        message :  message,
        data : {
            data
        }
    })
}

exports.getAllUsers = catchAsync( async (req, res, next)  =>  {
    const all_users = await SystemUser.find();

    if(!all_users){
        return next(new AppError("No data found in  this document", 400))
    }

    sendResponse(all_users, "data found", res, 200)


})

exports.getUser = catchAsync( async (req, res, next) => {
    console.log(req.params)
    const user =  await SystemUser.findById(req.params.id);

    if(!user ) {
        return next(new AppError("No data found with that id", 404))
    }

    sendResponse(user, "data found", res, 200);
})


exports.getMe = catchAsync ( async (req,res,next) => {
    console.log(req.user.id)
    const logedUser = await SystemUser.findById(req.user.id);

    if(!logedUser) {
        return next(new AppError("No user found with that ID", 404))
    }

    sendResponse(logedUser, "user found", res, 200)
})
