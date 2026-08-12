const express = require('express');
const router = express.Router();
const skillsController = require('../controller/skillsController');

router.get('/', skillsController.getSkillsData);
router.post('/skill', skillsController.addSkill);
router.delete('/skill/:category/:index', skillsController.deleteSkill);

router.post('/educations', skillsController.addEducation);
router.put('/educations/:id', skillsController.updateEducation);
router.delete('/educations/:id', skillsController.deleteEducation);

module.exports = router;
