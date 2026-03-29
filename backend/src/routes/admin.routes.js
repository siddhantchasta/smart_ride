const express = require('express');
const router = express.Router();

const { 
  fetchUsers,
  getDriversByRouteController,
  createDriverAdmin,
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
  approveRoute,
  fetchRouteRequests
} = require('../controllers/admin.controller');

const { assignRoute } = require('../controllers/driverRoute.controller');
const { createVehicle } = require("../controllers/vehicle.controller");

const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

router.get('/users', authMiddleware, adminMiddleware, fetchUsers);
router.get('/subscriptions', fetchAllSubscriptions);
router.post('/assign-driver', assignDriverAdmin);
router.get('/stats', getStats);
router.get("/drivers-by-route", getDriversByRouteController);

router.post(
  '/create-driver', 
  authMiddleware, 
  adminMiddleware, 
  createDriverAdmin
);

router.post(
  "/assign-driver-route",
  authMiddleware,
  adminMiddleware,
  assignRoute
);

router.post(
  '/drivers/verify',
  authMiddleware,
  adminMiddleware,
  approveDriver
);

router.post("/create-vehicle", createVehicle);

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
router.post("/approve-route", authMiddleware, adminMiddleware, approveRoute);
router.get("/route-requests", fetchRouteRequests);

router.get(
  '/analytics',
  authMiddleware,
  adminMiddleware,
  fetchAnalytics
);

module.exports = router;