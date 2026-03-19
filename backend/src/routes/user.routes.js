const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const {
  createLocation,
  fetchLocation,
} = require('../controllers/user.controller');

router.post('/location', authMiddleware, createLocation);
router.get('/location', authMiddleware, fetchLocation);

module.exports = router;