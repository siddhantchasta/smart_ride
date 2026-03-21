const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate.middleware');

const { addSubscription, fetchSubscriptions, fetchUserDetails } = require('../controllers/subscription.controller');
const { createSubscriptionSchema } = require('../validators/subscription.validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
  '/',
  authMiddleware,
  validate(createSubscriptionSchema),
  addSubscription
);
router.get('/details/:user_id', fetchUserDetails);
router.get('/:user_id', fetchSubscriptions);

module.exports = router;