const express =  require('express');

const router =  express.Router()

const AuthController =  require('../controllers/AuthController');

const MessageController =  require('../controllers/messageController');

router.use(AuthController.protect);

router.post('/new_message', MessageController.sendMessage);
router.get('/my_messages', MessageController.getMyMessages);


module.exports =  router;