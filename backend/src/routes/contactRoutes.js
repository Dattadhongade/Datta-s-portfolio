const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');
const { protectAdmin } = require('../middlewares/authMiddleware');

router.post('/contact', contactController.sendContact);
router.get('/messages', protectAdmin, contactController.getMessages);
router.patch('/messages/:id/read', protectAdmin, contactController.markAsRead);
router.delete('/messages/:id', protectAdmin, contactController.deleteMessage);

module.exports = router;
