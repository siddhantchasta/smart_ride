const express = require('express');
const router = express.Router();

const {
  createNotification,
  fetchNotifications,
} = require('../controllers/notification.controller');

router.post('/', createNotification);
router.get('/:user_id', fetchNotifications);

module.exports = router;