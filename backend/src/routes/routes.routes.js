const express = require('express');
const router = express.Router();

const { addRoute, fetchRoutes, getMatchedRoutes } = require('../controllers/routes.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', addRoute);
router.get('/', fetchRoutes);
router.get('/match', authMiddleware, getMatchedRoutes);

module.exports = router;