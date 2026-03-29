const express = require('express');
const router = express.Router();

const {
  fetchNotifications,
} = require('../controllers/notification.controller');

router.get('/:user_id', fetchNotifications);

module.exports = router;