const express =  require('express');

const router =  express.Router();

const AuthController =  require('../controllers/AuthController');
const DiseaseController = require('../controllers/diseaseController');


router.use(AuthController.protect);

router.post('/new_disease',DiseaseController.createDisease)
router.get('/diseases', DiseaseController.getAllDiseases);
router.get('/disease/:id', DiseaseController.getDisease);
router.patch('update_disease/:id', DiseaseController.updateDisease);
router.patch('/disable_disease/:id', DiseaseController.deactivateDisease);
router.delete('/delete/:id',DiseaseController.deleteDisease);

module.exports = router