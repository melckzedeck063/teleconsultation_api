const  catchAsync =  require('../utils/catchAsync');
const AppError =  require('../utils/AppError');

const Appointment =  require('../models/appointmenrModel');

const Factory =  require('../controllers/factoryController');

exports.bookAppointment = catchAsync ( async (req,res,next) => {
    if(!req.body.customer)  req.body.customer = req.user.id

    const appointments = await Appointment.create(req.body);

    if(!appointments) {
        return next(new AppError('Request failed please try again',400))
    }

    res.status(201).json({
        status : 'success',
        message  : "New appointment booked succesfully",
        data : {
            appointments
        }
    })
})

exports.getAllAppointments = Factory.getAll(Appointment);
exports.getMyAppointmments  = Factory.getMyAppointments(Appointment);
exports.getAppointment = Factory.getOne(Appointment);
exports.updateAppointment  = Factory.updateOne(Appointment);
exports.doctorAppointments =   Factory.getDoctorAppointments(Appointment);
exports.deleteAppointment = Factory.deleteModel(Appointment);