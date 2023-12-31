const express =  require('express');

const router =  express.Router();

const authController  =   require('../controllers/AuthController');
const userController =  require('../controllers/userController');

router.post('/signup', authController.signUp);
router.post('/login', authController.Login);

router.use(authController.protect);

router.get('/all_users', userController.getAllUsers);
router.get('/me', userController.getMe);
router.get('/user/:id', userController.getUser);
router.patch('/update_user/:id', userController.updateUser);
router.patch('/update_pin/:id', userController.updatePassword)


module.exports =  router;