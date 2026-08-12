const express = require('express');
const router = express.Router();
const portfolioController = require('../controller/portfolioController');
const { protectAdmin } = require('../middlewares/authMiddleware');

router.get('/health', portfolioController.getHealth);
router.get('/portfolio', portfolioController.getFullPortfolio);
router.put('/portfolio', protectAdmin, portfolioController.updateFullPortfolio);

module.exports = router;
