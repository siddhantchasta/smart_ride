const express = require('express');
const router = express.Router();

const { addDriver, fetchDrivers } = require('../controllers/driver.controller');

router.post('/', addDriver);
router.get('/', fetchDrivers);

module.exports = router;