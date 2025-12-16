const express = require('express');
const router = express.Router();
const {
    sendMessage,
    getMessages,
    getUnreadCount
} = require('../controllers/message.controller');

// Send message
router.post('/send', sendMessage);

// Get messages with a user
// router.get('/:userId', getMessages);

// Get unread count
router.get('/unread/count', getUnreadCount);

module.exports = router;