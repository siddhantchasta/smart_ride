const express = require('express');
const router = express.Router();

const { addSubscription, fetchSubscriptions } = require('../controllers/subscription.controller');

router.post('/', addSubscription);
router.get('/:user_id', fetchSubscriptions);

module.exports = router;