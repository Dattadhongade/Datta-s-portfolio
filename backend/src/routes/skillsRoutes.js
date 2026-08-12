const express = require('express');
const router = express.Router();
const skillsController = require('../controller/skillsController');
const { protectAdmin } = require('../middlewares/authMiddleware');

router.get('/', skillsController.getSkillsData);
router.post('/skill', protectAdmin, skillsController.addSkill);
router.delete('/skill/:category/:index', protectAdmin, skillsController.deleteSkill);

router.post('/educations', protectAdmin, skillsController.addEducation);
router.put('/educations/:id', protectAdmin, skillsController.updateEducation);
router.delete('/educations/:id', protectAdmin, skillsController.deleteEducation);

module.exports = router;
