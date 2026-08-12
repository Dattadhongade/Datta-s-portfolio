const express = require('express');
const router = express.Router();
const portfolioController = require('../controller/portfolioController');

router.get('/health', portfolioController.getHealth);
router.get('/portfolio', portfolioController.getFullPortfolio);
router.put('/portfolio', portfolioController.updateFullPortfolio);

module.exports = router;
