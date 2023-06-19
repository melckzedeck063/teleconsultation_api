const express =  require('express');

const router =  express.Router();

const AuthController =   require('../controllers/AuthController');

const AppointmentController =   require('../controllers/appointmentController');

router.use(AuthController.protect);

router.post('/new_appointment', AppointmentController.bookAppointment);
router.get('/all_appointments', AppointmentController.getAllAppointments);
router.get('/my_appointments', AppointmentController.getMyAppointmments);
router.get('/appointmment/:id', AppointmentController.getAppointment);
router.patch('/update_appointment', AppointmentController.updateAppointment);
router.delete('/delete/:id',AppointmentController.deleteAppointment)

module.exports = router;