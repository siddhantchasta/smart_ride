const express = require('express');
const router = express.Router();

const {
  assignRoute,
  fetchDriverRoutes,
} = require('../controllers/driverRoute.controller');

router.post('/assign', assignRoute);
router.get('/:driver_id', fetchDriverRoutes);

module.exports = router;