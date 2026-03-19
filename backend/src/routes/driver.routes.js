const express = require('express');
const router = express.Router();

const { addDriver, fetchDrivers } = require('../controllers/driver.controller');
const { fetchDriverEarnings, fetchDriverPayments } = require('../controllers/driver.controller');

router.post('/', addDriver);
router.get('/', fetchDrivers);
router.get('/earnings/:driver_id', fetchDriverEarnings);
router.get('/payments/:driver_id', fetchDriverPayments);

module.exports = router;