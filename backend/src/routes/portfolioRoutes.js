const express = require('express');
const router = express.Router();
const portfolioController = require('../controller/portfolioController');
const { protectAdmin } = require('../middlewares/authMiddleware');

const upload = require('../middlewares/uploadMiddleware');
const projectsController = require('../controller/projectsController');

router.get('/health', portfolioController.getHealth);
router.get('/portfolio', portfolioController.getFullPortfolio);
router.put('/portfolio', protectAdmin, portfolioController.updateFullPortfolio);
router.post('/upload', protectAdmin, upload.single('image'), projectsController.uploadImage);

module.exports = router;
