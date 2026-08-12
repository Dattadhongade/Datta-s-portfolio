const express = require('express');
const router = express.Router();
const aboutController = require('../controller/aboutController');
const { protectAdmin } = require('../middlewares/authMiddleware');

router.get('/', aboutController.getProfile);
router.put('/profile', protectAdmin, aboutController.updateProfile);
router.put('/tech-pills', protectAdmin, aboutController.updateTechPills);
router.put('/stats', protectAdmin, aboutController.updateStats);

module.exports = router;
