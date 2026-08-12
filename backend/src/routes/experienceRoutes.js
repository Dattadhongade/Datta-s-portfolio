const express = require('express');
const router = express.Router();
const experienceController = require('../controller/experienceController');
const { protectAdmin } = require('../middlewares/authMiddleware');

router.get('/', experienceController.getExperiences);
router.post('/', protectAdmin, experienceController.addExperience);
router.delete('/:id', protectAdmin, experienceController.deleteExperience);

module.exports = router;
