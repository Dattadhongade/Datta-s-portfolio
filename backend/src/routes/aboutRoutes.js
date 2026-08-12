const express = require('express');
const router = express.Router();
const aboutController = require('../controller/aboutController');

router.get('/', aboutController.getProfile);
router.put('/profile', aboutController.updateProfile);
router.put('/tech-pills', aboutController.updateTechPills);
router.put('/stats', aboutController.updateStats);

module.exports = router;
