const express = require('express');
const router = express.Router();

const { addRoute, fetchRoutes } = require('../controllers/routes.controller');

router.post('/', addRoute);
router.get('/', fetchRoutes);

module.exports = router;