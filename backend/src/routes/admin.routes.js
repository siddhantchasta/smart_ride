const express = require('express');
const router = express.Router();

const { 
  fetchUsers,
  getDriversByRouteController,
  approveDriver,
  addPlan,
  fetchAnalytics,
  fetchAllSubscriptions,
  assignDriverAdmin,
  getStats,
  addQuery, 
  fetchQueries, 
  fetchUserQueries,
  markQueryResolved, 
  addRouteRequest, 
  fetchRouteRequests
} = require('../controllers/admin.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

router.get('/users', authMiddleware, adminMiddleware, fetchUsers);
router.get('/subscriptions', fetchAllSubscriptions);
router.post('/assign-driver', assignDriverAdmin);
router.get('/stats', getStats);
router.get("/drivers-by-route", getDriversByRouteController);

router.post(
  '/drivers/verify',
  authMiddleware,
  adminMiddleware,
  approveDriver
);

router.post(
  '/plans',
  authMiddleware,
  adminMiddleware,
  addPlan
);

router.post("/query", authMiddleware, addQuery);
router.get("/queries", fetchQueries);             
router.get("/my-queries", authMiddleware, fetchUserQueries);
router.post("/resolve-query", markQueryResolved);
router.post("/route-request", authMiddleware, addRouteRequest);
router.get("/route-requests", fetchRouteRequests);

router.get(
  '/analytics',
  authMiddleware,
  adminMiddleware,
  fetchAnalytics
);

module.exports = router;