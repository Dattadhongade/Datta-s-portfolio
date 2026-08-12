const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

router.post('/contact', contactController.sendContact);
router.get('/messages', contactController.getMessages);
router.patch('/messages/:id/read', contactController.markAsRead);
router.delete('/messages/:id', contactController.deleteMessage);

module.exports = router;
