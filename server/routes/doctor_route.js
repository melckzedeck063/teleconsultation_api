const express =   require('express');

const router =  express.Router();

const AuthController =  require('../controllers/AuthController');

const  DoctorController =  require('../controllers/doctorController');

router.use(AuthController.protect);

router.post('/new_doctor', DoctorController.registerDoctor);
router.get('/doctors', DoctorController.getAllDoctors);
router.get('/category_doctors/:id', DoctorController.getCategoryDoctors);
router.get('/doctor/:id',DoctorController.getDoctor);

router.patch('/update_doctor/:id',DoctorController.updateDoctor);
router.delete('/delete/:id',DoctorController.deleteDoctor);

router.patch('/suspend_doctor/:id',DoctorController.deactivateDoctor);



module.exports = router;