const express = require('express');
const router = express.Router();
const experienceController = require('../controller/experienceController');

router.get('/', experienceController.getExperiences);
router.post('/', experienceController.addExperience);
router.delete('/:id', experienceController.deleteExperience);

module.exports = router;
