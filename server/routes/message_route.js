const express =  require('express');

const router =  express.Router()

const AuthController =  require('../controllers/AuthController');

const MessageController =  require('../controllers/messageController');

router.use(AuthController.protect);

router.post('/new_message', MessageController.sendMessage);
router.get('/my_messages', MessageController.getMyMessages);
router.get('/my_chats/:id', MessageController.getChatMessage);
router.delete('/delete_messages', MessageController.deleteMessages)

module.exports =  router;