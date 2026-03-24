const express = require('express');
const router = express.Router();

const { addRoute, fetchRoutes, getMatchedRoutes, autoAssignDriver } = require('../controllers/routes.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

router.post("/", authMiddleware, adminMiddleware, addRoute);
router.get('/', fetchRoutes);
router.get('/match', authMiddleware, getMatchedRoutes);
router.get('/auto-assign', authMiddleware, autoAssignDriver);

module.exports = router;